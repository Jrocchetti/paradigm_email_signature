-- Targeted fix for the remaining SECURITY DEFINER issue
-- Force recreate the view with explicit SECURITY INVOKER

-- Step 1: Check the current view definition
SELECT pg_get_viewdef('public.assets_with_uploader', true) AS current_definition;

-- Step 2: Drop the view completely
DROP VIEW IF EXISTS public.assets_with_uploader CASCADE;

-- Step 3: Recreate with explicit SECURITY INVOKER (this is the key!)
CREATE VIEW public.assets_with_uploader 
WITH (security_invoker = true)
AS
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
    sc.uploaded_by,
    sc.download_count,
    sc.created_at,
    sc.updated_at
FROM public.social_content sc;

-- Step 4: Grant permissions
GRANT SELECT ON public.assets_with_uploader TO authenticated;

-- Step 5: Verify the fix with multiple checks
-- Check 1: View definition should not contain SECURITY DEFINER
SELECT pg_get_viewdef('public.assets_with_uploader', true) AS new_definition;

-- Check 2: Check view options
SELECT 
    schemaname,
    viewname,
    definition,
    CASE 
        WHEN definition ILIKE '%security_definer%' OR definition ILIKE '%security definer%' 
        THEN 'STILL HAS SECURITY DEFINER ❌'
        ELSE 'SECURITY DEFINER REMOVED ✅'
    END as security_check
FROM pg_views 
WHERE viewname = 'assets_with_uploader';

-- Check 3: Verify the view works
SELECT COUNT(*) as record_count FROM public.assets_with_uploader;

-- Check 4: Check if there are any view options set
SELECT 
    n.nspname as schema_name,
    c.relname as view_name,
    c.reloptions as view_options
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'v' 
AND c.relname = 'assets_with_uploader';
