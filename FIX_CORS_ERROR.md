# 🔧 Fix CORS Error - ID Card Upload

## ❌ Problem

CORS error आ रहा है क्योंकि:
- File directly open हो रहा है (`file://` protocol)
- ES modules `file://` protocol पर काम नहीं करते
- Browser CORS policy block कर रहा है

## ✅ Solution

### Option 1: Use Web Server (Recommended) ✅

**http-server use करें:**

1. **Server already running है:**
   - URL: `http://localhost:8000/registration.html`
   - Browser में यह URL open करें
   - File directly open न करें

2. **अगर server नहीं चल रहा:**
   ```bash
   cd D:\ENIGMA
   http-server -p 8000
   ```

3. **Browser में open करें:**
   ```
   http://localhost:8000/registration.html
   ```

### Option 2: VS Code Live Server ✅

1. VS Code में `registration.html` open करें
2. Right-click → "Open with Live Server"
3. Automatically `http://127.0.0.1:5500` पर खुलेगा

---

## 🔍 What I Fixed

1. **Firebase Config Inline**: `firebaseConfig.js` import की जगह config directly HTML में add किया
2. **CORS Issue Resolved**: अब file:// protocol पर भी काम करेगा (लेकिन server use करना better है)

---

## ✅ Test Steps

1. **Server URL use करें:**
   - `http://localhost:8000/registration.html` open करें
   - File directly open न करें

2. **Browser Console Check करें:**
   - `✅ Firebase initialized` दिखना चाहिए
   - CORS errors नहीं होने चाहिए

3. **ID Card Upload Test:**
   - File select करें
   - Upload होना चाहिए
   - Console में success messages दिखने चाहिए

---

## 📝 Important

**हमेशा web server use करें:**
- ✅ `http://localhost:8000/registration.html`
- ❌ `file:///D:/ENIGMA/registration.html` (direct file open)

---

**Status**: Fixed! Ab server URL use करके test करें. 🚀






