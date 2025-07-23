# Assets Manager - Admin Tool

## Overview
The Assets Manager is a comprehensive admin-only tool that allows `jrocchetti@paradigmproductionsgroup.com` to upload, organize, and manage all brand assets for Brand Central.

## Features

### 🔐 **Admin-Only Access**
- Only authorized admin users can access this tool
- Requires authentication and admin permission check
- Integrates with the existing Brand Central auth system

### 📁 **Asset Categories**
The manager organizes assets into the following categories:
- **Logos**: Company logos, brand marks, wordmarks
- **Images**: Photos, graphics, marketing images
- **Documents**: PDFs, presentations, brand guidelines
- **Templates**: PowerPoint, Keynote, design templates
- **Icons**: UI icons, social media icons, graphic elements

### 📤 **Upload Functionality**
- **Drag & Drop Interface**: Easy file upload with visual feedback
- **Multiple File Support**: Upload multiple files simultaneously
- **Progress Tracking**: Real-time upload progress bars
- **File Type Validation**: Automatic categorization based on file type
- **Supported Formats**:
  - Images: JPG, PNG, SVG, GIF, WebP
  - Documents: PDF, DOC, DOCX, PPT, PPTX, AI, PSD, Sketch

### 🎯 **Asset Management**
- **Grid View**: Visual thumbnail grid for easy browsing
- **Category Filtering**: Filter assets by category (All, Logos, Images, etc.)
- **Asset Details**: File size, upload date, category information
- **Quick Actions**:
  - Download asset
  - Copy URL to clipboard
  - Delete asset (with confirmation)

### 🔗 **Integration**
- **Firebase Storage**: Secure cloud storage for all assets
- **Firestore Database**: Metadata storage for asset organization
- **URL Generation**: Direct download URLs for easy asset sharing
- **Brand Central Integration**: Assets can be referenced throughout the website

## Technical Implementation

### **Firebase Collections**
- **brandAssets**: Stores asset metadata including:
  - File name and original name
  - Category and file type
  - File size and download URL
  - Upload timestamp and uploader email

### **Storage Structure**
```
brand-assets/
├── logos/
├── images/
├── documents/
├── templates/
└── icons/
```

### **Security**
- Admin authentication required
- Firestore security rules restrict access to admin users only
- Firebase Storage rules should also be configured for admin-only access

## Usage Instructions

### **For Admin Users:**

1. **Access the Tool**
   - Navigate to `/assets-manager.html`
   - Sign in with admin credentials
   - Admin access will be automatically verified

2. **Upload Assets**
   - Click on the appropriate upload area (Images or Documents)
   - Select one or multiple files
   - Monitor upload progress
   - Assets are automatically categorized

3. **Manage Assets**
   - Use category tabs to filter assets
   - Click Download to save assets locally
   - Use Copy URL to get shareable links
   - Delete assets with the Delete button (requires confirmation)

4. **Best Practices**
   - Use descriptive file names
   - Organize files by putting category keywords in names (e.g., "logo_", "icon_", "template_")
   - Upload high-quality originals
   - Regularly review and clean up unused assets

## Firestore Security Rules

The following rules must be added to Firebase Firestore to enable the Assets Manager:

```javascript
// Allow admin users to manage brand assets
match /brandAssets/{document} {
  allow read, write: if request.auth != null 
    && request.auth.token.email in [
      'jrocchetti@paradigmproductionsgroup.com',
      'admin@test.com'
    ];
}
```

## Firebase Storage Rules

Recommended Firebase Storage security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /brand-assets/{allPaths=**} {
      allow read, write: if request.auth != null 
        && request.auth.token.email in [
          'jrocchetti@paradigmproductionsgroup.com',
          'admin@test.com'
        ];
    }
  }
}
```

## Navigation Integration

The Assets Manager is integrated into the Brand Central navigation on all admin pages:
- Boost section
- Email signature generator
- Resources/Tools page
- Other admin-only pages

## Future Enhancements

Potential future improvements:
- Bulk operations (select multiple assets)
- Advanced search and filtering
- Asset versioning
- Usage tracking (where assets are being used)
- Automated optimization for web use
- Integration with brand-assets.html for public asset downloads
- Asset approval workflows
- Batch upload via ZIP files

## Troubleshooting

### Common Issues:
1. **Upload Fails**: Check Firestore rules and Firebase Storage rules
2. **Assets Don't Load**: Verify admin authentication and database permissions
3. **No Upload Progress**: Check browser console for JavaScript errors
4. **Access Denied**: Ensure user email is in admin list in auth.js

### Console Debugging:
The Assets Manager includes comprehensive console logging for debugging:
- Firebase initialization status
- Authentication state
- Upload progress
- Asset loading status
