// ============================================
// ENIGMA XIII - Registration Backend Server
// Razorpay Payment Integration (Final Stable)
// ============================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import { db } from "./firebase.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// Middleware Configuration
// ============================================

// Universal CORS (Fixes mobile + Netlify + browser fetch issues)
app.use(
  cors({
    origin: "*", // allow all origins (you can restrict later)
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

// Parse JSON body
app.use(express.json());

// ============================================
// Razorpay Initialization
// ============================================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ============================================
// Routes
// ============================================

// Root Health Check
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "ENIGMA XIII Registration API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------
// Create Razorpay Order
// -----------------------------
app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    // Validate required field
    if (!amount) {
      return res.status(400).json({
        status: "error",
        message: "Amount is required",
      });
    }

    const amountInPaise = Math.round(amount * 100);

    if (amountInPaise < 100) {
      return res.status(400).json({
        status: "error",
        message: "Minimum amount is ₹1 (100 paise)",
      });
    }

    const options = {
      amount: amountInPaise,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    console.log("✅ Razorpay Order Created:", order.id);

    res.json({
      status: "success",
      message: "Order created successfully",
      order_id: order.id,
      amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// -----------------------------
// Verify Razorpay Payment
// -----------------------------
app.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      amount,
      idUrl,
      ...registrationData
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        status: "error",
        message: "Missing required payment verification fields",
      });
    }

    // Generate signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    const isSignatureValid = generatedSignature === razorpay_signature;

    if (isSignatureValid) {
      // Save registration to Firestore
      if (db) {
        try {
          const registrationDoc = {
            name: name || "N/A",
            email: email || "N/A",
            amount: amount || 0,
            idUrl: idUrl || "",
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            payment_status: "paid",
            createdAt: new Date(),
            ...registrationData,
          };

          const docRef = await db.collection("registrations").add(registrationDoc);

          console.log("✅ Registration saved in Firestore:", docRef.id);

          res.json({
            status: "success",
            verified: true,
            message: "Payment verified and registration saved",
            registration_id: docRef.id,
          });
        } catch (firestoreError) {
          console.error("⚠️ Firestore save failed:", firestoreError);
          res.json({
            status: "success",
            verified: true,
            message:
              "Payment verified successfully, but failed to save registration",
          });
        }
      } else {
        console.warn("⚠️ Firestore not configured!");
        res.json({
          status: "success",
          verified: true,
          message: "Payment verified (Firestore not configured)",
        });
      }
    } else {
      console.error("❌ Payment verification failed - Invalid signature");
      res.status(400).json({
        status: "error",
        verified: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    res.status(500).json({
      status: "error",
      verified: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
});

// -----------------------------
// Fetch Order Details
// -----------------------------
app.get("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await razorpay.orders.fetch(orderId);

    res.json({
      status: "success",
      order: {
        id: order.id,
        amount: order.amount / 100,
        currency: order.currency,
        status: order.status,
        created_at: order.created_at,
      },
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
});

// -----------------------------
// Default 404 Route
// -----------------------------
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
  });
});

// -----------------------------
// Start Server
// -----------------------------
app.listen(PORT, () => {
  console.log(`🚀 ENIGMA XIII API running on port ${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(
    `🔑 Razorpay Key: ${process.env.RAZORPAY_KEY_ID ? "Configured" : "Missing"}`
  );
  console.log(`🔥 Firestore: ${db ? "Connected" : "Not Configured"}`);
});
