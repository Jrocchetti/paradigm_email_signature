-- Fix Supabase Security Issue: Remove SECURITY DEFINER from view
-- Run this script in your Supabase SQL Editor to resolve the security warning

-- STEP 1: Check current view definition
SELECT pg_get_viewdef('public.assets_with_uploader', true) AS current_view_definition;

-- STEP 2: Drop and recreate the view without SECURITY DEFINER
-- First, let's see what the view currently looks like
SELECT schemaname, viewname, definition 
FROM pg_views 
WHERE viewname = 'assets_with_uploader';

-- STEP 3: Fix the security issue by recreating the view properly
-- Drop the existing view
DROP VIEW IF EXISTS public.assets_with_uploader;

-- Recreate the view without SECURITY DEFINER (uses SECURITY INVOKER by default)
CREATE VIEW public.assets_with_uploader AS
SELECT 
    sc.*,
    u.email as uploader_email,
    u.raw_user_meta_data->>'full_name' as uploader_name
FROM public.social_content sc
LEFT JOIN auth.users u ON sc.uploaded_by = u.id;

-- STEP 4: Ensure proper RLS policies are in place for the underlying table
-- Check current policies on social_content
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'social_content'
ORDER BY policyname;

-- STEP 5: If needed, create proper RLS policies for social_content table
-- (Only run these if you don't have proper policies already)

-- Policy for viewing social content (all authenticated users can view)
CREATE POLICY IF NOT EXISTS "Users can view social content" ON public.social_content
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Policy for admins to manage content
CREATE POLICY IF NOT EXISTS "Admins can manage social content" ON public.social_content
    FOR ALL 
    USING (
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com' OR
        auth.jwt() ->> 'email' LIKE '%@paradigmdgtl.com'
    );

-- STEP 6: Grant proper permissions to the view
-- Grant select permission to authenticated users
GRANT SELECT ON public.assets_with_uploader TO authenticated;
GRANT SELECT ON public.assets_with_uploader TO anon;

-- STEP 7: Verify the fix
-- Check that the view no longer has security definer issues
SELECT 
    schemaname, 
    viewname, 
    viewowner,
    definition
FROM pg_views 
WHERE viewname = 'assets_with_uploader';

-- Test that the view works correctly
SELECT COUNT(*) FROM public.assets_with_uploader;

-- STEP 8: Additional security hardening (optional)
-- Revoke any unnecessary permissions
REVOKE ALL ON public.assets_with_uploader FROM public;

-- Grant only what's needed
GRANT SELECT ON public.assets_with_uploader TO authenticated;

-- VERIFICATION QUERIES:
-- Run these to confirm the security issue is resolved

-- 1. Check for any remaining SECURITY DEFINER views
SELECT 
    schemaname,
    viewname,
    viewowner,
    CASE 
        WHEN definition ILIKE '%security definer%' THEN 'HAS SECURITY DEFINER'
        ELSE 'SAFE'
    END as security_status
FROM pg_views 
WHERE schemaname = 'public';

-- 2. Verify RLS is enabled on social_content
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    CASE WHEN rowsecurity THEN 'RLS ENABLED' ELSE 'RLS DISABLED' END as rls_status
FROM pg_tables 
WHERE tablename = 'social_content';

-- 3. List all policies on social_content
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'social_content';
