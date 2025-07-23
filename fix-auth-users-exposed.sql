-- Fix the remaining security issue: auth_users_exposed
-- This will restrict access to the view properly

-- Step 1: Check current permissions on the view
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'assets_with_uploader';

-- Step 2: Revoke access from anon (anonymous users)
REVOKE ALL ON public.assets_with_uploader FROM anon;
REVOKE ALL ON public.assets_with_uploader FROM public;

-- Step 3: Grant access only to authenticated users
GRANT SELECT ON public.assets_with_uploader TO authenticated;

-- Step 4: Ensure the underlying social_content table has proper RLS
-- Check if RLS is enabled on social_content
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'social_content';

-- Step 5: Enable RLS on social_content if not already enabled
ALTER TABLE public.social_content ENABLE ROW LEVEL SECURITY;

-- Step 6: Create a policy that only allows authenticated users to view content
DROP POLICY IF EXISTS "Authenticated users can view social content" ON public.social_content;

CREATE POLICY "Authenticated users can view social content" ON public.social_content
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Step 7: Verify the fix
-- Check permissions again
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'assets_with_uploader'
ORDER BY grantee;

-- Test that anon users can't access the view (this should return 0 rows when run as anon)
SELECT COUNT(*) as accessible_to_current_user FROM public.assets_with_uploader;

-- Check RLS status
SELECT 
    schemaname, 
    tablename, 
    CASE WHEN rowsecurity THEN 'RLS ENABLED ✅' ELSE 'RLS DISABLED ❌' END as rls_status
FROM pg_tables 
WHERE tablename = 'social_content';
