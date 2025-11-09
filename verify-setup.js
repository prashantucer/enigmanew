// Setup Verification Script
// Run with: node verify-setup.js

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verifying ENIGMA XIII Setup...\n');
console.log('='.repeat(50));

let allGood = true;

// Check 1: Service Account Key
console.log('\n1️⃣  Checking Service Account Key...');
try {
    const keyPath = join(__dirname, 'backend', 'serviceAccountKey.json');
    if (existsSync(keyPath)) {
        const key = JSON.parse(readFileSync(keyPath, 'utf8'));
        if (key.project_id === 'enigmaregistration') {
            console.log('   ✅ serviceAccountKey.json: Found and valid');
            console.log(`   📦 Project ID: ${key.project_id}`);
        } else {
            console.log('   ⚠️  serviceAccountKey.json: Project ID mismatch');
            allGood = false;
        }
    } else {
        console.log('   ❌ serviceAccountKey.json: Not found');
        allGood = false;
    }
} catch (error) {
    console.log('   ❌ serviceAccountKey.json: Error reading file');
    allGood = false;
}

// Check 2: Backend .env
console.log('\n2️⃣  Checking Backend Environment...');
try {
    const envPath = join(__dirname, 'backend', '.env');
    if (existsSync(envPath)) {
        const envContent = readFileSync(envPath, 'utf8');
        const checks = {
            'RAZORPAY_KEY_ID': envContent.includes('RAZORPAY_KEY_ID'),
            'RAZORPAY_KEY_SECRET': envContent.includes('RAZORPAY_KEY_SECRET'),
            'PORT': envContent.includes('PORT')
        };
        
        const allPresent = Object.values(checks).every(v => v);
        if (allPresent) {
            console.log('   ✅ .env file: All required variables present');
        } else {
            console.log('   ⚠️  .env file: Some variables missing');
            Object.entries(checks).forEach(([key, present]) => {
                console.log(`      ${present ? '✅' : '❌'} ${key}`);
            });
        }
    } else {
        console.log('   ❌ .env file: Not found');
        allGood = false;
    }
} catch (error) {
    console.log('   ❌ .env file: Error reading');
    allGood = false;
}

// Check 3: Firebase Config
console.log('\n3️⃣  Checking Firebase Frontend Config...');
try {
    const configPath = join(__dirname, 'js', 'firebaseConfig.js');
    if (existsSync(configPath)) {
        const config = readFileSync(configPath, 'utf8');
        if (config.includes('enigmaregistration') && !config.includes('your-api-key-here')) {
            console.log('   ✅ firebaseConfig.js: Updated with actual values');
            console.log('   📦 Project: enigmaregistration');
        } else if (config.includes('your-api-key-here')) {
            console.log('   ⚠️  firebaseConfig.js: Still has placeholder values');
            allGood = false;
        } else {
            console.log('   ⚠️  firebaseConfig.js: May need verification');
        }
    } else {
        console.log('   ❌ firebaseConfig.js: Not found');
        allGood = false;
    }
} catch (error) {
    console.log('   ❌ firebaseConfig.js: Error reading');
    allGood = false;
}

// Check 4: Backend Package.json
console.log('\n4️⃣  Checking Backend Dependencies...');
try {
    const packagePath = join(__dirname, 'backend', 'package.json');
    if (existsSync(packagePath)) {
        const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
        const deps = Object.keys(pkg.dependencies || {});
        console.log(`   ✅ package.json: Found with ${deps.length} dependencies`);
        console.log(`   📦 Required: express, cors, dotenv, razorpay, firebase-admin`);
        
        const required = ['express', 'cors', 'dotenv', 'razorpay', 'firebase-admin'];
        const missing = required.filter(dep => !deps.includes(dep));
        if (missing.length > 0) {
            console.log(`   ⚠️  Missing: ${missing.join(', ')}`);
        } else {
            console.log('   ✅ All required dependencies listed');
        }
    } else {
        console.log('   ❌ package.json: Not found');
        allGood = false;
    }
} catch (error) {
    console.log('   ❌ package.json: Error reading');
    allGood = false;
}

// Check 5: Frontend Registration Script
console.log('\n5️⃣  Checking Frontend Registration Script...');
try {
    const regPath = join(__dirname, 'js', 'registration.js');
    if (existsSync(regPath)) {
        const reg = readFileSync(regPath, 'utf8');
        if (reg.includes('API_BASE_URL') && reg.includes('localhost:5000')) {
            console.log('   ✅ registration.js: API URL configured for local testing');
        }
        if (reg.includes('Razorpay')) {
            console.log('   ✅ registration.js: Razorpay integration present');
        }
    } else {
        console.log('   ❌ registration.js: Not found');
        allGood = false;
    }
} catch (error) {
    console.log('   ❌ registration.js: Error reading');
    allGood = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allGood) {
    console.log('\n✅ Setup looks good! Ready to test.');
    console.log('\n📋 Next Steps:');
    console.log('   1. Install Node.js (if not installed)');
    console.log('   2. Run: cd backend && npm install');
    console.log('   3. Run: cd backend && npm start');
    console.log('   4. Test: http://localhost:5000');
} else {
    console.log('\n⚠️  Some issues found. Please review above.');
}
console.log('\n');



