# 🌐 Frontend Server Options

## ❌ Python Not Installed

Python HTTP server is not available. Here are alternatives:

---

## ✅ Option 1: VS Code Live Server (Recommended)

### Setup:
1. Install VS Code extension: **Live Server**
2. Open `registration.html` in VS Code
3. Right-click → **"Open with Live Server"**
4. Page opens automatically at `http://127.0.0.1:5500`

### Advantages:
- ✅ Auto-reload on file changes
- ✅ No installation needed (just extension)
- ✅ Works perfectly for testing

---

## ✅ Option 2: Direct File Opening

### For Testing:
1. Open File Explorer
2. Navigate to `D:\ENIGMA`
3. Double-click `registration.html`
4. Opens in default browser

### Note:
- ⚠️ Some features may not work (CORS, modules)
- ✅ Basic testing possible
- ✅ Firebase should work

---

## ✅ Option 3: Install Python (Optional)

### If you want Python server:

**Windows:**
1. Go to: https://www.python.org/downloads/
2. Download Python 3.x
3. Install with "Add to PATH" checked
4. Restart terminal
5. Run: `python -m http.server 8000`

**Or via Microsoft Store:**
- Search "Python" in Microsoft Store
- Install Python 3.x

---

## ✅ Option 4: Use Node.js HTTP Server

### Quick Server:
```bash
# Install http-server globally
npm install -g http-server

# Run server
cd D:\ENIGMA
http-server -p 8000
```

Then open: `http://localhost:8000/registration.html`

---

## 🎯 Recommended: VS Code Live Server

**Easiest and Best Option:**
1. Install Live Server extension
2. Open `registration.html`
3. Click "Go Live" button
4. Done! ✅

---

## 🧪 Current Status

### Backend:
- ✅ Running on `http://localhost:5000`
- ✅ All endpoints working

### Frontend:
- ⏳ Need to start server (choose option above)
- ✅ Files ready to test

---

## 📝 Quick Test (After Server Starts)

1. Open: `http://localhost:8000/registration.html` (or your server URL)
2. Check console: `✅ Firebase initialized`
3. Fill form and test

---

**Recommendation**: Use **VS Code Live Server** - it's the easiest! 🚀


