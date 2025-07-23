# Supabase Boost Setup - Next Steps

## ✅ Completed
- Fixed Supabase API method: `onAuthStateChanged` → `onAuthStateChange`
- Created comprehensive setup verification script
- Committed and pushed changes to trigger deployment

## 🔧 Manual Steps Required (Do These Now)

### 1. Run Supabase Setup Script
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Open the file `supabase-setup-verification.sql` from this project
4. **First, run the VERIFICATION queries** (lines 6-32) to see what's missing
5. **Then, run the CREATE commands** (lines 34-65) to create missing components
6. If bucket creation fails, go to **Storage > Create Bucket** manually:
   - Name: `social-content`
   - Public: ✅ Yes
   - File size limit: 50MB

### 2. Update Admin Emails
In the SQL script, find the commented section around line 70 and uncomment/modify:
```sql
CREATE POLICY "Admins can manage social content" ON public.social_content
    FOR ALL 
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email IN (
                'john@paradigmdgtl.com',        -- ← Your actual admin email
                'admin@paradigmdgtl.com',       -- ← Add more as needed
                'john@paradigmproductionsgroup.com'
            )
        )
    );
```

### 3. Test the Fix
After running the SQL setup:
1. Open the live site: https://brandcentral.netlify.app/boost.html
2. Sign in with an admin account
3. Check the browser console for:
   - ✅ "Supabase initialized"
   - ✅ "Auth state changed" (no API errors)
   - ✅ Upload section should be visible for admin users

### 4. Debug Queries
If you're still having issues, run these in Supabase SQL Editor:
```sql
-- Check your current user
SELECT auth.uid(), auth.jwt() ->> 'email' as email;

-- Verify table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'social_content'
);

-- Verify bucket exists  
SELECT EXISTS (
    SELECT FROM storage.buckets WHERE id = 'social-content'
);
```

## 🎯 Expected Results
After completing these steps:
- No more "onAuthStateChanged is not a function" errors
- No more "Table 'social_content' doesn't exist" errors  
- No more "Bucket not found" errors
- Admin users can see upload section and upload files
- Files get stored in Supabase Storage and recorded in database

## 📁 Files Updated
- `boost.html` - Fixed Supabase API method
- `boost-supabase.html` - Fixed Supabase API method  
- `supabase-setup-verification.sql` - New comprehensive setup script
