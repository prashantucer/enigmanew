# 🎨 Frontend Testing Guide

## ✅ Servers Running

### Backend Server
- **Status**: ✅ Running
- **URL**: `http://localhost:5000`
- **Port**: 5000

### Frontend Server
- **Status**: ✅ Running
- **URL**: `http://localhost:8000`
- **Port**: 8000

---

## 🌐 Access URLs

### Main Pages:
- **Home**: `http://localhost:8000/index.html`
- **Registration**: `http://localhost:8000/registration.html`
- **Success**: `http://localhost:8000/success.html`
- **About**: `http://localhost:8000/about.html`
- **Events**: `http://localhost:8000/events.html`
- **Gallery**: `http://localhost:8000/gallery.html`

---

## 🧪 Testing Steps

### Step 1: Open Registration Page
1. Open browser
2. Go to: `http://localhost:8000/registration.html`

### Step 2: Check Browser Console (F12)
**Expected:**
- ✅ `✅ Firebase initialized`
- ✅ No red errors

**If Errors:**
- Check `firebaseConfig.js` has correct values
- Check backend is running on port 5000
- Check `API_BASE_URL` in `registration.js`

### Step 3: Test Registration Form

1. **Fill Required Fields:**
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
   - Choose JPG/PNG file (< 1MB)
   - Should see: "Uploading..." → "filename.jpg ✓"
   - Console should show: "ID card uploaded successfully"

3. **Check Terms & Rules:**
   - Check both checkboxes

4. **Submit Form:**
   - Click "Submit Registration"
   - Loading spinner should appear
   - Razorpay checkout should open

### Step 4: Test Payment

**Test Card Details:**
- Card Number: `4111 1111 1111 1111`
- CVV: `123` (any 3 digits)
- Expiry: `12/25` (any future date)
- Name: Any name

**Or Test UPI:**
- UPI ID: `success@razorpay` (always succeeds)

### Step 5: Verify Success

After payment:
- ✅ Redirects to `success.html`
- ✅ Shows Payment ID, Name, Email
- ✅ Data saved in Firestore (check Firebase Console)

---

## 🔍 Verification Checklist

### Frontend ✅
- [ ] Registration page loads
- [ ] Firebase initializes
- [ ] No console errors
- [ ] Form validation works
- [ ] ID card uploads to Firebase Storage
- [ ] Razorpay checkout opens
- [ ] Payment completes
- [ ] Success page shows

### Backend ✅
- [ ] Server running on port 5000
- [ ] Health check works
- [ ] `/create-order` works
- [ ] `/verify-payment` works

### Data ✅
- [ ] Registration saved in Firestore
- [ ] ID card in Firebase Storage
- [ ] Payment details correct

---

## 🐛 Troubleshooting

### Page Not Loading
- Check Python server is running
- Check port 8000 is not in use
- Try: `http://127.0.0.1:8000/registration.html`

### Firebase Not Initializing
- Check browser console for errors
- Verify `firebaseConfig.js` has correct values
- Check Firebase project is active

### Payment Not Working
- Check backend is running (`http://localhost:5000`)
- Check browser console for errors
- Verify `API_BASE_URL` is `http://localhost:5000`
- Check Razorpay keys in backend `.env`

### CORS Errors
- Backend CORS is configured for `localhost:8000`
- If using different port, update `backend/server.js` allowedOrigins

---

## ✅ Success Indicators

### Console Messages:
- ✅ `✅ Firebase initialized`
- ✅ `ID card uploaded successfully`
- ✅ `✅ Registration saved to Firestore`

### Visual Indicators:
- ✅ Form submits without errors
- ✅ Razorpay checkout opens
- ✅ Payment completes
- ✅ Success page displays

---

## 🎯 Quick Test URLs

- **Registration**: http://localhost:8000/registration.html
- **Backend Health**: http://localhost:5000
- **Backend Create Order**: http://localhost:5000/create-order (POST)

---

**Status**: 🟢 **Both servers running - Ready to test!**





