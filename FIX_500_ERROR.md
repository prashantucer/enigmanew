# 🔧 Fix 500 Error - Razorpay Payment Issue

## ❌ Problem
Form submit karne par **500 error** aa raha hai:
```
Failed to create order: 500
```

## ✅ Root Cause
**Razorpay credentials missing hai Render.com par!**

Backend server start ho raha hai, lekin Razorpay initialize nahi ho raha kyunki environment variables set nahi hain.

---

## 🔧 Solution: Render.com par Environment Variables Set Karein

### Step 1: Render.com Dashboard Open Karein
1. https://dashboard.render.com/ par login karein
2. Apni backend service select karein (enigmaugi.onrender.com)

### Step 2: Environment Variables Add Karein
1. Left sidebar me **"Environment"** tab click karein
2. **"Add Environment Variable"** button click karein

### Step 3: Razorpay Credentials Add Karein

**Variable 1:**
- **Key:** `RAZORPAY_KEY_ID`
- **Value:** `rzp_test_RdkBIbYhYwLVr7` (ya apna test key)
- **Add** click karein

**Variable 2:**
- **Key:** `RAZORPAY_KEY_SECRET`
- **Value:** Apna Razorpay Secret Key (Razorpay Dashboard se)
- **Add** click karein

**Variable 3 (Optional but recommended):**
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Add** click karein

**Variable 4 (Optional):**
- **Key:** `PORT`
- **Value:** `5000` (ya Render ka default port)

### Step 4: Razorpay Secret Key Kaise Milta Hai?

1. **Razorpay Dashboard:** https://dashboard.razorpay.com/
2. **Settings** → **API Keys**
3. **Test/Live Mode** select karein
4. **Key Secret** copy karein (yeh sirf ek baar dikhta hai!)

**⚠️ Important:**
- Test mode ke liye: `rzp_test_...` key use karein
- Live mode ke liye: `rzp_live_...` key use karein
- Secret key ko **safely store** karein (dubara nahi dikhega)

### Step 5: Backend Service Restart Karein

1. Render Dashboard me apni service par
2. **"Manual Deploy"** → **"Clear build cache & deploy"** click karein
3. Ya **"Restart"** button click karein

### Step 6: Logs Check Karein

**Render Dashboard → Logs tab** me yeh dikhna chahiye:

```
✅ Razorpay initialized successfully
🔑 Razorpay Key ID: rzp_test_Rd...
🚀 ENIGMA XIII Registration API running on port 5000
🔑 Razorpay: ✅ Initialized
```

**Agar abhi bhi error dikhe:**
```
❌ Failed to initialize Razorpay: ...
❌ Razorpay: ❌ Not configured
```

**Matlab:** Environment variables properly set nahi hain. Dobara check karein.

---

## ✅ Verification Steps

### 1. Backend Health Check
Browser me open karein:
```
https://enigmaugi.onrender.com
```

**Expected response:**
```json
{
  "status": "success",
  "message": "ENIGMA XIII Registration API is running",
  "version": "1.0.0"
}
```

### 2. Test Payment Flow
1. Frontend open karein: https://enigmaugii.netlify.app/registration
2. Form fill karein
3. Submit karein
4. Razorpay payment popup aana chahiye ✅

### 3. Check Browser Console
**F12** → **Console tab** me:
- ✅ `🔗 Backend API URL: https://enigmaugi.onrender.com`
- ✅ `Creating Razorpay order...`
- ✅ `✅ Order created: order_xxxxx`

**Agar error dikhe:**
- ❌ `Failed to create order: 500` → Backend logs check karein
- ❌ `Payment service not configured` → Environment variables check karein

---

## 🔍 Troubleshooting

### Issue: Environment Variables Set Karne Ke Baad Bhi Error
1. **Service Restart:** Render Dashboard → Restart button
2. **Logs Check:** Latest logs me Razorpay initialization check karein
3. **Key Format:** Secret key me spaces ya extra characters to nahi hain?

### Issue: Razorpay Secret Key Nahi Mil Raha
- Razorpay Dashboard → Settings → API Keys
- **"Generate New Key"** click karein (purana key delete ho jayega)
- New key copy karein

### Issue: Test Payment Nahi Ho Raha
- Razorpay test cards use karein:
  - Card: `4111 1111 1111 1111`
  - CVV: Any 3 digits
  - Expiry: Any future date
  - Name: Any name

---

## 📞 Support

Agar abhi bhi issue hai:
1. Render.com logs share karein
2. Browser console error message share karein
3. Environment variables screenshot share karein (sensitive data hide karke)

---

## ✅ Expected Result

**After fixing:**
- ✅ Backend logs: `✅ Razorpay initialized successfully`
- ✅ Form submit: Razorpay popup opens
- ✅ Payment: Test payment successful
- ✅ Registration: Data saved to Firestore

