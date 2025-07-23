-- Simple fix for the Security Advisor issue
-- Run this to resolve the SECURITY DEFINER warning

-- Step 1: Check if the problematic view exists
SELECT schemaname, viewname, definition 
FROM pg_views 
WHERE viewname = 'assets_with_uploader';

-- Step 2: Drop the view with SECURITY DEFINER
DROP VIEW IF EXISTS public.assets_with_uploader;

-- Step 3: Recreate the view safely (without SECURITY DEFINER)
CREATE VIEW public.assets_with_uploader AS
SELECT 
    sc.*,
    u.email as uploader_email,
    u.raw_user_meta_data->>'full_name' as uploader_name
FROM public.social_content sc
LEFT JOIN auth.users u ON sc.uploaded_by = u.id;

-- Step 4: Grant proper permissions
GRANT SELECT ON public.assets_with_uploader TO authenticated;

-- Step 5: Verify the fix
SELECT 
    schemaname,
    viewname,
    CASE 
        WHEN definition ILIKE '%security definer%' THEN 'STILL HAS SECURITY DEFINER'
        ELSE 'FIXED - NO SECURITY DEFINER'
    END as security_status
FROM pg_views 
WHERE viewname = 'assets_with_uploader';
