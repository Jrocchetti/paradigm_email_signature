-- QUICK SUPABASE SETUP FOR BOOST FEATURE
-- Copy and paste this entire script into your Supabase SQL Editor and run it

-- 1. Create the social_content table
CREATE TABLE IF NOT EXISTS public.social_content (
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

-- 2. Enable Row Level Security
ALTER TABLE public.social_content ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for the table
-- Allow all authenticated users to read content
CREATE POLICY "Allow authenticated users to read social content" ON public.social_content
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admin users (with @paradigmproductionsgroup.com email) to manage content
CREATE POLICY "Allow admin users to manage social content" ON public.social_content
    FOR ALL USING (
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

-- 4. Try to create storage bucket (this might fail - see manual steps below)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'social-content',
    'social-content',
    true,
    52428800, -- 50MB
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 5. Create storage policies
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

-- 6. Verification - run this to check if everything was created
SELECT 
    'Table exists: ' || EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'social_content'
    )::text as table_check,
    'Bucket exists: ' || EXISTS (
        SELECT FROM storage.buckets WHERE id = 'social-content'
    )::text as bucket_check;
