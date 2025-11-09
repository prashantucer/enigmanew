# 🧪 Testing Guide - ENIGMA XIII System

## ✅ Pre-Testing Checklist

### Files Verified:
- [x] `serviceAccountKey.json` - ✅ Exists
- [x] `backend/.env` - ✅ Exists
- [x] Firebase config - ✅ Updated
- [x] Razorpay key - ✅ Added

---

## 🚀 Backend Testing

### Step 1: Install Node.js (if not installed)

**Download Node.js:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download LTS version (v18 or higher)
3. Install with default settings
4. Restart terminal/PowerShell

**Verify Installation:**
```bash
node --version
npm --version
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected Output:**
- Packages will be installed
- `node_modules/` folder will be created
- No errors should occur

### Step 3: Start Backend Server

```bash
cd backend
npm start
```

**Expected Console Output:**
```
✅ Firebase Admin SDK initialized successfully
📊 Firestore database connected
🚀 ENIGMA XIII Registration API running on port 5000
📍 Server: http://localhost:5000
🔑 Razorpay Key ID: Configured
🔥 Firestore: Connected
```

### Step 4: Test Backend Endpoints

**Health Check:**
- Open browser: `http://localhost:5000`
- Should see: `{"status":"success","message":"ENIGMA XIII Registration API is running"}`

**Test Create Order (using browser console or Postman):**
```javascript
fetch('http://localhost:5000/create-order', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({amount: 300, currency: 'INR'})
})
.then(r => r.json())
.then(console.log)
```

**Expected Response:**
```json
{
  "order_id": "order_xxxxx",
  "amount": 300,
  "currency": "INR",
  "status": "created",
  "key_id": "rzp_test_xxxxx"
}
```

---

## 🎨 Frontend Testing

### Step 1: Start Local Server

**Option A: VS Code Live Server**
1. Open `registration.html` in VS Code
2. Right-click → "Open with Live Server"
3. Page will open at `http://127.0.0.1:5500`

**Option B: Python Server**
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000/registration.html`

### Step 2: Check Browser Console

Open browser DevTools (F12) and check:
- ✅ `✅ Firebase initialized` should appear
- ❌ No errors should be present

### Step 3: Test Registration Form

1. **Fill Form:**
   - Student Name: Test User
   - Stud ID No: 12345
   - Email: test@example.com
   - Phone: 9876543210
   - College: Select from dropdown
   - Aadhaar: 123456789012
   - Course: B.Tech
   - Branch: CSE
   - Year: 2nd Year
   - Contact: 9876543210
   - Event 1: Select any event

2. **Upload ID Card:**
   - Click "Select File"
   - Choose a JPG/PNG file (< 1MB)
   - Should see "Uploading..." then file name with ✓

3. **Submit Form:**
   - Click "Submit Registration"
   - Razorpay checkout should open
   - Use test card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/25`
   - Complete payment

4. **Verify Success:**
   - Should redirect to `success.html`
   - Payment ID, Name, Email should display
   - Check Firestore for saved data

---

## 🔍 Verification Points

### Backend Working:
- [ ] Server starts without errors
- [ ] Firebase connects successfully
- [ ] `/create-order` endpoint works
- [ ] `/verify-payment` endpoint works

### Frontend Working:
- [ ] Firebase initializes
- [ ] Form validation works
- [ ] ID card uploads to Firebase Storage
- [ ] Razorpay checkout opens
- [ ] Payment completes successfully
- [ ] Success page shows correctly

### Data Saved:
- [ ] Registration saved in Firestore
- [ ] ID card uploaded to Storage
- [ ] Payment details correct

---

## 🐛 Common Issues & Fixes

### Issue 1: "npm is not recognized"
**Fix**: Install Node.js from nodejs.org

### Issue 2: "Firebase not initialized"
**Fix**: 
- Check `firebaseConfig.js` has correct values
- Check browser console for errors
- Verify Firebase project is active

### Issue 3: "Failed to create order"
**Fix**:
- Check backend is running
- Verify `API_BASE_URL` is correct
- Check backend logs for errors
- Verify Razorpay keys in `.env`

### Issue 4: "CORS error"
**Fix**:
- Add frontend URL to `backend/server.js` allowedOrigins
- Restart backend server

### Issue 5: "Firestore connection failed"
**Fix**:
- Verify `serviceAccountKey.json` is correct
- Check Firebase project ID matches
- Review backend logs

---

## ✅ Success Criteria

System is working if:
1. ✅ Backend starts without errors
2. ✅ Frontend loads without errors
3. ✅ Form submission works
4. ✅ ID card uploads successfully
5. ✅ Payment completes
6. ✅ Data saves to Firestore
7. ✅ Success page displays correctly

---

**Ready to test!** 🚀


