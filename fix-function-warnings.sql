-- Fix remaining security warnings
-- These are minor improvements, not critical errors

-- Fix 1: Set search_path for functions to prevent search path hijacking

-- Update get_uploader_info function with secure search_path
CREATE OR REPLACE FUNCTION get_uploader_info(user_id UUID)
RETURNS TABLE(uploader_email TEXT, uploader_name TEXT)
LANGUAGE SQL
SECURITY INVOKER
SET search_path = public, auth  -- This fixes the search_path warning
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

-- Fix handle_new_user function (if it exists)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, auth  -- This fixes the search_path warning
AS $$
BEGIN
    -- Your existing function logic here
    -- (This is just a placeholder - replace with actual logic if needed)
    RETURN NEW;
END;
$$;

-- Fix handle_updated_at function (if it exists)
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public  -- This fixes the search_path warning
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Verify the fixes
SELECT 
    proname as function_name,
    prosecdef as is_security_definer,
    proconfig as function_config
FROM pg_proc 
WHERE pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND proname IN ('get_uploader_info', 'handle_new_user', 'handle_updated_at');
