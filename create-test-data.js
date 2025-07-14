// Test Data Creation Script for Assets System
// Run this in browser console as admin to add sample assets and tags

async function createTestData() {
    console.log('🧪 Creating test data for assets system...');
    
    // Check if user is admin
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.email !== 'jrocchetti@paradigmproductionsgroup.com') {
        console.error('❌ Must be logged in as admin to create test data');
        alert('Please sign in as admin first');
        return;
    }
    
    try {
        // Create test tags
        console.log('📝 Creating test tags...');
        const testTags = ['branding', 'logo', 'template', 'social-media', 'print'];
        
        for (const tag of testTags) {
            await db.collection('assetTags').add({
                name: tag,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: currentUser.email
            });
            console.log(`✅ Created tag: ${tag}`);
        }
        
        // Create sample asset metadata (without actual files)
        console.log('📁 Creating sample asset metadata...');
        const sampleAssets = [
            {
                name: 'primary-logo.svg',
                downloadURL: 'https://via.placeholder.com/400x200/3FCBFF/1F1633?text=Primary+Logo',
                size: 15420,
                type: 'image/svg+xml',
                category: 'logos',
                tags: ['branding', 'logo'],
                uploadedBy: currentUser.email,
                uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            {
                name: 'brand-guidelines.pdf',
                downloadURL: 'https://via.placeholder.com/400x200/28a745/ffffff?text=Brand+Guidelines+PDF',
                size: 2048000,
                type: 'application/pdf',
                category: 'documents',
                tags: ['branding', 'template'],
                uploadedBy: currentUser.email,
                uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            {
                name: 'social-post-template.png',
                downloadURL: 'https://via.placeholder.com/400x200/ffc107/1F1633?text=Social+Template',
                size: 856400,
                type: 'image/png',
                category: 'templates',
                tags: ['social-media', 'template'],
                uploadedBy: currentUser.email,
                uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            {
                name: 'company-icon.png',
                downloadURL: 'https://via.placeholder.com/200x200/3FCBFF/1F1633?text=Icon',
                size: 45600,
                type: 'image/png',
                category: 'icons',
                tags: ['branding', 'logo'],
                uploadedBy: currentUser.email,
                uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        ];
        
        for (const asset of sampleAssets) {
            await db.collection('assets').add(asset);
            console.log(`✅ Created asset: ${asset.name}`);
        }
        
        console.log('🎉 Test data created successfully!');
        console.log('📊 Summary:');
        console.log(`- Created ${testTags.length} tags`);
        console.log(`- Created ${sampleAssets.length} sample assets`);
        
        // Refresh the page to show new data
        alert('Test data created! The page will refresh to show the new assets.');
        window.location.reload();
        
    } catch (error) {
        console.error('❌ Error creating test data:', error);
        alert('Error creating test data: ' + error.message);
    }
}

// Add global function
window.createTestData = createTestData;

console.log('🧪 Test data script loaded!');
console.log('💡 Usage: Sign in as admin, then run: createTestData()');
