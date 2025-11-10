# 🌐 How to Open Registration Page

## ✅ Server Status

Server is running on port 8000! ✅

---

## 🚀 Open Registration Page

### Method 1: Browser में Direct URL Type करें

1. Browser खोलें (Chrome, Edge, Firefox)
2. Address bar में type करें:
   ```
   http://localhost:8000/registration.html
   ```
3. Enter press करें

### Method 2: Browser में Open करें

**Chrome/Edge:**
- Press `Ctrl + L` (address bar focus)
- Type: `localhost:8000/registration.html`
- Press Enter

**Firefox:**
- Press `Ctrl + L`
- Type: `localhost:8000/registration.html`
- Press Enter

---

## 📋 All Available Pages

- **Registration**: `http://localhost:8000/registration.html`
- **Home**: `http://localhost:8000/index.html`
- **About**: `http://localhost:8000/about.html`
- **Events**: `http://localhost:8000/events.html`
- **Gallery**: `http://localhost:8000/gallery.html`
- **Success**: `http://localhost:8000/success.html`

---

## 🔍 Troubleshooting

### Issue: "This site can't be reached"

**Solution:**
1. Check server is running:
   ```powershell
   netstat -ano | findstr :8000
   ```
2. If not running, start server:
   ```powershell
   cd D:\ENIGMA
   http-server -p 8000
   ```

### Issue: "404 Not Found"

**Solution:**
- Check file exists: `D:\ENIGMA\registration.html`
- Use exact URL: `http://localhost:8000/registration.html`

### Issue: Page loads but shows errors

**Solution:**
- Check browser console (F12)
- Make sure backend is running: `http://localhost:5000`

---

## ✅ Quick Test

1. Open: `http://localhost:8000/registration.html`
2. Check console (F12): Should see `✅ Firebase initialized`
3. Events should be populated
4. ID card upload should work

---

## 🎯 Current Status

- ✅ Server: Running on port 8000
- ✅ Backend: Running on port 5000
- ✅ Ready: Yes

**Just open**: `http://localhost:8000/registration.html` 🚀






