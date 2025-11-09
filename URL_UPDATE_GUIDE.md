# 🔗 URL Update Guide - Frontend & Backend

## 📍 Exact Locations to Update URLs

---

## 🌐 Frontend URL Update

### File: `js/registration.js`
### Line: 546-555

**Current Code:**
```javascript
const API_BASE_URL = (() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    // Production - Update this with your actual backend URL
    return 'https://your-backend.onrender.com'; // ⚠️ UPDATE THIS FOR PRODUCTION
})();
```

**Update करें:**
```javascript
const API_BASE_URL = (() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    // Production - Your actual backend URL from Render.com
    return 'https://enigma-backend.onrender.com'; // ✅ अपना backend URL यहाँ डालें
})();
```

**Example:**
- अगर आपका backend URL है: `https://enigma-backend-abc123.onrender.com`
- तो line 554 में यही URL डालें

---

## 🔧 Backend URL Update

### File: `backend/server.js`
### Line: 24-36

**Current Code:**
```javascript
const allowedOrigins = [
    // Development URLs
    'http://localhost:5500',
    'http://localhost:8000',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:8000',
    // Production URLs - Add your deployed frontend URLs here:
    // 'https://your-site.netlify.app',
    // 'https://your-site.vercel.app',
    // 'https://your-custom-domain.com',
    // Add from environment variable if set
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];
```

**Update करें (Option 1 - Manual):**
```javascript
const allowedOrigins = [
    // Development URLs
    'http://localhost:5500',
    'http://localhost:8000',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:8000',
    // Production URLs - Add your deployed frontend URLs here:
    'https://your-site.netlify.app',        // ✅ अपना Netlify URL यहाँ डालें
    'https://your-site.vercel.app',         // ✅ अगर Vercel use करें तो यहाँ
    // 'https://your-custom-domain.com',    // ✅ Custom domain अगर है
    // Add from environment variable if set
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];
```

**Update करें (Option 2 - Environment Variable):**
Render.com dashboard में:
1. Go to your backend service
2. Environment tab
3. Add variable:
   ```
   Key: FRONTEND_URL
   Value: https://your-site.netlify.app
   ```

---

## 📝 Step-by-Step Instructions

### Step 1: Deploy Backend First

1. **Deploy on Render.com**
2. **Get Backend URL**: `https://enigma-backend.onrender.com` (example)
3. **Copy this URL**

### Step 2: Update Frontend

1. **Open:** `js/registration.js`
2. **Go to:** Line 554
3. **Replace:** `'https://your-backend.onrender.com'`
4. **With:** Your actual backend URL
5. **Save file**

### Step 3: Deploy Frontend

1. **Deploy on Netlify/Vercel**
2. **Get Frontend URL**: `https://your-site.netlify.app` (example)
3. **Copy this URL**

### Step 4: Update Backend CORS

**Option A: Manual Update**
1. **Open:** `backend/server.js`
2. **Go to:** Line 31-32
3. **Uncomment और add करें:**
   ```javascript
   'https://your-site.netlify.app',  // अपना URL
   ```
4. **Save file**
5. **Redeploy backend**

**Option B: Environment Variable (Easier)**
1. **Render.com dashboard** में जाएं
2. **Environment** tab
3. **Add variable:**
   ```
   FRONTEND_URL = https://your-site.netlify.app
   ```
4. **Save** - Auto-redeploy होगा

---

## 🎯 Quick Reference

### Frontend Update:
```
File: js/registration.js
Line: 554
Change: 'https://your-backend.onrender.com'
To: 'https://enigma-backend.onrender.com' (your actual URL)
```

### Backend Update:
```
File: backend/server.js
Line: 31-32
Add: 'https://your-site.netlify.app' (your actual URL)
```

**OR**

```
Render.com → Environment Variables
Add: FRONTEND_URL = https://your-site.netlify.app
```

---

## ✅ Example

### After Deployment:

**Backend URL:**
```
https://enigma-backend-abc123.onrender.com
```

**Frontend URL:**
```
https://enigma-xiii.netlify.app
```

### Updates:

**Frontend (`js/registration.js` line 554):**
```javascript
return 'https://enigma-backend-abc123.onrender.com';
```

**Backend (`backend/server.js` line 31):**
```javascript
'https://enigma-xiii.netlify.app',
```

---

## 📋 Checklist

### Before Deployment:
- [ ] Backend deployed on Render.com
- [ ] Backend URL copied
- [ ] Frontend URL updated in `js/registration.js`
- [ ] Frontend deployed on Netlify/Vercel
- [ ] Frontend URL copied
- [ ] Backend CORS updated with frontend URL

### After Deployment:
- [ ] Test form submission
- [ ] Test payment flow
- [ ] Check browser console for errors
- [ ] Verify CORS working

---

## 🚨 Important Notes

1. **Order Matters:**
   - पहले backend deploy करें
   - फिर frontend में backend URL update करें
   - फिर frontend deploy करें
   - फिर backend में frontend URL add करें

2. **URLs Must Match:**
   - Frontend URL exactly वही होना चाहिए जो backend में add किया
   - `https://` और trailing `/` check करें

3. **No Trailing Slash:**
   - URLs में trailing slash नहीं होना चाहिए
   - ✅ `https://site.netlify.app`
   - ❌ `https://site.netlify.app/`

---

**Status**: URLs update करने के locations clear हैं! 🚀


