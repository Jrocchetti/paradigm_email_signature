-- Supabase SQL for Boost Upload Feature
-- Run this in Supabase SQL Editor to set up the database

-- 1. Create the social_content table
CREATE TABLE IF NOT EXISTS social_content (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    social_caption TEXT,
    category TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('photo', 'video')),
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT,
    uploaded_by TEXT NOT NULL,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create RLS policies for social_content table
ALTER TABLE social_content ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read content
CREATE POLICY "Allow authenticated users to read social content" ON social_content
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admin users to insert content
CREATE POLICY "Allow admin users to insert social content" ON social_content
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

-- Allow admin users to update content
CREATE POLICY "Allow admin users to update social content" ON social_content
    FOR UPDATE USING (
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

-- Allow admin users to delete content
CREATE POLICY "Allow admin users to delete social content" ON social_content
    FOR DELETE USING (
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

-- 3. Create storage bucket for social content
INSERT INTO storage.buckets (id, name, public)
VALUES ('social-content', 'social-content', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Create storage policies
CREATE POLICY "Allow authenticated users to read social content files" ON storage.objects
    FOR SELECT USING (bucket_id = 'social-content' AND auth.role() = 'authenticated');

CREATE POLICY "Allow admin users to upload social content files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'social-content' AND
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

CREATE POLICY "Allow admin users to update social content files" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'social-content' AND
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

CREATE POLICY "Allow admin users to delete social content files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'social-content' AND
        auth.role() = 'authenticated' AND
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

-- 5. Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create trigger to automatically update the updated_at column
CREATE TRIGGER update_social_content_updated_at BEFORE UPDATE
    ON social_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
