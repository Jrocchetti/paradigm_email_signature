// Test file to check for syntax issues
console.log('Testing...');

// Basic function structure
function test() {
    console.log('Test function');
}

// Check if Firebase is available
if (typeof firebase !== 'undefined') {
    console.log('Firebase loaded');
} else {
    console.log('Firebase not loaded');
}

console.log('Syntax test complete');
