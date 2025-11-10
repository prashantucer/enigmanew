// ============================================
// ENIGMA XIII - Registration Backend Server
// Razorpay Payment Integration
// ============================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { db } from './firebase.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
// Update with your frontend domains after deployment
const allowedOrigins = [
    // Development URLs
    'http://localhost:5500',           // VS Code Live Server
    'http://localhost:8000',           // Python/Node local server
    'http://127.0.0.1:5500',
    'http://127.0.0.1:8000',
    // Production URLs - Add your deployed frontend URLs here:
    'https://enigmaugi.netlify.app',
    'https://enigmaugii.netlify.app',  // Alternative Netlify URL
    // 'https://your-site.vercel.app',
    // 'https://your-custom-domain.com',
    // Add from environment variable if set
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // Check if origin is in allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        
        // In development, allow all origins
        if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
            return callback(null, true);
        }
        
        // In production, allow Netlify domains (more flexible)
        if (origin && origin.includes('.netlify.app')) {
            return callback(null, true);
        }
        
        // Otherwise, reject in production
        if (process.env.NODE_ENV === 'production') {
            console.warn(`⚠️ CORS blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ============================================
// Routes
// ============================================

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'ENIGMA XIII Registration API is running',
        version: '1.0.0'
    });
});

// Create Razorpay Order
app.post('/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;

        // Validate required fields
        if (!amount) {
            return res.status(400).json({
                status: 'error',
                message: 'Amount is required'
            });
        }

        // Validate amount (should be in paise for INR)
        const amountInPaise = Math.round(amount * 100);

        if (amountInPaise < 100) {
            return res.status(400).json({
                status: 'error',
                message: 'Minimum amount is ₹1 (100 paise)'
            });
        }

        // Create order options
        const options = {
            amount: amountInPaise,
            currency: currency,
            receipt: receipt || `receipt_${Date.now()}`,
            payment_capture: 1 // Auto capture payment
        };

        // Create order with Razorpay
        const order = await razorpay.orders.create(options);

        // Return order details
        res.json({
            order_id: order.id,
            amount: amount,
            currency: order.currency,
            status: 'created',
            key_id: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create order',
            error: error.message
        });
    }
});

// Verify Payment Signature
app.post('/verify-payment', async (req, res) => {
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
            // Registration data
            name,
            email,
            amount,
            idUrl,
            // Additional registration fields (optional)
            ...registrationData
        } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required payment verification fields'
            });
        }

        // Create signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');

        // Verify signature
        const isSignatureValid = generated_signature === razorpay_signature;

        if (isSignatureValid) {
            // Store registration data in Firestore
            if (db) {
                try {
                    const registrationDoc = {
                        name: name || 'N/A',
                        email: email || 'N/A',
                        amount: amount || 0,
                        idUrl: idUrl || '',
                        payment_id: razorpay_payment_id,
                        order_id: razorpay_order_id,
                        payment_status: 'paid',
                        createdAt: new Date(),
                        // Include any additional registration data
                        ...registrationData
                    };

                    // Add document to 'registrations' collection
                    const docRef = await db.collection('registrations').add(registrationDoc);
                    
                    console.log('✅ Registration saved to Firestore:', docRef.id);

                    res.json({
                        status: 'success',
                        message: 'Payment verified successfully and registration saved',
                        order_id: razorpay_order_id,
                        payment_id: razorpay_payment_id,
                        registration_id: docRef.id,
                        verified: true
                    });
                } catch (firestoreError) {
                    console.error('Error saving to Firestore:', firestoreError);
                    // Still return success for payment verification, but log Firestore error
                    res.json({
                        status: 'success',
                        message: 'Payment verified successfully but failed to save registration',
                        order_id: razorpay_order_id,
                        payment_id: razorpay_payment_id,
                        verified: true,
                        warning: 'Registration data not saved to database'
                    });
                }
            } else {
                // Firestore not initialized, still return payment verification success
                console.warn('⚠️ Firestore not initialized, registration data not saved');
                res.json({
                    status: 'success',
                    message: 'Payment verified successfully',
                    order_id: razorpay_order_id,
                    payment_id: razorpay_payment_id,
                    verified: true,
                    warning: 'Firestore not configured, registration data not saved'
                });
            }
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Payment verification failed - Invalid signature',
                verified: false
            });
        }

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to verify payment',
            error: error.message
        });
    }
});

// Get Order Details
app.get('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await razorpay.orders.fetch(orderId);

        res.json({
            status: 'success',
            order: {
                id: order.id,
                amount: order.amount / 100, // Convert paise to rupees
                currency: order.currency,
                status: order.status,
                created_at: order.created_at
            }
        });

    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch order details',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 ENIGMA XIII Registration API running on port ${PORT}`);
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`🔑 Razorpay Key ID: ${process.env.RAZORPAY_KEY_ID ? 'Configured' : 'Missing'}`);
    console.log(`🔥 Firestore: ${db ? 'Connected' : 'Not configured'}`);
});

