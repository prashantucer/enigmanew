# 🚀 Backend Server Start Guide

## ✅ Backend Started!

Backend server should now be running on `http://localhost:5000`

---

## 🔍 Verify Backend is Running

### Method 1: Check Browser
Open in browser:
```
http://localhost:5000
```

Should see: "ENIGMA Registration API is running"

### Method 2: Check Terminal
Look for:
```
✅ Server running on port 5000
✅ Firebase Admin initialized
```

---

## 🐛 If Backend Not Starting

### Check 1: Node.js Installed?
```powershell
node --version
npm --version
```

### Check 2: Dependencies Installed?
```powershell
cd D:\ENIGMA\backend
npm install
```

### Check 3: Environment Variables Set?
Check `.env` file in `backend` folder:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- Firebase credentials

### Check 4: Port 5000 Available?
```powershell
netstat -ano | findstr :5000
```

---

## 📝 Manual Start

If backend didn't start automatically:

```powershell
cd D:\ENIGMA\backend
npm start
```

---

## ✅ Test Registration

1. **Backend running**: `http://localhost:5000` ✅
2. **Frontend running**: `http://127.0.0.1:5500/registration.html` ✅
3. **Fill form** and submit
4. **Should work now!** 🎉

---

**Status**: Backend should be starting now! 🚀





