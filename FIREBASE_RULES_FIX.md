# 🚨 URGENT: Firebase Rules Update Required

## Issue Summary
The assets page is showing "permission-denied" errors because the current Firebase rules are too restrictive. The rules need to be updated to allow public read access to assets while maintaining admin-only write access.

## ⚡ Quick Fix Required

### 1. Update Firestore Rules (CRITICAL)

Go to Firebase Console → Firestore Database → Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow admin users to read/write signatures
    match /signatures/{document} {
      allow read, write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
    
    // Allow admin users to read/write social content
    match /socialContent/{document} {
      allow read, write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
    
    // Allow public read access to assets, admin write access
    match /assets/{document} {
      allow read; // Anyone can read assets
      allow write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
    
    // Allow public read access to asset tags, admin write access
    match /assetTags/{document} {
      allow read; // Anyone can read tags for filtering
      allow write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
    
    // Legacy brandAssets collection (keep for compatibility)
    match /brandAssets/{document} {
      allow read, write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 2. Update Firebase Storage Rules

Go to Firebase Console → Storage → Rules and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow admin users to upload and manage assets
    match /assets/{allPaths=**} {
      allow read, write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
    
    // Allow admin users to upload and manage brand assets (legacy)
    match /brand-assets/{allPaths=**} {
      allow read, write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
    
    // Allow admin users to upload social content
    match /social-content/{allPaths=**} {
      allow read, write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
    
    // Allow public read access to all assets (but not write)
    match /assets/{allPaths=**} {
      allow read;
    }
    
    // Allow public read access to brand assets (but not write)
    match /brand-assets/{allPaths=**} {
      allow read;
    }
    
    // Deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## 🔍 Expected Results After Update

1. **Assets page loads without permission errors**
2. **"No assets found" message appears normally (not due to permission errors)**
3. **Debug info shows "Firestore: ✅ Connected"**
4. **Users can browse assets without signing in**
5. **Admin users can upload and manage assets after signing in**

## 🐛 Sign-in Loop Issue

If you're experiencing a sign-in loop, try these steps:

1. **Clear browser cache and cookies for the site**
2. **Open browser developer tools and check for JavaScript errors**
3. **Try signing in with an incognito/private window**
4. **Check if the auth.js file is loading properly**

The most likely cause is the permission errors preventing the page from loading properly, which should be fixed by updating the Firebase rules above.

## ✅ Verification Steps

After applying the rules:

1. Refresh the assets page
2. Check that debug info shows "Firestore: ✅ Connected"
3. Verify "No assets found" appears (not permission errors)
4. Try signing in - should work without loops
5. As admin, verify upload sections become visible

## 🚨 PRIORITY: Update Firebase Rules First

The permission-denied errors are blocking all functionality. Update the Firebase rules immediately to resolve the core issue.

## 🔧 Advanced Troubleshooting

If you're still getting permission errors after updating the rules, try these steps:

### Step 1: Verify Rules Are Published
1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Check that the timestamp shows recent publication
3. Look for any error messages in the rules editor
4. Click **Publish** again if needed

### Step 2: Check Rule Propagation
Firebase rules can take **2-5 minutes** to propagate globally. Signs of propagation delay:
- Rules show as published but errors persist
- Intermittent permission errors
- Some features work while others don't

**Solution**: Wait 5 minutes, then refresh the page.

### Step 3: Clear Browser Cache
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use incognito/private browsing mode

### Step 4: Run Diagnostic Script
1. Open the assets page
2. Open browser console (F12 → Console)
3. Paste and run this script:

```javascript
// Copy the content from firebase-troubleshoot.js and paste here
```

### Step 5: Manual Rule Test
Try this in the browser console:
```javascript
// Test if you can read from assets collection
db.collection('assets').limit(1).get()
  .then(() => console.log('✅ Rules working'))
  .catch(err => console.error('❌ Rules issue:', err));
```

### Step 6: Verify Project Configuration
Check that your Firebase project ID matches:
- In the code: `paradigm-email-signature`
- In Firebase Console URL
- In the rules you're updating

### Step 7: Temporary Open Rules (TESTING ONLY)
If nothing else works, temporarily use these open rules for testing:

**Firestore (Temporary):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // TEMPORARY - REMOVE AFTER TESTING
    }
  }
}
```

**Storage (Temporary):**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // TEMPORARY - REMOVE AFTER TESTING
    }
  }
}
```

⚠️ **IMPORTANT**: These rules allow anyone to read/write. Use only for testing, then revert to secure rules.

## 🚨 Common Issues & Solutions

### Issue: "Permission denied on resource project paradigm-email-signature"
- **Cause**: Rules not propagated or browser cache
- **Solution**: Wait 5 minutes, clear cache, refresh

### Issue: Rules published but errors persist
- **Cause**: Browser using cached rules
- **Solution**: Hard refresh or incognito mode

### Issue: Some collections work, others don't
- **Cause**: Typo in collection names in rules
- **Solution**: Double-check collection names match exactly

### Issue: Admin features not appearing
- **Cause**: Authentication not working or email mismatch
- **Solution**: Check debug info shows correct admin email
