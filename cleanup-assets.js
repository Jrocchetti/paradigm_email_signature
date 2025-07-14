// Asset Cleanup Script for Brand Central
// This script removes all assets that were not uploaded by the admin user
// Run this in the browser console when logged in as admin

async function cleanupOldAssets() {
    console.log('🧹 Starting asset cleanup...');
    
    const adminEmail = 'jrocchetti@paradigmproductionsgroup.com';
    let deletedCount = 0;
    let skippedCount = 0;
    
    try {
        // Get all assets
        const assetsSnapshot = await db.collection('assets').get();
        console.log(`📄 Found ${assetsSnapshot.size} total assets`);
        
        const batch = db.batch();
        
        for (const doc of assetsSnapshot.docs) {
            const data = doc.data();
            
            // Check if uploaded by admin
            if (data.uploadedBy === adminEmail) {
                console.log(`✅ Keeping asset: ${data.name} (uploaded by admin)`);
                skippedCount++;
            } else {
                console.log(`🗑️ Marking for deletion: ${data.name} (uploaded by: ${data.uploadedBy || 'unknown'})`);
                batch.delete(doc.ref);
                deletedCount++;
            }
        }
        
        // Execute batch delete
        if (deletedCount > 0) {
            await batch.commit();
            console.log(`✅ Cleanup complete! Deleted ${deletedCount} assets, kept ${skippedCount} admin assets.`);
        } else {
            console.log(`✅ No cleanup needed. All ${skippedCount} assets were uploaded by admin.`);
        }
        
        return {
            deleted: deletedCount,
            kept: skippedCount,
            total: assetsSnapshot.size
        };
        
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        throw error;
    }
}

async function cleanupOldTags() {
    console.log('🏷️ Starting tag cleanup...');
    
    const adminEmail = 'jrocchetti@paradigmproductionsgroup.com';
    let deletedCount = 0;
    let skippedCount = 0;
    
    try {
        // Get all tags
        const tagsSnapshot = await db.collection('assetTags').get();
        console.log(`🏷️ Found ${tagsSnapshot.size} total tags`);
        
        const batch = db.batch();
        
        for (const doc of tagsSnapshot.docs) {
            const data = doc.data();
            
            // Check if created by admin
            if (data.createdBy === adminEmail) {
                console.log(`✅ Keeping tag: ${data.name} (created by admin)`);
                skippedCount++;
            } else {
                console.log(`🗑️ Marking tag for deletion: ${data.name} (created by: ${data.createdBy || 'unknown'})`);
                batch.delete(doc.ref);
                deletedCount++;
            }
        }
        
        // Execute batch delete
        if (deletedCount > 0) {
            await batch.commit();
            console.log(`✅ Tag cleanup complete! Deleted ${deletedCount} tags, kept ${skippedCount} admin tags.`);
        } else {
            console.log(`✅ No tag cleanup needed. All ${skippedCount} tags were created by admin.`);
        }
        
        return {
            deleted: deletedCount,
            kept: skippedCount,
            total: tagsSnapshot.size
        };
        
    } catch (error) {
        console.error('❌ Error during tag cleanup:', error);
        throw error;
    }
}

// Function to run complete cleanup
async function runCompleteCleanup() {
    console.log('🚀 Starting complete Brand Central asset cleanup...');
    console.log('⚠️ This will remove all assets and tags not created by the admin!');
    
    const confirm = window.confirm('Are you sure you want to delete all non-admin assets and tags? This cannot be undone.');
    if (!confirm) {
        console.log('❌ Cleanup cancelled by user');
        return;
    }
    
    try {
        // Check if user is admin
        const currentUser = auth.currentUser;
        if (!currentUser || currentUser.email !== 'jrocchetti@paradigmproductionsgroup.com') {
            throw new Error('Only the admin user can run cleanup');
        }
        
        // Run asset cleanup
        const assetResults = await cleanupOldAssets();
        
        // Run tag cleanup
        const tagResults = await cleanupOldTags();
        
        console.log('🎉 Complete cleanup finished!');
        console.log(`📊 Summary:
- Assets: ${assetResults.deleted} deleted, ${assetResults.kept} kept
- Tags: ${tagResults.deleted} deleted, ${tagResults.kept} kept`);
        
        // Refresh the page to show updated assets
        alert('Cleanup complete! The page will now refresh to show the updated assets.');
        window.location.reload();
        
    } catch (error) {
        console.error('❌ Cleanup failed:', error);
        alert('Cleanup failed: ' + error.message);
    }
}

// Export functions to global scope for easy access in console
window.cleanupOldAssets = cleanupOldAssets;
window.cleanupOldTags = cleanupOldTags;
window.runCompleteCleanup = runCompleteCleanup;

console.log('🧹 Asset cleanup script loaded!');
console.log('📝 Available functions:');
console.log('  - cleanupOldAssets() - Remove non-admin assets');
console.log('  - cleanupOldTags() - Remove non-admin tags');
console.log('  - runCompleteCleanup() - Run complete cleanup with confirmation');
console.log('💡 Usage: Open browser console and call runCompleteCleanup()');
