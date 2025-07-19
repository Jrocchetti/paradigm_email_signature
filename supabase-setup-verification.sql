-- Supabase Setup Verification and Complete Setup Script
-- Run this script in your Supabase SQL Editor to verify and complete setup

-- STEP 1: Verification Queries
-- Run these first to check current state

-- Check if social_content table exists
SELECT 
    EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'social_content'
    ) AS table_exists;

-- Check if storage bucket exists
SELECT 
    EXISTS (
        SELECT FROM storage.buckets 
        WHERE id = 'social-content'
    ) AS bucket_exists;

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'social_content'
ORDER BY ordinal_position;

-- Check existing policies on social_content table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'social_content'
ORDER BY policyname;

-- Check storage policies
SELECT policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND qual LIKE '%social-content%'
ORDER BY policyname;

-- STEP 2: Create missing components (only run if needed based on verification above)

-- Create social_content table if it doesn't exist
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

-- Enable RLS if not already enabled
ALTER TABLE public.social_content ENABLE ROW LEVEL SECURITY;

-- Create storage bucket if it doesn't exist (may need to be done via dashboard)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'social-content',
    'social-content',
    true,
    52428800, -- 50MB limit
    ARRAY[
        'image/jpeg',
        'image/png', 
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
        'application/pdf',
        'application/zip'
    ]
)
ON CONFLICT (id) DO NOTHING;

-- STEP 3: Update admin email patterns to match your actual admin emails
-- Current pattern: '%@paradigmproductionsgroup.com'
-- Add specific admin emails for more security

-- Drop existing policies if you want to recreate them with specific emails
-- DROP POLICY IF EXISTS "Allow admin users to insert social content" ON social_content;
-- DROP POLICY IF EXISTS "Allow admin users to update social content" ON social_content;
-- DROP POLICY IF EXISTS "Allow admin users to delete social content" ON social_content;

-- Create policies with specific admin emails (uncomment and modify as needed)
/*
CREATE POLICY "Admins can manage social content" ON public.social_content
    FOR ALL 
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email IN (
                'john@paradigmdgtl.com',
                'admin@paradigmdgtl.com',
                'john@paradigmproductionsgroup.com'
                -- Add more admin emails as needed
            )
        )
    );
*/

-- STEP 4: Test queries to verify everything is working

-- Test insert (will only work if you're an admin)
-- INSERT INTO public.social_content (title, description, category, file_type, file_url, file_name, file_size, uploaded_by)
-- VALUES ('Test Upload', 'Test description', 'general', 'image', 'test-url', 'test.jpg', 1024, auth.uid());

-- Test select (should work for all authenticated users)
-- SELECT * FROM public.social_content LIMIT 5;

-- MANUAL STEPS REQUIRED:
-- 1. If bucket creation failed above, go to Supabase Dashboard > Storage > Create Bucket
--    - Bucket name: social-content
--    - Public bucket: Yes
--    - File size limit: 50MB
--    - Allowed MIME types: image/*, video/*, application/pdf, application/zip
--
-- 2. Update admin email addresses in the policies above to match your actual admin users
--
-- 3. Test the upload functionality from your boost.html page after running this script

-- DEBUGGING QUERIES:
-- If you're having issues, run these to debug:

-- Check your current user and email
-- SELECT auth.uid(), auth.jwt() ->> 'email' as email;

-- Check if current user would match admin policies
-- SELECT 
--     auth.uid(),
--     auth.jwt() ->> 'email' as email,
--     (auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com') as matches_pattern;

-- List all storage buckets
-- SELECT * FROM storage.buckets;

-- List all files in social-content bucket
-- SELECT * FROM storage.objects WHERE bucket_id = 'social-content';
