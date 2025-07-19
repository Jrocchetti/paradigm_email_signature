-- 🗄️ SUPABASE DATABASE SETUP
-- Run these scripts in the Supabase SQL Editor

-- ============================================================================
-- 1. CREATE TABLES
-- ============================================================================

-- Create profiles table for user management and admin roles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create asset_tags table for categorization
CREATE TABLE public.asset_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#007bff',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assets table for file management
CREATE TABLE public.assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index for faster tag searches
CREATE INDEX idx_assets_tags ON public.assets USING GIN (tags);

-- Index for category filtering
CREATE INDEX idx_assets_category ON public.assets (category);

-- Index for user uploads
CREATE INDEX idx_assets_uploaded_by ON public.assets (uploaded_by);

-- Index for asset name searches
CREATE INDEX idx_assets_name ON public.assets (name);

-- ============================================================================
-- 3. CREATE FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    -- Set admin status based on email domain
    CASE 
      WHEN NEW.email = 'jrocchetti@paradigmproductionsgroup.com' THEN TRUE
      WHEN NEW.email LIKE '%@paradigmproductionsgroup.com' THEN TRUE
      ELSE FALSE
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on profiles
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to update updated_at on assets
CREATE TRIGGER handle_assets_updated_at
  BEFORE UPDATE ON public.assets
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. CREATE RLS POLICIES
-- ============================================================================

-- PROFILES POLICIES
-- Anyone can view profiles (needed for admin checks)
CREATE POLICY "Anyone can view profiles" ON public.profiles
  FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ASSET_TAGS POLICIES
-- Public can read all tags
CREATE POLICY "Public can view asset tags" ON public.asset_tags
  FOR SELECT USING (true);

-- Only admins can manage tags
CREATE POLICY "Admins can insert asset tags" ON public.asset_tags
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update asset tags" ON public.asset_tags
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete asset tags" ON public.asset_tags
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- ASSETS POLICIES
-- Public can read all assets
CREATE POLICY "Public can view assets" ON public.assets
  FOR SELECT USING (true);

-- Only admins can manage assets
CREATE POLICY "Admins can insert assets" ON public.assets
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update assets" ON public.assets
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete assets" ON public.assets
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- ============================================================================
-- 6. CREATE STORAGE BUCKET
-- ============================================================================

-- Create assets storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'assets',
  'assets',
  true,
  52428800, -- 50MB limit
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'application/zip',
    'video/mp4',
    'video/quicktime'
  ]
);

-- ============================================================================
-- 7. CREATE STORAGE POLICIES
-- ============================================================================

-- Public can view assets in storage
CREATE POLICY "Public can view asset files" ON storage.objects
  FOR SELECT USING (bucket_id = 'assets');

-- Only admins can upload assets
CREATE POLICY "Admins can upload asset files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'assets' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Only admins can update assets
CREATE POLICY "Admins can update asset files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'assets' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Only admins can delete assets
CREATE POLICY "Admins can delete asset files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'assets' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- ============================================================================
-- 8. INSERT SAMPLE DATA
-- ============================================================================

-- Insert some default tags
INSERT INTO public.asset_tags (name, color, description) VALUES
  ('Logo', '#007bff', 'Company logos and branding'),
  ('Marketing', '#28a745', 'Marketing materials and assets'),
  ('Social Media', '#17a2b8', 'Social media graphics and content'),
  ('Print', '#6f42c1', 'Print-ready materials'),
  ('Web', '#fd7e14', 'Web graphics and assets'),
  ('Video', '#dc3545', 'Video content and animations');

-- ============================================================================
-- 9. CREATE USEFUL VIEWS (OPTIONAL)
-- ============================================================================

-- View for assets with uploader information
CREATE VIEW public.assets_with_uploader AS
SELECT 
  a.*,
  p.email as uploader_email,
  p.is_admin as uploader_is_admin
FROM public.assets a
LEFT JOIN public.profiles p ON a.uploaded_by = p.id;

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================

-- After running these scripts:
-- 1. Go to Storage in Supabase dashboard
-- 2. Verify the 'assets' bucket was created
-- 3. Go to Authentication → Settings
-- 4. Add your domain to 'Site URL'
-- 5. Test by creating a user account

SELECT 'Database setup complete! ✅' as status;
