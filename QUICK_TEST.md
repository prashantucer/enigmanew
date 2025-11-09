# 🧪 Quick Test Guide

## ✅ Setup Complete - Ready to Test!

### Step 1: Install Node.js (if not installed)

**Download & Install:**
1. Go to: https://nodejs.org/
2. Download **LTS version** (v18.x or v20.x)
3. Run installer with default settings
4. **Important**: Restart your terminal/PowerShell after installation

**Verify Installation:**
```bash
node --version
npm --version
```

---

## 🚀 Backend Testing

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

**Expected**: Packages will install, `node_modules/` folder created

### Step 2: Start Backend Server
```bash
npm start
```

**Expected Output:**
```
✅ Firebase Admin SDK initialized successfully
📊 Firestore database connected
🚀 ENIGMA XIII Registration API running on port 5000
📍 Server: http://localhost:5000
🔑 Razorpay Key ID: Configured
🔥 Firestore: Connected
```

### Step 3: Test Backend

**Option A: Browser Test**
- Open: `http://localhost:5000`
- Should see: `{"status":"success","message":"ENIGMA XIII Registration API is running"}`

**Option B: Command Line Test**
```bash
# PowerShell
Invoke-WebRequest -Uri http://localhost:5000 -Method GET
```

**Option C: Browser Console Test**
```javascript
fetch('http://localhost:5000/create-order', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({amount: 300, currency: 'INR'})
})
.then(r => r.json())
.then(console.log)
```

---

## 🎨 Frontend Testing

### Step 1: Start Local Server

**Option A: VS Code Live Server** (Recommended)
1. Open `registration.html` in VS Code
2. Right-click → "Open with Live Server"
3. Page opens at `http://127.0.0.1:5500`

**Option B: Python Server**
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000/registration.html`

### Step 2: Check Browser Console (F12)

**Expected Messages:**
- ✅ `✅ Firebase initialized`
- ✅ No red errors

**If Errors:**
- Check `firebaseConfig.js` has correct values
- Check backend is running
- Check `API_BASE_URL` in `registration.js`

### Step 3: Test Registration Form

1. **Fill Form:**
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - All required fields

2. **Upload ID Card:**
   - Click "Select File"
   - Choose JPG/PNG (< 1MB)
   - Should see: "Uploading..." → "filename.jpg ✓"

3. **Select Events:**
   - Choose at least 1 event

4. **Submit:**
   - Click "Submit Registration"
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
- ✅ Data saved in Firestore

---

## 🔍 Verification Checklist

### Backend ✅
- [ ] Server starts without errors
- [ ] Firebase connects
- [ ] Health check works
- [ ] `/create-order` works

### Frontend ✅
- [ ] Firebase initializes
- [ ] No console errors
- [ ] Form works
- [ ] ID upload works
- [ ] Payment works
- [ ] Success page works

### Data ✅
- [ ] Registration saved in Firestore
- [ ] ID card in Storage
- [ ] Payment details correct

---

## 🐛 Troubleshooting

### Backend won't start
- Check Node.js is installed: `node --version`
- Check dependencies: `cd backend && npm install`
- Check `.env` file exists
- Check `serviceAccountKey.json` exists

### Firebase not initializing
- Check `firebaseConfig.js` values
- Check browser console for errors
- Verify Firebase project is active

### Payment not working
- Check backend is running
- Check Razorpay keys in `.env`
- Check browser console for errors
- Verify `API_BASE_URL` is correct

### CORS errors
- Add frontend URL to `backend/server.js` allowedOrigins
- Restart backend server

---

## ✅ Success!

If everything works:
- ✅ Backend running
- ✅ Frontend working
- ✅ Payments processing
- ✅ Data saving

**System is fully operational!** 🎉

---

**Need Help?** Check `DEPLOYMENT_GUIDE.md` or `TESTING_GUIDE.md`



