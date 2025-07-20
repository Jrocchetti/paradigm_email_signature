-- URGENT SUPABASE FIX - Run this immediately
-- This will fix the table and UUID issues

-- 1. Drop existing table if it has wrong schema
DROP TABLE IF EXISTS public.social_content CASCADE;

-- 2. Create the social_content table with correct schema
CREATE TABLE public.social_content (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT,
    social_caption TEXT,
    category TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('photo', 'video', 'image', 'document')),
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT,
    uploaded_by UUID REFERENCES auth.users(id),
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE public.social_content ENABLE ROW LEVEL SECURITY;

-- 4. Create policies for the table
-- Allow all authenticated users to read content
CREATE POLICY "Allow authenticated users to read social content" ON public.social_content
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admin users (with @paradigmproductionsgroup.com email) to manage content
CREATE POLICY "Allow admin users to manage social content" ON public.social_content
    FOR ALL USING (
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

-- 5. Ensure storage bucket exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'social-content',
    'social-content',
    true,
    52428800, -- 50MB
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 6. Recreate storage policies (drop and recreate to ensure they're correct)
DROP POLICY IF EXISTS "Allow authenticated users to view files" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin users to upload files" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin users to update files" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin users to delete files" ON storage.objects;

CREATE POLICY "Allow authenticated users to view files" ON storage.objects
    FOR SELECT USING (bucket_id = 'social-content' AND auth.role() = 'authenticated');

CREATE POLICY "Allow admin users to upload files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'social-content' AND
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

CREATE POLICY "Allow admin users to update files" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'social-content' AND
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

CREATE POLICY "Allow admin users to delete files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'social-content' AND
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

-- 7. Verification - run this to check if everything was created correctly
SELECT 
    'Table exists: ' || EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'social_content'
    )::text as table_check,
    'Bucket exists: ' || EXISTS (
        SELECT FROM storage.buckets WHERE id = 'social-content'
    )::text as bucket_check,
    'Current user: ' || COALESCE(auth.jwt() ->> 'email', 'Not authenticated') as current_user;

-- 8. Test insert (this should work after the fixes)
-- Uncomment this line to test if the table accepts data correctly:
-- INSERT INTO public.social_content (title, description, category, file_type, file_url, file_name, file_size, uploaded_by)
-- VALUES ('Test Upload', 'Test description', 'general', 'image', 'test-url', 'test.jpg', 1024, auth.uid());
