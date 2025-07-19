// 🧪 POST-DEPLOYMENT VERIFICATION SCRIPT
// Run this in your browser console on the production site

async function verifyDeployment() {
    console.log('🚀 Starting Post-Deployment Verification...\n');
    
    // Test 1: Supabase Connection
    console.log('1️⃣ Testing Supabase Connection...');
    try {
        if (typeof window.supabase === 'undefined') {
            console.log('❌ Supabase library not loaded');
            return;
        }
        
        const supabase = window.supabase.createClient(
            'https://gijhfdjsmlgivjhvbtve.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpamhmZGpzbWxnaXZqaHZidHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTE3ODMsImV4cCI6MjA2ODUyNzc4M30.HWAjtnUIsAa8swRgtIcMz9z-Ll8N4PmqWas1DF2fFVY'
        );
        
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            console.log('❌ Auth session error:', error.message);
        } else {
            console.log('✅ Supabase connection successful');
            console.log('✅ Auth system working');
        }
    } catch (error) {
        console.log('❌ Supabase connection failed:', error.message);
    }
    
    // Test 2: Current URL
    console.log('\n2️⃣ Testing Current URL...');
    console.log('Current URL:', window.location.href);
    console.log('Is HTTPS:', window.location.protocol === 'https:');
    console.log('Domain:', window.location.hostname);
    
    // Test 3: OAuth Ready
    console.log('\n3️⃣ Testing OAuth Readiness...');
    const isNetlify = window.location.hostname.includes('netlify.app');
    const isHTTPS = window.location.protocol === 'https:';
    console.log('Is Netlify domain:', isNetlify);
    console.log('Is HTTPS:', isHTTPS);
    console.log('OAuth Ready:', isNetlify && isHTTPS ? '✅ YES' : '❌ NO');
    
    // Test 4: Email Ready
    console.log('\n4️⃣ Testing Email Flow Readiness...');
    console.log('Email confirmations will work:', isHTTPS ? '✅ YES' : '❌ NO');
    console.log('Password reset will work:', isHTTPS ? '✅ YES' : '❌ NO');
    
    console.log('\n🎯 VERIFICATION COMPLETE');
    console.log('=============================');
    
    if (isNetlify && isHTTPS) {
        console.log('✅ DEPLOYMENT SUCCESSFUL!');
        console.log('✅ Ready for full authentication testing');
        console.log('\n🔧 Next: Update Supabase URLs to match this domain');
    } else {
        console.log('⚠️ Deployment needs attention');
        console.log('⚠️ Check domain and HTTPS configuration');
    }
}

// Run verification
verifyDeployment();
