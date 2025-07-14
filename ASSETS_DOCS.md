# Brand Assets - Unified Asset Management

## Overview
The Brand Assets page (`assets.html`) provides a unified interface that combines asset browsing for all users with administrative management capabilities for authorized admin users. This single page serves both as a public asset gallery and an admin management tool.

## Access Levels

### 🔐 **Admin Access** (jrocchetti@paradigmproductionsgroup.com)
- Full upload and management capabilities
- Taxonomy (tag/category) management
- Asset deletion and organization
- All features visible and accessible

### 👥 **User Access** (All authenticated users)
- Browse and view all assets
- Filter by categories and tags
- Search functionality
- Download assets and copy links
- Admin-only features are hidden

## Features

### 📁 **Asset Categories**
Assets are organized into categories:
- **All Assets**: Complete asset library
- **Logos**: Company logos, brand marks, wordmarks
- **Images**: Photos, graphics, marketing visuals
- **Documents**: PDFs, presentations, brand guidelines
- **Templates**: PowerPoint, Keynote, design files
- **Icons**: UI icons, social media graphics

### 🏷️ **Taxonomy System** (Admin Only)
- **Dynamic Tags**: Admin can create custom tags for better organization
- **Category Management**: Add, edit, and remove tags/categories
- **Asset Tagging**: Apply multiple tags to each asset for flexible filtering
- **User Filtering**: All users can filter assets by admin-defined tags

### 📤 **Upload System** (Admin Only)
- **Multi-Category Upload**: Separate upload areas for images and documents
- **Drag & Drop Interface**: Visual upload areas with progress indicators
- **Supported Formats**:
  - **Images**: JPG, PNG, SVG, GIF, WebP
  - **Documents**: PDF, DOC, DOCX, PPT, PPTX, AI, PSD, Sketch
- **Automatic Categorization**: Files auto-categorized based on type
- **Progress Tracking**: Real-time upload progress with status messages

### 🔍 **Search & Filtering**
- **Universal Search**: Search by filename, type, or tags
- **Category Tabs**: Quick filtering by asset type
- **Tag-based Filtering**: Filter by admin-defined tags
- **Clear Filters**: Reset all filters to view all assets
- **Real-time Results**: Instant filtering as you type

### 🎯 **Asset Management**
- **Grid Layout**: Visual thumbnail grid for easy browsing
- **Asset Preview**: Image previews with fallback file type icons
- **Detailed Information**: Filename, size, upload date, and tags
- **User Actions** (available to all):
  - Download asset
  - Copy shareable URL
  - View asset details
- **Admin Actions** (admin only):
  - Delete assets with confirmation
  - Edit asset tags (future feature)

### 🔗 **Integration Points**
- **Firebase Storage**: Secure cloud storage with public read access
- **Firestore Database**: Asset metadata and taxonomy storage
- **Authentication**: Integrated with Brand Central auth system
- **Navigation**: Unified access point from all Brand Central pages

## Security Model

### **Firebase Storage Rules**
```javascript
// Allow admin to upload and manage
match /brand-assets/{allPaths=**} {
  allow read, write: if request.auth != null 
    && request.auth.token.email == 'jrocchetti@paradigmproductionsgroup.com';
}

// Allow public read access to all assets
match /brand-assets/{allPaths=**} {
  allow read;
}
```

### **Firestore Rules**
```javascript
// Admin can manage asset metadata
match /assets/{document} {
  allow read, write: if request.auth != null 
    && request.auth.token.email == 'jrocchetti@paradigmproductionsgroup.com';
}

// Admin can manage tags
match /assetTags/{document} {
  allow read, write: if request.auth != null 
    && request.auth.token.email == 'jrocchetti@paradigmproductionsgroup.com';
}
```

## Data Structure

### **Assets Collection** (`/assets/{assetId}`)
```javascript
{
  name: "company-logo.svg",
  downloadURL: "https://firebasestorage.../company-logo.svg",
  size: 15420,
  type: "image/svg+xml",
  category: "logos",
  tags: ["logo", "branding", "svg"],
  uploadedBy: "jrocchetti@paradigmproductionsgroup.com",
  uploadedAt: Timestamp
}
```

### **Asset Tags Collection** (`/assetTags/{tagId}`)
```javascript
{
  name: "branding",
  createdBy: "jrocchetti@paradigmproductionsgroup.com",
  createdAt: Timestamp
}
```

## Usage Instructions

### For Admin Users:
1. **Navigate** to `/assets.html`
2. **Upload Assets**: Use the upload cards to add new assets
3. **Manage Tags**: Add tags in the taxonomy section for better organization
4. **Organize**: Apply tags to uploaded assets
5. **Maintain**: Delete outdated or incorrect assets as needed

### For All Users:
1. **Browse**: Visit `/assets.html` to view all available assets
2. **Filter**: Use category tabs or search to find specific assets
3. **Download**: Click download button or copy asset URL
4. **Access**: Assets are available across all Brand Central tools

## Asset Cleanup

A cleanup script (`cleanup-assets.js`) is available to remove assets not uploaded by the admin:

```javascript
// Run in browser console as admin
runCompleteCleanup();
```

This ensures only admin-managed assets remain in the system.

## File Organization

- **Main Page**: `assets.html` - Unified interface
- **Cleanup Script**: `cleanup-assets.js` - Remove non-admin assets
- **Auth Integration**: Uses existing `auth.js` for permission management
- **Documentation**: This file documents the complete system

## Migration Notes

This unified system replaces:
- ❌ `brand-assets.html` (old static assets page)
- ❌ `assets-manager.html` (old admin-only manager)
- ✅ `assets.html` (new unified page with role-based features)

All navigation has been updated to point to the new unified page.
