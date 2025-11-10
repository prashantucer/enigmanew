// ============================================
// Registration Form - Custom Implementation
// ============================================

// Import Firebase Storage (using CDN or ES modules)
// For CDN: Make sure Firebase is loaded before this script
// For ES modules: import { storage } from './firebaseConfig.js';

// Global variable to store ID card download URL
let idCardUrl = null;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegistration);
} else {
    // DOM is already ready
    initRegistration();
}

function initRegistration() {
    console.log('🚀 Starting registration form initialization...');
    // Event data - same as event-detail.js
    const eventData = {
        'open-mic': { name: 'Open Mic', type: 'Solo (Offline)', category: 'Literary' },
        'kbc-quiz': { name: 'KBC Quiz', type: 'Team (Offline)', category: 'Literary' },
        'dramatics': { name: 'Dramatics', type: 'Team (Offline)', category: 'Theatre' },
        'chess': { name: 'Chess', type: 'Solo (Offline)', category: 'Sports' },
        'face-painting': { name: 'Face Painting', type: 'Solo (Offline)', category: 'Creative' },
        'canvas-painting': { name: 'Canvas Painting', type: 'Solo (Offline)', category: 'Creative' },
        'bug-brawl': { name: 'Bug Brawl', type: 'Team (Online)', category: 'Creative' },
        'fashion-show': { name: 'Fashion Show', type: 'Team (Offline)', category: 'Fashion' },
        'dance': { name: 'Dance', type: 'Team (Offline)', category: 'Dance' },
        'singing': { name: 'Singing', type: 'Solo (Offline)', category: 'Music' },
        'instrumental': { name: 'Instrumental', type: 'Solo/Team (Offline)', category: 'Music' },
        'roadies': { name: 'Roadies', type: 'Team (Offline)', category: 'Creative' },
        'power-lifting': { name: 'Power Lifting', type: 'Solo (Offline)', category: 'Sports' },
        'mehndi-art': { name: 'Mehndi Art', type: 'Solo (Offline)', category: 'Creative' },
        'rangoli': { name: 'Rangoli', type: 'Solo/Team (Offline)', category: 'Creative' },
        'mandala-art': { name: 'Mandala Art', type: 'Solo (Offline)', category: 'Creative' },
        'shark-tank': { name: 'Shark Tank', type: 'Team (Offline)', category: 'Business' },
        'framefest': { name: 'Framefest', type: 'Solo/Team (Offline)', category: 'Photo & Film' },
        'treasure-hunt': { name: 'Treasure Hunt', type: 'Team (Offline)', category: 'Creative' },
        'web-die': { name: 'Web Die', type: 'Team (Online)', category: 'Creative' },
        'gamers-arena': { name: 'Gamers Arena', type: 'Team (Online)', category: 'Gaming' }
    };

    const form = document.getElementById('registrationForm');
    const event1Select = document.getElementById('event1');
    const event2Select = document.getElementById('event2');
    const idCardInput = document.getElementById('idCard');
    const fileName = document.getElementById('fileName');
    
    // Check if elements exist
    if (!form) {
        console.error('❌ Registration form not found!');
        return;
    }
    
    if (!event1Select || !event2Select) {
        console.error('❌ Event select elements not found!');
        return;
    }
    
    console.log('✅ Form elements found');
    
    // Populate event dropdowns
    function populateEventDropdowns() {
        if (!event1Select || !event2Select) {
            console.error('❌ Event selects not available');
            return;
        }
        
        console.log('📋 Populating event dropdowns...');
        
        // Clear existing options (except first)
        while (event1Select.children.length > 1) {
            event1Select.removeChild(event1Select.lastChild);
        }
        while (event2Select.children.length > 1) {
            event2Select.removeChild(event2Select.lastChild);
        }
        
        // Add events to both dropdowns
        Object.keys(eventData).forEach(slug => {
            const event = eventData[slug];
            const option1 = document.createElement('option');
            option1.value = slug;
            option1.textContent = event.name;
            event1Select.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = slug;
            option2.textContent = event.name;
            event2Select.appendChild(option2);
        });
        
        console.log(`✅ Added ${Object.keys(eventData).length} events to dropdowns`);
        
        // Prevent selecting same event in both dropdowns
        event1Select.addEventListener('change', function() {
            if (event2Select.value === this.value && this.value !== '') {
                event2Select.value = '';
                alert('You cannot select the same event twice. Please choose a different event.');
            }
        });
        
        event2Select.addEventListener('change', function() {
            if (event1Select.value === this.value && this.value !== '') {
                event1Select.value = '';
                alert('You cannot select the same event twice. Please choose a different event.');
            }
        });
    }
    
    // Handle file upload with Firebase Storage
    if (idCardInput) {
        idCardInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file type (JPG/JPEG/PNG)
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Only JPG, JPEG, and PNG files are allowed');
                    this.value = '';
                    fileName.textContent = 'No file chosen';
                    idCardUrl = null;
                    return;
                }
                
                // Validate file size (<=1MB)
                if (file.size > 1048576) {
                    alert('File size must be less than or equal to 1 MB');
                    this.value = '';
                    fileName.textContent = 'No file chosen';
                    idCardUrl = null;
                    return;
                }
                
                // Show uploading status with progress
                fileName.textContent = 'Uploading... 0%';
                fileName.style.color = '#00FFFF'; // Cyan color for uploading
                fileName.classList.add('uploading');
                console.log('📤 Starting file upload...');
                console.log('📁 File size:', (file.size / 1024).toFixed(2), 'KB');
                
                // Show info message
                if (file.size > 500000) { // > 500KB
                    console.log('⚠️ Large file detected. Upload may take longer.');
                }
                
                // Wait for Firebase Storage to be ready
                let retries = 0;
                while (typeof window.firebaseStorage === 'undefined' && retries < 10) {
                    console.log('⏳ Waiting for Firebase Storage...', retries);
                    await new Promise(resolve => setTimeout(resolve, 200));
                    retries++;
                }
                
                if (typeof window.firebaseStorage === 'undefined') {
                    console.error('❌ Firebase Storage not available after waiting');
                    alert('Firebase Storage is not ready. Please refresh the page and try again.');
                    this.value = '';
                    fileName.textContent = 'No file chosen';
                    fileName.style.color = '';
                    idCardUrl = null;
                    return;
                }
                
                try {
                    // Upload to Firebase Storage with progress tracking
                    console.log('🔄 Uploading to Firebase Storage...');
                    
                    // Create upload promise with progress
                    const uploadPromise = uploadIdCardToFirebase(file, (progress) => {
                        const percent = Math.round(progress);
                        fileName.textContent = `Uploading... ${percent}%`;
                        console.log(`📤 Upload progress: ${percent}%`);
                    });
                    
                    idCardUrl = await uploadPromise;
                    
                    if (idCardUrl) {
                        fileName.textContent = file.name + ' ✓';
                        fileName.style.color = '#00FF00'; // Green for success
                        fileName.classList.remove('uploading');
                        console.log('✅ ID card uploaded successfully:', idCardUrl);
                    } else {
                        throw new Error('Upload failed - no URL returned');
                    }
                } catch (error) {
                    console.error('❌ Error uploading file:', error);
                    console.error('Error details:', error.message);
                    console.error('Error stack:', error.stack);
                    fileName.style.color = '#FF0000'; // Red for error
                    fileName.classList.remove('uploading');
                    
                    let errorMsg = `Failed to upload ID card: ${error.message}\n\n`;
                    if (error.message.includes('timeout')) {
                        errorMsg += '⚠️ Upload timed out. This might be due to:\n';
                        errorMsg += '1. Slow internet connection\n';
                        errorMsg += '2. Large file size\n';
                        errorMsg += '3. Network issues\n\n';
                        errorMsg += 'Please try:\n';
                        errorMsg += '- Compress the image (< 500KB)\n';
                        errorMsg += '- Check your internet connection\n';
                        errorMsg += '- Try again';
                    } else {
                        errorMsg += 'Please check:\n';
                        errorMsg += '1. Firebase Storage is configured\n';
                        errorMsg += '2. Internet connection\n';
                        errorMsg += '3. File size is < 1MB\n';
                        errorMsg += '4. Browser console for details';
                    }
                    
                    alert(errorMsg);
                    this.value = '';
                    fileName.textContent = 'No file chosen';
                    fileName.style.color = '';
                    idCardUrl = null;
                }
            } else {
                fileName.textContent = 'No file chosen';
                idCardUrl = null;
            }
        });
    }
    
    // Function to upload ID card to Firebase Storage with progress tracking
    async function uploadIdCardToFirebase(file, onProgress) {
        console.log('📤 uploadIdCardToFirebase called');
        
        // Check if Firebase Storage is available
        if (typeof window.firebaseStorage === 'undefined') {
            throw new Error('Firebase Storage is not initialized. Please check if Firebase is loaded.');
        }
        
        const storageInstance = window.firebaseStorage;
        
        if (!storageInstance) {
            throw new Error('Firebase Storage instance not found');
        }
        
        console.log('✅ Firebase Storage instance found');
        
        // Get email for file naming
        const emailInput = document.getElementById('emailId');
        const email = emailInput ? emailInput.value.trim() : 'unknown';
        
        // Sanitize email for filename (replace @ and . with _)
        const sanitizedEmail = email.replace(/[@.]/g, '_');
        
        // Generate timestamp
        const timestamp = Date.now();
        
        // Determine file extension
        let extension = 'jpg';
        if (file.type === 'image/png') {
            extension = 'png';
        } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            extension = 'jpg';
        }
        
        // Create storage path: 'id_cards/{email}_{timestamp}.jpg'
        const storagePath = `id_cards/${sanitizedEmail}_${timestamp}.${extension}`;
        console.log('📁 Storage path:', storagePath);
        console.log('📦 File size:', (file.size / 1024).toFixed(2), 'KB');
        
        // Upload file using Firebase Storage SDK
        try {
            // Get Storage functions from window (set by Firebase initialization)
            let ref, uploadBytes, getDownloadURL;
            
            if (window.firebaseStorageFunctions) {
                // Use functions from window
                ref = window.firebaseStorageFunctions.ref;
                uploadBytes = window.firebaseStorageFunctions.uploadBytes;
                getDownloadURL = window.firebaseStorageFunctions.getDownloadURL;
                console.log('✅ Using Firebase Storage functions from window');
                console.log('🔍 Function types:', {
                    ref: typeof ref,
                    uploadBytes: typeof uploadBytes,
                    getDownloadURL: typeof getDownloadURL
                });
            } else {
                // Try dynamic import as fallback
                console.log('📦 Importing Firebase Storage functions dynamically...');
                try {
                    const storageModule = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
                    ref = storageModule.ref;
                    uploadBytes = storageModule.uploadBytes;
                    getDownloadURL = storageModule.getDownloadURL;
                    console.log('✅ Firebase Storage functions imported dynamically');
                    console.log('🔍 Function types:', {
                        ref: typeof ref,
                        uploadBytes: typeof uploadBytes,
                        getDownloadURL: typeof getDownloadURL
                    });
                } catch (importError) {
                    console.error('❌ Import error:', importError);
                    throw new Error('Could not import Firebase Storage functions. Error: ' + importError.message);
                }
            }
            
            // Verify functions are callable
            if (typeof ref !== 'function' || typeof uploadBytes !== 'function' || typeof getDownloadURL !== 'function') {
                console.error('❌ Firebase Storage functions are not callable:', {
                    ref: typeof ref,
                    uploadBytes: typeof uploadBytes,
                    getDownloadURL: typeof getDownloadURL
                });
                throw new Error('Firebase Storage functions are not properly initialized');
            }
            
            const storageRef = ref(storageInstance, storagePath);
            console.log('📤 Starting upload to:', storagePath);
            console.log('📦 Storage instance:', storageInstance);
            console.log('📦 Storage ref:', storageRef);
            
            // Use regular upload with simulated progress
            // Firebase Storage v10 doesn't have built-in progress for uploadBytes
            // So we'll show progress updates
            if (onProgress) {
                onProgress(10); // Start
            }
            
            // Upload file with timeout
            console.log('⏳ Uploading file bytes...');
            const uploadPromise = uploadBytes(storageRef, file);
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Upload timeout after 30 seconds. Please check your internet connection.')), 30000);
            });
            
            try {
                await Promise.race([uploadPromise, timeoutPromise]);
                console.log('✅ File bytes uploaded successfully');
            } catch (uploadError) {
                console.error('❌ Upload bytes error:', uploadError);
                throw uploadError;
            }
            
            if (onProgress) {
                onProgress(80); // Upload complete, getting URL
            }
            
            console.log('✅ File uploaded, getting download URL...');
            
            // Get download URL with timeout
            const urlPromise = getDownloadURL(storageRef);
            const urlTimeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Getting download URL timeout. Please try again.')), 10000);
            });
            
            let downloadURL;
            try {
                downloadURL = await Promise.race([urlPromise, urlTimeoutPromise]);
                console.log('✅ Download URL obtained:', downloadURL);
            } catch (urlError) {
                console.error('❌ Get download URL error:', urlError);
                throw urlError;
            }
            
            if (onProgress) {
                onProgress(100); // Complete
            }
            
            return downloadURL;
        } catch (error) {
            console.error('❌ Upload error:', error);
            console.error('Error stack:', error.stack);
            
            // More detailed error message
            if (error.message.includes('permission') || error.code === 'storage/unauthorized') {
                throw new Error('Permission denied. Please check Firebase Storage rules.');
            } else if (error.message.includes('network') || error.code === 'storage/network-request-failed') {
                throw new Error('Network error. Please check your internet connection.');
            } else {
                throw new Error(`Upload failed: ${error.message || error}`);
            }
        }
    }
    
    // Form validation
    function validateField(field, errorElement) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous error styling
        field.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation (10 digits)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid 10-digit phone number';
            }
        }
        
        // Aadhaar validation (12 digits)
        if (field.id === 'aadhaarNo' && value) {
            const aadhaarRegex = /^[0-9]{12}$/;
            if (!aadhaarRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid 12-digit Aadhaar number';
            }
        }
        
        // File validation
        if (field.type === 'file' && field.hasAttribute('required')) {
            if (!field.files || field.files.length === 0) {
                isValid = false;
                errorMessage = 'Please upload your ID card';
            } else {
                const file = field.files[0];
                if (file.size > 1048576) {
                    isValid = false;
                    errorMessage = 'File size must be less than 1 MB';
                }
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!allowedTypes.includes(file.type)) {
                    isValid = false;
                    errorMessage = 'Only JPG, JPEG, and PNG files are allowed';
                }
            }
        }
        
        // Show error if invalid
        if (!isValid && errorElement) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
        
        return isValid;
    }
    
    // Validate all fields
    function validateForm() {
        let isValid = true;
        
        // Validate all required fields
        const requiredFields = [
            { field: document.getElementById('studentName'), error: document.getElementById('studentNameError') },
            { field: document.getElementById('studIdNo'), error: document.getElementById('studIdNoError') },
            { field: document.getElementById('college'), error: document.getElementById('collegeError') },
            { field: document.getElementById('aadhaarNo'), error: document.getElementById('aadhaarNoError') },
            { field: document.getElementById('course'), error: document.getElementById('courseError') },
            { field: document.getElementById('branch'), error: document.getElementById('branchError') },
            { field: document.getElementById('year'), error: document.getElementById('yearError') },
            { field: document.getElementById('contactNumber'), error: document.getElementById('contactNumberError') },
            { field: document.getElementById('emailId'), error: document.getElementById('emailIdError') },
            { field: document.getElementById('event1'), error: document.getElementById('event1Error') }
            // ID Card is now optional, so removed from required fields
        ];
        
        requiredFields.forEach(({ field, error }) => {
            if (field && !validateField(field, error)) {
                isValid = false;
            }
        });
        
        // Validate checkboxes
        const terms = document.getElementById('terms');
        const rules = document.getElementById('rules');
        const termsError = document.getElementById('termsError');
        const rulesError = document.getElementById('rulesError');
        
        if (!terms.checked) {
            isValid = false;
            if (termsError) {
                termsError.textContent = 'You must agree to the terms and conditions';
                termsError.classList.add('show');
            }
        } else if (termsError) {
            termsError.classList.remove('show');
        }
        
        if (!rules.checked) {
            isValid = false;
            if (rulesError) {
                rulesError.textContent = 'You must agree to the rules and regulations';
                rulesError.classList.add('show');
            }
        } else if (rulesError) {
            rulesError.classList.remove('show');
        }
        
        return isValid;
    }
    
    // Real-time validation
    const formFields = form.querySelectorAll('input[required], select[required]');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            const errorId = field.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                validateField(field, errorElement);
            }
        });
        
        field.addEventListener('input', function() {
            const errorId = field.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement && errorElement.classList.contains('show')) {
                validateField(field, errorElement);
            }
        });
    });
    
    // Handle checkbox validation
    document.getElementById('terms').addEventListener('change', function() {
        const errorElement = document.getElementById('termsError');
        if (this.checked && errorElement) {
            errorElement.classList.remove('show');
        }
    });
    
    document.getElementById('rules').addEventListener('change', function() {
        const errorElement = document.getElementById('rulesError');
        if (this.checked && errorElement) {
            errorElement.classList.remove('show');
        }
    });
    
    // Backend API URL - Production URL
    // IMPORTANT: This URL is hardcoded for production deployment
    // DO NOT use placeholder URLs - always use the actual backend URL
 // ✅ Backend API Base URL Configuration
// Automatically selects localhost (development) or production backend URL.

const API_BASE_URL = (() => {
    // 🔹 Development Environment
    if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    ) {
        return 'http://localhost:5000'; // Local backend
    }

    // 🔹 Production Environment
    const PRODUCTION_BACKEND_URL = 'https://enigmaugi.onrender.com';

    // 🚨 Safety Check: Ensure no placeholder or invalid URL is used
    if (
        !PRODUCTION_BACKEND_URL ||
        PRODUCTION_BACKEND_URL.includes('your-backend') ||
        PRODUCTION_BACKEND_URL.includes('placeholder')
    ) {
        console.error('❌ ERROR: Invalid or placeholder backend URL detected!');
        throw new Error('Invalid backend URL configuration — please fix in production.');
    }

    return PRODUCTION_BACKEND_URL;
})();

    
    // Log API URL for debugging - This will show in console
    console.log('🔗 Backend API URL:', API_BASE_URL);
    console.log('📍 Current hostname:', window.location.hostname);
    console.log('🌐 Full URL:', window.location.href);
    
    // Razorpay key (placeholder - replace with actual key from backend response)
    let razorpayKey = 'rzp_test_RdkBIbYhYwLVr7'; // Will be updated from create-order response
    
    // Form submission with Razorpay integration
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('📝 Form submitted');
        
        // Validate form
        if (!validateForm()) {
            console.log('❌ Form validation failed');
            // Scroll to first error
            const firstError = form.querySelector('.error-message.show, .error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        console.log('✅ Form validation passed');
        
        // ID card is optional - check if file is selected but not uploaded yet
        const idCardInput = document.getElementById('idCard');
        if (idCardInput && idCardInput.files && idCardInput.files.length > 0 && !idCardUrl) {
            // File is selected but upload is in progress or failed
            const fileName = document.getElementById('fileName');
            if (fileName && fileName.textContent.includes('Uploading')) {
                alert('Please wait for ID card upload to complete before submitting.');
                return;
            } else {
                // Upload might have failed, but we'll proceed without ID card
                console.log('⚠️ ID card file selected but not uploaded. Proceeding without ID card.');
            }
        }
        
        // Get form data
        const name = document.getElementById('studentName').value.trim();
        const email = document.getElementById('emailId').value.trim();
        const event1 = document.getElementById('event1').value;
        const event2 = document.getElementById('event2').value;
        
        // Calculate amount: ₹300 for 2 events
        let eventCount = 0;
        if (event1) eventCount++;
        if (event2) eventCount++;
        
        if (eventCount === 0) {
            alert('Please select at least one event');
            return;
        }
        
        // Calculate fee: ₹300 for every 2 events
        const pairs = Math.ceil(eventCount / 2);
        const amount = pairs * 300;
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        submitBtn.disabled = true;
        
        try {
            console.log('🔄 Creating Razorpay order...');
            console.log('API URL:', `${API_BASE_URL}/create-order`);
            console.log('Amount:', amount);
            
            // Step 1: Create Razorpay order
            const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount,
                    currency: 'INR',
                    name: name,
                    email: email
                })
            });
            
            if (!orderResponse.ok) {
                const errorText = await orderResponse.text();
                console.error('❌ Order creation failed:', errorText);
                throw new Error(`Failed to create order: ${orderResponse.status} ${orderResponse.statusText}`);
            }
            
            const orderData = await orderResponse.json();
            console.log('✅ Order created:', orderData);
            
            // Update Razorpay key from response
            if (orderData.key_id) {
                razorpayKey = orderData.key_id;
            }
            
            // Step 2: Open Razorpay Checkout
            const options = {
                key: razorpayKey,
                amount: orderData.amount * 100, // Convert to paise
                currency: orderData.currency,
                order_id: orderData.order_id,
                name: 'ENIGMA XIII Registration',
                description: `Registration for ${eventCount} event(s)`,
                prefill: {
                    name: name,
                    email: email,
                    contact: document.getElementById('contactNumber').value.trim()
                },
                theme: {
                    color: '#00FFFF'
                },
                handler: async function(response) {
                    // Step 3: Payment success - Verify payment
                    try {
                        const verifyResponse = await fetch(`${API_BASE_URL}/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                name: name,
                                email: email,
                                amount: amount,
                                idUrl: idCardUrl
                            })
                        });
                        
                        const verifyData = await verifyResponse.json();
                        
                        if (verifyData.verified) {
                            // Step 4: Save to Firestore (frontend)
                            await saveToFirestore({
                                name: name,
                                email: email,
                                idUrl: idCardUrl,
                                amount: amount,
                                payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                payment_status: 'paid',
                                createdAt: new Date(),
                                // Additional form data
                                studIdNo: document.getElementById('studIdNo').value.trim(),
                                groupName: document.getElementById('groupName').value.trim(),
                                college: document.getElementById('college').value,
                                aadhaarNo: document.getElementById('aadhaarNo').value.trim(),
                                course: document.getElementById('course').value.trim(),
                                branch: document.getElementById('branch').value.trim(),
                                year: document.getElementById('year').value,
                                contactNumber: document.getElementById('contactNumber').value.trim(),
                                event1: event1,
                                event2: event2
                            });
                            
                            // Store data in sessionStorage for success page
                            sessionStorage.setItem('payment_id', response.razorpay_payment_id);
                            sessionStorage.setItem('order_id', response.razorpay_order_id);
                            sessionStorage.setItem('user_name', name);
                            sessionStorage.setItem('user_email', email);
                            
                            // Redirect to success page
                            window.location.href = `success.html?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
                            
                            // Reset form
                            form.reset();
                            fileName.textContent = 'No file chosen';
                            idCardUrl = null;
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        alert('Payment verification failed. Please contact support.');
                    } finally {
                        // Reset button
                        btnText.style.display = 'inline';
                        btnLoader.style.display = 'none';
                        submitBtn.disabled = false;
                    }
                },
                modal: {
                    ondismiss: function() {
                        // User closed the checkout
                        btnText.style.display = 'inline';
                        btnLoader.style.display = 'none';
                        submitBtn.disabled = false;
                    }
                }
            };
            
            const razorpay = new Razorpay(options);
            razorpay.open();
            
        } catch (error) {
            console.error('❌ Error creating order:', error);
            console.error('Error details:', error.message);
            alert(`Failed to initiate payment: ${error.message}\n\nPlease check:\n1. Backend is running on ${API_BASE_URL}\n2. Check browser console for details`);
            
            // Reset button
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
    
    // Function to save registration data to Firestore
    async function saveToFirestore(data) {
        try {
            // Check if Firestore is available
            if (typeof window.firebaseDb === 'undefined') {
                console.warn('Firestore not available, skipping frontend save');
                return;
            }
            
            // Import Firestore functions
            const { collection, addDoc } = await import('firebase/firestore');
            
            // Add document to 'registrations' collection
            const docRef = await addDoc(collection(window.firebaseDb, 'registrations'), data);
            
            console.log('✅ Registration saved to Firestore:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error saving to Firestore:', error);
            // Don't throw - backend already saved it
        }
    }
    
    // Initialize
    console.log('🚀 Initializing registration form...');
    populateEventDropdowns();
    console.log('✅ Registration form initialized');
}
