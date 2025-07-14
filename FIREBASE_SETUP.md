# Firebase Setup Guide for Boost Feature

## Overview
The Boost feature uses Firebase Firestore for content metadata storage and Firebase Storage for file uploads. This guide explains how to set up the necessary Firebase rules and collections.

## Firebase Firestore Setup

### 1. Collection Structure
Create a collection called `socialContent` with the following document structure:

```javascript
{
  title: "string",                    // Title of the content
  description: "string",              // Description
  linkedinCaption: "string",          // Caption for LinkedIn
  instagramCaption: "string",         // Caption for Instagram
  category: "string",                 // Content category
  fileType: "photo|video",           // Type of media file
  fileUrl: "string",                 // Firebase Storage download URL
  fileName: "string",                // Original filename
  fileSize: "number",                // File size in bytes
  uploadedAt: "timestamp",           // Server timestamp
  uploadedBy: "string",              // Email of uploader
  downloadCount: "number"            // Number of downloads
}
```

### 2. Firestore Security Rules
Add these rules to your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to socialContent for all authenticated users
    match /socialContent/{document} {
      allow read: if request.auth != null;
      
      // Allow write access only to @paradigmproductionsgroup.com emails
      allow write: if request.auth != null 
        && request.auth.token.email.matches('.*@paradigmproductionsgroup.com$');
      
      // Allow updates to downloadCount for authenticated users
      allow update: if request.auth != null 
        && resource.data.keys().hasAll(['downloadCount'])
        && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['downloadCount']);
    }
    
    // Add other collection rules as needed
  }
}
```

## Firebase Storage Setup

### 1. Storage Structure
Files will be organized in the following structure:
```
social-content/
  content_[timestamp]_[index]/
    [original-filename]
```

### 2. Storage Security Rules
Add these rules to your Firebase Storage security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to social-content for all authenticated users
    match /social-content/{allPaths=**} {
      allow read: if request.auth != null;
      
      // Allow write access only to @paradigmproductionsgroup.com emails
      allow write: if request.auth != null 
        && request.auth.token.email.matches('.*@paradigmproductionsgroup.com$');
    }
  }
}
```

## Implementation Features

### Admin Features (requires @paradigmproductionsgroup.com email):
- Upload new social media content (photos/videos)
- Add LinkedIn and Instagram captions
- Categorize content
- View upload analytics

### User Features (any authenticated user):
- Browse social media content library
- Download high-quality media files
- Copy ready-to-use captions
- Filter content by category/type
- Track download counts

### Content Categories:
- General
- Behind the Scenes
- Company Culture
- Projects
- Tips & Insights
- Announcements

## File Type Support
- **Images**: JPG, PNG, GIF, WebP
- **Videos**: MP4, MOV, AVI, WebM

## Usage Analytics
The system tracks:
- Upload timestamps and user
- Download counts per content item
- Content performance metrics

## Security Considerations
1. Only company email addresses can upload content
2. All uploads are automatically scanned for appropriate content
3. Download tracking helps monitor content usage
4. Firestore rules prevent unauthorized data modification

## Deployment Checklist
- [ ] Firestore collection created with proper indexes
- [ ] Firestore security rules deployed
- [ ] Storage bucket configured with security rules
- [ ] Firebase configuration updated in boost.html
- [ ] Authentication working with company email restriction
- [ ] Test upload and download functionality
- [ ] Verify admin access control
