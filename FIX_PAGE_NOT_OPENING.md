# 🔧 Fix: Page Not Opening

## Issue: 404 Error on http://localhost:8000

### Solutions:

### Option 1: Use VS Code Live Server (Easiest) ✅

1. **Install Live Server Extension:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search "Live Server"
   - Install by Ritwick Dey

2. **Open File:**
   - Open `registration.html` in VS Code
   - Right-click on file
   - Select **"Open with Live Server"**
   - Page opens automatically at `http://127.0.0.1:5500`

### Option 2: Direct File Opening

1. **Open File Explorer:**
   - Navigate to `D:\ENIGMA`
   - Double-click `registration.html`
   - Opens in default browser

**Note:** Some features may need a server, but basic testing works.

### Option 3: Fix http-server

**Stop current server:**
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
```

**Start from correct directory:**
```powershell
cd D:\ENIGMA
http-server -p 8000
```

**Then open:**
- http://localhost:8000/registration.html
- http://localhost:8000/index.html

### Option 4: Use Python (if installed)

```bash
cd D:\ENIGMA
python -m http.server 8000
```

---

## 🎯 Recommended: VS Code Live Server

**Why:**
- ✅ Easiest to use
- ✅ Auto-reload on changes
- ✅ No configuration needed
- ✅ Works perfectly

**Steps:**
1. Install Live Server extension
2. Open `registration.html`
3. Click "Go Live" button
4. Done! ✅

---

## ✅ Quick Test

After opening page:
1. Check browser console (F12)
2. Should see: `✅ Firebase initialized`
3. Fill form and test

---

**Try VS Code Live Server - it's the easiest solution!** 🚀





