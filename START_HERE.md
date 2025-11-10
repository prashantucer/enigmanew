# 🚀 Quick Start Guide

## ✅ Setup Complete Checklist

### Files Status:
- [x] Firebase config updated ✅
- [x] Razorpay key added ✅
- [x] Service account key added ✅
- [x] Backend .env exists ✅

---

## 🎯 Next Steps to Test

### Step 1: Install Node.js (if not installed)

**Download:**
- Go to: https://nodejs.org/
- Download **LTS version** (v18 or higher)
- Install with default settings
- **Restart your terminal/PowerShell after installation**

**Verify:**
```bash
node --version
npm --version
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Start Backend

```bash
cd backend
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

### Step 4: Test Backend

1. **Open Browser**: `http://localhost:5000`
2. **Should see**: `{"status":"success","message":"ENIGMA XIII Registration API is running"}`

### Step 5: Test Frontend

1. **Open Registration Page**:
   - VS Code Live Server use करें
   - या: `python -m http.server 8000` और `http://localhost:8000/registration.html`

2. **Check Browser Console** (F12):
   - `✅ Firebase initialized` दिखना चाहिए

3. **Test Form**:
   - Form fill करें
   - ID card upload करें
   - Submit करें
   - Razorpay checkout open होगा

---

## 🧪 Quick Test Commands

### Test Backend Health:
```bash
# Browser में open करें
http://localhost:5000
```

### Test Create Order (Browser Console):
```javascript
fetch('http://localhost:5000/create-order', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({amount: 300})
})
.then(r => r.json())
.then(console.log)
```

---

## ✅ Success Indicators

### Backend Working:
- ✅ Server starts without errors
- ✅ Firebase connects
- ✅ Health check returns success

### Frontend Working:
- ✅ Firebase initializes
- ✅ No console errors
- ✅ Form works
- ✅ ID upload works

---

## 🐛 If Node.js Not Installed

**Option 1: Install Node.js** (Recommended)
- Download from nodejs.org
- Install and restart terminal

**Option 2: Use Online IDE**
- Use Replit, CodeSandbox, etc.
- Upload backend folder
- Run there

---

**Status**: Ready to test! Just need Node.js installed. 🚀




