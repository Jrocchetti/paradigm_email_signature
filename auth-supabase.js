// Supabase Authentication helper for Brand Central
// Include this script in pages that require authentication

class BrandCentralAuth {
    constructor() {
        this.user = null;
        this.initialized = false;
        this.supabase = null;
        this.init();
    }

    // Initialize Supabase Auth
    async init() {
        try {
            // Wait for Supabase library to load
            await this.waitForSupabaseLibrary();
            
            // Initialize Supabase client
            await this.initializeSupabase();
            
            // Set up auth state listener
            this.setupAuthListener();
            
        } catch (error) {
            console.error('Auth initialization error:', error);
        }
    }

    // Wait for Supabase library to load
    waitForSupabaseLibrary() {
        return new Promise((resolve) => {
            const checkLibrary = () => {
                if (typeof window.supabase !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkLibrary, 100);
                }
            };
            
            checkLibrary();
        });
    }

    // Initialize Supabase client
    async initializeSupabase() {
        try {
            const SUPABASE_URL = 'https://gijhfdjsmlgivjhvbtve.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpamhmZGpzbWxnaXZqaHZidHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTE3ODMsImV4cCI6MjA2ODUyNzc4M30.HWAjtnUIsAa8swRgtIcMz9z-Ll8N4PmqWas1DF2fFVY';
            
            if (typeof window.supabase === 'undefined') {
                throw new Error('Supabase library not loaded');
            }
            
            this.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase Auth client initialized');
            
        } catch (error) {
            console.error('❌ Supabase initialization error:', error);
            throw error;
        }
    }

    // Set up authentication state listener
    setupAuthListener() {
        if (!this.supabase) {
            console.error('Supabase client not initialized');
            return;
        }

        // Listen for auth state changes
        this.supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            
            this.user = session?.user || null;
            this.initialized = true;
            this.updateUI();
            
            if (session?.user) {
                console.log('User signed in:', session.user.email);
                this.onSignIn(session.user);
            } else {
                console.log('User signed out');
                this.onSignOut();
            }
        });

        // Get initial session
        this.getInitialSession();
    }

    // Get initial session
    async getInitialSession() {
        try {
            const { data: { session }, error } = await this.supabase.auth.getSession();
            
            if (error) {
                console.error('Error getting session:', error);
                return;
            }
            
            this.user = session?.user || null;
            this.initialized = true;
            this.updateUI();
            
            if (session?.user) {
                console.log('Initial session found:', session.user.email);
                this.onSignIn(session.user);
            }
        } catch (error) {
            console.error('Error getting initial session:', error);
            this.initialized = true; // Mark as initialized even if there's an error
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
            if (!this.supabase) {
                throw new Error('Supabase client not initialized');
            }
            
            const { error } = await this.supabase.auth.signOut();
            if (error) {
                throw error;
            }
            
            console.log('User signed out successfully');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Sign out error:', error);
            // Force redirect even if sign out fails
            this.user = null;
            window.location.href = 'login.html';
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
        
        // Try to get display name from user metadata
        const userData = this.user.user_metadata || {};
        
        if (userData.first_name && userData.last_name) {
            return `${userData.first_name} ${userData.last_name}`;
        }
        
        if (userData.first_name) {
            return userData.first_name;
        }
        
        if (userData.full_name) {
            return userData.full_name;
        }
        
        // Fallback to email username
        return this.user.email.split('@')[0];
    }

    // Get user profile picture
    getPhotoURL() {
        if (!this.user) return null;
        
        // Try to get avatar from user metadata
        const userData = this.user.user_metadata || {};
        return userData.avatar_url || userData.picture || null;
    }

    // Check if user has admin access for specific features
    isAdmin() {
        if (!this.user || !this.user.email) return false;
        
        // List of specific admin emails - only these users have admin access
        const adminEmails = [
            'jrocchetti@paradigmproductionsgroup.com',
            'admin@test.com' // For testing only
        ];
        
        // Check user metadata for admin role
        const userData = this.user.user_metadata || {};
        if (userData.role === 'admin') {
            return true;
        }
        
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

    // Get user metadata
    getUserMetadata() {
        if (!this.user) return {};
        return this.user.user_metadata || {};
    }

    // Update user metadata
    async updateUserMetadata(metadata) {
        try {
            if (!this.supabase) {
                throw new Error('Supabase client not initialized');
            }
            
            const { data, error } = await this.supabase.auth.updateUser({
                data: metadata
            });
            
            if (error) {
                throw error;
            }
            
            console.log('User metadata updated successfully');
            return data;
        } catch (error) {
            console.error('Error updating user metadata:', error);
            throw error;
        }
    }
}

// Create global auth instance only if Supabase is available or will be available
let brandCentralAuthInstance = null;

// Initialize auth when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page that should have Supabase
    const hasSupabaseScript = document.querySelector('script[src*="supabase"]');
    
    if (hasSupabaseScript || typeof window.supabase !== 'undefined') {
        brandCentralAuthInstance = new BrandCentralAuth();
        
        // Make BrandCentralAuth class available globally
        window.BrandCentralAuth = BrandCentralAuth;
        
        // Create global instance for easy access
        window.brandCentralAuth = brandCentralAuthInstance;
        
        console.log('✅ BrandCentralAuth (Supabase) initialized and available globally');
    } else {
        console.log('⚠️ Supabase not detected, BrandCentralAuth not initialized');
    }
});

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
