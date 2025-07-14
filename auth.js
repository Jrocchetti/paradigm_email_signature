// Authentication helper for Brand Central
// Include this script in pages that require authentication

class BrandCentralAuth {
    constructor() {
        this.user = null;
        this.initialized = false;
        this.init();
    }

    // Initialize Firebase Auth
    async init() {
        try {
            // Firebase config should already be loaded
            if (typeof firebase === 'undefined') {
                console.error('Firebase not loaded');
                return;
            }

            this.auth = firebase.auth();
            
            // Listen for auth state changes
            this.auth.onAuthStateChanged((user) => {
                this.user = user;
                this.initialized = true;
                this.updateUI();
                
                if (user) {
                    console.log('User signed in:', user.email);
                    this.onSignIn(user);
                } else {
                    console.log('User signed out');
                    this.onSignOut();
                }
            });
        } catch (error) {
            console.error('Auth initialization error:', error);
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.user !== null;
    }

    // Check if auth system is initialized
    isInitialized() {
        return this.initialized;
    }

    // Get current user
    getCurrentUser() {
        return this.user;
    }

    // Sign out user
    async signOut() {
        try {
            await this.auth.signOut();
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Sign out error:', error);
        }
    }

    // Require authentication (redirect to login if not authenticated)
    requireAuth() {
        if (!this.initialized) {
            console.log('Auth not initialized yet, waiting...');
            return true; // Don't redirect while still initializing
        }
        
        if (!this.isAuthenticated()) {
            console.log('User not authenticated, redirecting to login');
            window.location.href = 'login.html';
            return false;
        }
        
        console.log('User authenticated:', this.user.email);
        return true;
    }

    // Require admin access (redirect to login if not admin)
    requireAdmin() {
        if (!this.initialized) {
            console.log('Auth not initialized yet, waiting...');
            return true; // Don't redirect while still initializing
        }
        
        if (!this.isAuthenticated()) {
            console.log('User not authenticated, redirecting to login');
            window.location.href = 'login.html';
            return false;
        }

        if (!this.isAdmin()) {
            console.log('User not authorized for admin access:', this.user.email);
            alert('Access denied. Only authorized admin users can access this tool.');
            window.location.href = 'index.html';
            return false;
        }
        
        console.log('Admin access granted:', this.user.email);
        return true;
    }

    // Update UI based on auth state
    updateUI() {
        const loginBtn = document.getElementById('auth-login-btn');
        const userInfo = document.getElementById('auth-user-info');
        const protectedContent = document.querySelectorAll('.auth-protected');

        if (this.isAuthenticated()) {
            // Show user info, hide login button
            if (loginBtn) loginBtn.style.display = 'none';
            if (userInfo) {
                userInfo.style.display = 'block';
                userInfo.innerHTML = `
                    <div class="user-dropdown">
                        <span class="user-email">${this.getDisplayName()}</span>
                        <button id="auth-signout-btn" class="signout-btn">Sign Out</button>
                    </div>
                `;
                
                // Add sign out handler
                const signOutBtn = document.getElementById('auth-signout-btn');
                if (signOutBtn) {
                    signOutBtn.addEventListener('click', () => this.signOut());
                }
            }

            // Show protected content
            protectedContent.forEach(element => {
                element.style.display = 'block';
            });
        } else {
            // Show login button, hide user info
            if (loginBtn) {
                loginBtn.style.display = 'inline-block';
                loginBtn.href = 'login.html';
            }
            if (userInfo) userInfo.style.display = 'none';

            // Hide protected content
            protectedContent.forEach(element => {
                element.style.display = 'none';
            });
        }
    }

    // Called when user signs in
    onSignIn(user) {
        // Override this method in your pages if needed
        console.log('User signed in:', user.email);
    }

    // Called when user signs out
    onSignOut() {
        // Override this method in your pages if needed
        console.log('User signed out');
    }

    // Check if user has specific domain email
    hasValidDomain() {
        if (!this.user || !this.user.email) return false;
        return this.user.email.endsWith('@paradigmproductionsgroup.com');
    }

    // Get user display name
    getDisplayName() {
        if (!this.user) return null;
        return this.user.displayName || this.user.email.split('@')[0];
    }

    // Get user profile picture
    getPhotoURL() {
        if (!this.user) return null;
        return this.user.photoURL;
    }

    // Check if user has admin access for specific features
    isAdmin() {
        if (!this.user || !this.user.email) return false;
        
        // List of specific admin emails - only these users have admin access
        const adminEmails = [
            'jrocchetti@paradigmproductionsgroup.com',
            'admin@test.com' // For testing only
        ];
        
        // Only users in the admin list have admin access
        return adminEmails.includes(this.user.email);
    }

    // Check if user can upload content (admin only)
    canUploadContent() {
        return this.isAdmin();
    }

    // Check if user can access tools (email signature generator, etc.)
    canAccessTools() {
        return this.isAdmin();
    }

    // Check if user can access any protected features
    hasAccess() {
        return this.isAdmin();
    }

    // Get user role based on admin status
    getUserRole() {
        if (!this.user || !this.user.email) return 'guest';
        if (this.isAdmin()) return 'admin';
        return 'user';
    }
}

// Create global auth instance
const brandCentralAuthInstance = new BrandCentralAuth();

// Make BrandCentralAuth class available globally
window.BrandCentralAuth = BrandCentralAuth;

// Create global instance for easy access
window.brandCentralAuth = brandCentralAuthInstance;

console.log('✅ BrandCentralAuth initialized and available globally');

// Add CSS for auth UI elements
const authStyles = `
    .auth-protected {
        display: none;
    }
    
    .user-dropdown {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
    }
    
    .user-email {
        color: #3FCBFF;
        font-weight: 500;
    }
    
    .signout-btn {
        background: rgba(63, 203, 255, 0.1);
        color: #3FCBFF;
        border: 1px solid rgba(63, 203, 255, 0.3);
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Manrope', sans-serif;
    }
    
    .signout-btn:hover {
        background: rgba(63, 203, 255, 0.2);
        border-color: rgba(63, 203, 255, 0.5);
    }
    
    #auth-login-btn {
        background: linear-gradient(45deg, #3FCBFF, #2db8e8);
        color: #1F1633;
        padding: 8px 16px;
        border-radius: 20px;
        text-decoration: none;
        font-weight: 600;
        font-size: 13px;
        transition: all 0.3s ease;
    }
    
    #auth-login-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(63, 203, 255, 0.3);
    }
    
    @media (max-width: 768px) {
        .user-dropdown {
            flex-direction: column;
            gap: 5px;
            align-items: flex-end;
        }
        
        .user-email {
            font-size: 12px;
        }
    }
`;

// Inject auth styles
const styleSheet = document.createElement('style');
styleSheet.textContent = authStyles;
document.head.appendChild(styleSheet);
