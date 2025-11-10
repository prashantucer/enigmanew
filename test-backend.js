// Quick Backend Test Script
// Run this after installing Node.js: node test-backend.js

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing Backend Setup...\n');

// Test 1: Check serviceAccountKey.json
try {
    const serviceAccountPath = join(__dirname, 'backend', 'serviceAccountKey.json');
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    console.log('✅ serviceAccountKey.json: Found and valid');
    console.log(`   Project ID: ${serviceAccount.project_id}`);
} catch (error) {
    console.log('❌ serviceAccountKey.json: Missing or invalid');
    console.log(`   Error: ${error.message}`);
}

// Test 2: Check .env file
try {
    const envPath = join(__dirname, 'backend', '.env');
    const envContent = readFileSync(envPath, 'utf8');
    
    const hasRazorpayKey = envContent.includes('RAZORPAY_KEY_ID');
    const hasRazorpaySecret = envContent.includes('RAZORPAY_KEY_SECRET');
    
    if (hasRazorpayKey && hasRazorpaySecret) {
        console.log('✅ .env file: Found with Razorpay keys');
    } else {
        console.log('⚠️  .env file: Found but missing some keys');
    }
} catch (error) {
    console.log('❌ .env file: Missing');
}

// Test 3: Check package.json
try {
    const packagePath = join(__dirname, 'backend', 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    console.log('✅ package.json: Found');
    console.log(`   Dependencies: ${Object.keys(packageJson.dependencies).length} packages`);
} catch (error) {
    console.log('❌ package.json: Missing or invalid');
}

// Test 4: Check Firebase config
try {
    const firebaseConfigPath = join(__dirname, 'js', 'firebaseConfig.js');
    const firebaseConfig = readFileSync(firebaseConfigPath, 'utf8');
    
    if (firebaseConfig.includes('your-api-key-here') || firebaseConfig.includes('your-project-id')) {
        console.log('⚠️  firebaseConfig.js: Still has placeholder values');
    } else if (firebaseConfig.includes('enigmaregistration')) {
        console.log('✅ firebaseConfig.js: Updated with actual values');
    }
} catch (error) {
    console.log('❌ firebaseConfig.js: Missing');
}

console.log('\n📋 Next Steps:');
console.log('1. Install Node.js from nodejs.org (if not installed)');
console.log('2. Run: cd backend && npm install');
console.log('3. Run: cd backend && npm start');
console.log('4. Test: http://localhost:5000');




