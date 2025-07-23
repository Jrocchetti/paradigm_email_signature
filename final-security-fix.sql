-- Final fix: Recreate the view without exposing auth.users data
-- This will completely resolve both security issues

-- Step 1: Drop the problematic view completely
DROP VIEW IF EXISTS public.assets_with_uploader;

-- Step 2: Check what columns we actually need from social_content
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'social_content' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Step 3: Create a safer view that doesn't expose auth.users data
-- Instead of joining with auth.users, we'll use a function or simpler approach
CREATE VIEW public.assets_with_uploader AS
SELECT 
    sc.id,
    sc.title,
    sc.description,
    sc.social_caption,
    sc.category,
    sc.file_type,
    sc.file_url,
    sc.file_name,
    sc.file_size,
    sc.uploaded_by,  -- Keep the user ID but don't expose email/name
    sc.download_count,
    sc.created_at,
    sc.updated_at
FROM public.social_content sc;

-- Step 4: If you really need uploader info, create a separate secure function
-- This function will only return user info for authorized users
CREATE OR REPLACE FUNCTION get_uploader_info(user_id UUID)
RETURNS TABLE(uploader_email TEXT, uploader_name TEXT)
LANGUAGE SQL
SECURITY INVOKER  -- Use caller's permissions, not function creator's
AS $$
SELECT 
    CASE 
        WHEN auth.uid() = user_id OR auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com' 
        THEN u.email::TEXT
        ELSE 'Private'::TEXT
    END as uploader_email,
    CASE 
        WHEN auth.uid() = user_id OR auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
        THEN (u.raw_user_meta_data->>'full_name')::TEXT
        ELSE 'Private'::TEXT
    END as uploader_name
FROM auth.users u 
WHERE u.id = user_id;
$$;

-- Step 5: Grant proper permissions to the new view
GRANT SELECT ON public.assets_with_uploader TO authenticated;

-- Step 6: Grant usage on the function to authenticated users
GRANT EXECUTE ON FUNCTION get_uploader_info(UUID) TO authenticated;

-- Step 7: Verify the fix
-- Check that the view exists and doesn't have security issues
SELECT schemaname, viewname, definition 
FROM pg_views 
WHERE viewname = 'assets_with_uploader';

-- Test the view
SELECT COUNT(*) FROM public.assets_with_uploader;

-- Test the function (should work for authorized users only)
SELECT get_uploader_info(auth.uid());

-- Final verification - check for any remaining security issues
SELECT 
    schemaname,
    viewname,
    CASE 
        WHEN definition ILIKE '%auth.users%' THEN 'STILL EXPOSES AUTH.USERS ❌'
        WHEN definition ILIKE '%security definer%' THEN 'HAS SECURITY DEFINER ❌'
        ELSE 'SECURE ✅'
    END as security_status
FROM pg_views 
WHERE viewname = 'assets_with_uploader';
