# Brand Central - Paradigm Productions Group

A comprehensive Brand Central website featuring an email signature generator, brand assets, guidelines, and resources for Paradigm Productions Group.

## Features

### Email Signature Generator
- 🖼️ **Headshot Integration**: Upload and crop images with zoom/pan controls
- 🎨 **Professional Design**: Custom rounded corners and consistent spacing
- 📱 **Email Client Compatible**: Works with Outlook, Gmail, and other email clients
- 💾 **Save & Load**: Firebase integration for saving signature templates
- 📋 **One-Click Copy**: Copy signatures directly to clipboard
- 🔄 **Dynamic Layout**: Button alignment that adapts to content width

### Brand Central
- 🏢 **Brand Assets**: Download logos, icons, and brand materials
- 📋 **Brand Guidelines**: Access comprehensive brand standards
- 📄 **Templates**: Professional templates for various use cases
- 🎯 **Resources**: Additional brand tools and information

### Authentication
- 🔐 **Secure Access**: Firebase Authentication for user management
- 📧 **Multiple Sign-In Options**: Google Sign-In or email/password
- 👤 **User Profiles**: Save preferences and signature templates

## Getting Started

### For Users Without Google Accounts
1. Visit the Brand Central homepage
2. Click "Sign In" in the navigation
3. On the login page, click "Create Account"
4. Fill out the signup form with your email and create a password
5. Start using all Brand Central features!

### For Users With Google Accounts
1. Visit the Brand Central homepage
2. Click "Sign In" in the navigation
3. Click "Sign in with Google"
4. You're all set!

### Password Reset
If you forget your password:
1. Go to the login page
2. Enter your email address
3. Click "Forgot Password?"
4. Check your email for reset instructions

## Live Demo

Visit the live application at: [https://brandcentral.netlify.app/](https://brandcentral.netlify.app/)

## Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start exploring Brand Central!

## File Structure

```
/
├── index.html              # Brand Central homepage
├── email-signature.html    # Signature generator
├── login.html             # Login page
├── signup.html            # User registration
├── register.html          # Admin registration (if needed)
├── brand-assets.html      # Brand asset downloads
├── guidelines.html        # Brand guidelines
├── templates.html         # Template library
├── resources.html         # Additional resources
├── auth.js               # Authentication helper
├── assets/
│   └── logos/            # Brand logo files
└── netlify.toml          # Deployment configuration
```

## Deployment

This application is deployed on Netlify with automatic deployments from the main branch.

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Authentication**: Firebase Auth (Google + email/password)
- **Database**: Firebase Firestore
- **Canvas API**: For image processing and PNG generation
- **Deployment**: Netlify

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Outlook Web App

## Support

For questions or support, please contact: **jrocchetti@paradigmproductionsgroup.com**

---

Built with ❤️ for Paradigm Productions Group
