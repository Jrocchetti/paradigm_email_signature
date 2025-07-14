// Firebase Rules Troubleshooting Script
// Run this in the browser console on the assets page

console.log('🔧 Starting Firebase Rules Troubleshooting...');

async function troubleshootFirebaseRules() {
    console.log('🔍 Testing Firebase configuration and rules...');
    
    // Test 1: Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase not loaded');
        return;
    }
    console.log('✅ Firebase SDK loaded');
    
    // Test 2: Check if services are initialized
    if (!db || !auth || !storage) {
        console.error('❌ Firebase services not initialized');
        return;
    }
    console.log('✅ Firebase services initialized');
    
    // Test 3: Check current user
    const user = auth.currentUser;
    console.log(`👤 Current user: ${user ? user.email : 'Not authenticated'}`);
    
    // Test 4: Test Firestore rules with different collections
    const collections = ['assets', 'brandAssets', 'assetTags'];
    
    for (const collection of collections) {
        try {
            console.log(`🔍 Testing read access to collection: ${collection}`);
            const ref = db.collection(collection).limit(1);
            const snapshot = await ref.get();
            console.log(`✅ ${collection}: Read access OK (${snapshot.size} documents)`);
        } catch (error) {
            console.error(`❌ ${collection}: ${error.code} - ${error.message}`);
        }
    }
    
    // Test 5: Test Storage rules
    try {
        console.log('🔍 Testing Storage read access...');
        const storageRef = storage.ref('assets/');
        await storageRef.listAll();
        console.log('✅ Storage: Read access OK');
    } catch (error) {
        console.error(`❌ Storage: ${error.code} - ${error.message}`);
    }
    
    // Test 6: Check Firebase project configuration
    console.log('🔍 Firebase project info:');
    console.log(`Project ID: ${firebase.app().options.projectId}`);
    console.log(`Auth Domain: ${firebase.app().options.authDomain}`);
    console.log(`Storage Bucket: ${firebase.app().options.storageBucket}`);
    
    console.log('🔧 Troubleshooting complete!');
    
    // Suggestions
    console.log('\n💡 If you see permission-denied errors:');
    console.log('1. Wait 2-3 minutes for Firebase rules to propagate');
    console.log('2. Clear browser cache and refresh');
    console.log('3. Check that Firebase rules are published');
    console.log('4. Verify project ID matches in Firebase console');
}

// Run the troubleshooting
troubleshootFirebaseRules();

// Add global function for easy re-testing
window.troubleshootFirebaseRules = troubleshootFirebaseRules;

console.log('💡 You can re-run this test anytime by typing: troubleshootFirebaseRules()');
