# Firestore Security Rules for Brand Central

## Current Issue
The email signature tool is showing "Missing or insufficient permissions" when trying to load saved signatures.

## Required Firestore Security Rules

To fix the permissions issue, you need to update the Firestore security rules in the Firebase Console. Here are the recommended rules:

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

## How to Apply These Rules

1. Go to the Firebase Console: https://console.firebase.google.com/
2. Select your project: `email-signature-generato-10c84`
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with the rules above
6. Click **Publish** to apply the changes

## What These Rules Do

- **Allow admin-only access**: Only `jrocchetti@paradigmproductionsgroup.com` and `admin@test.com` can read/write data
- **Signatures collection**: Admin can save and load email signatures
- **socialContent collection**: Admin can upload and manage social media content
- **brandAssets collection**: Admin can manage uploaded brand assets metadata
- **Deny all other access**: Any other users or unauthenticated requests are denied

## ⚠️ IMPORTANT: Firebase Storage Rules Also Required

The Assets Manager also needs **Firebase Storage security rules** to be updated. In the Firebase Console:

1. Go to **Storage** in the left sidebar
2. Click on the **Rules** tab
3. Replace the existing rules with:

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

## Alternative Simpler Rules (For Testing)

If you want to temporarily allow any authenticated user (less secure but easier for testing):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Current Status
✅ **Authentication System**: Working perfectly - jrocchetti@paradigmproductionsgroup.com has admin access
✅ **Assets Manager**: Loading correctly with admin access
❌ **Firestore Permissions**: Need to be updated in Firebase Console
❌ **Firebase Storage Permissions**: Need to be updated in Firebase Console for file uploads

## Quick Fix for Testing
If you want to temporarily allow any authenticated user to upload files (less secure):

**Firebase Storage Rules (Temporary):**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
