# Local Testing Guide for Supabase Migration

## ✅ What Works Locally

### 1. Email/Password Authentication
- Registration: ✅ Full registration flow
- Login: ✅ Email/password sign in
- Logout: ✅ Session cleanup
- Session persistence: ✅ Stays logged in across page reloads

### 2. Debug Tools
- `supabase-debug.html` - Full admin/debug interface
- Debug panels in login/register pages
- Real-time auth status monitoring

## 🧪 Local Testing Steps

### Step 1: Test Registration
1. Open `register.html` in browser
2. Create test account: `testuser@paradigmproductionsgroup.com`
3. Use a strong password (8+ characters)
4. Should show "Registration successful" message
5. Check Supabase dashboard for new user

### Step 2: Test Login
1. Open `login.html` in browser
2. Sign in with test account credentials
3. Should redirect to `index.html` after successful login
4. Verify user info displays in header

### Step 3: Test Navigation
1. Navigate between pages while logged in
2. Should maintain auth state
3. Protected content should be visible
4. User dropdown should show email

### Step 4: Test Logout
1. Click "Sign Out" button
2. Should redirect to login page
3. Should clear all session data
4. Protected content should be hidden

### Step 5: Debug Tools
1. Open `supabase-debug.html`
2. Test connection status
3. Check user authentication state
4. Test admin functions

## ❌ What Requires Netlify Deployment

### OAuth Flows
- Google Sign-In (redirects to production)
- OAuth callbacks must be HTTPS

### Email Flows  
- Email confirmation links (point to production)
- Password reset links (point to production)
- Email templates use production URLs

## 🚀 Production Testing (After Netlify Deploy)

### 1. OAuth Testing
```bash
# Test Google Sign-In flow
1. Click "Continue with Google" on login page
2. Should redirect to Google OAuth
3. Should return to production site after auth
4. Should be logged in on return
```

### 2. Email Confirmation Testing
```bash
# Test full registration with email confirmation
1. Register new account on production site
2. Check email for confirmation link
3. Click confirmation link
4. Should activate account and allow login
```

### 3. Password Reset Testing
```bash
# Test password reset flow
1. Click "Forgot Password" on login page
2. Enter email address
3. Check email for reset link
4. Click reset link and set new password
5. Login with new password
```

## 🔧 Debug Commands

### Check Auth Status
```javascript
// In browser console
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);
```

### Check Session
```javascript
// In browser console
const { data: { session } } = await supabase.auth.getSession();
console.log('Current session:', session);
```

### Clear Session (if stuck)
```javascript
// In browser console
await supabase.auth.signOut();
localStorage.clear();
sessionStorage.clear();
```

## 🎯 Test Accounts

Create these test accounts for comprehensive testing:

1. **Admin User**: `admin@paradigmproductionsgroup.com`
2. **Regular User**: `user@paradigmproductionsgroup.com`  
3. **Test User**: `test@paradigmproductionsgroup.com`

## 📝 Expected Behaviors

### Local (file://) URLs
- ✅ Basic auth works
- ✅ Session management works
- ✅ Debug tools work
- ❌ OAuth redirects to production
- ❌ Email links point to production

### Production (HTTPS) URLs
- ✅ All authentication flows work
- ✅ OAuth works natively
- ✅ Email flows work completely
- ✅ All features fully functional

## 🚀 Ready for Production

The migration is complete and ready for Netlify deployment. All authentication flows are implemented and will work fully once deployed to the production HTTPS environment.
