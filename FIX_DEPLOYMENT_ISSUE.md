# 🔧 Fix: Cannot POST /create-order

## 🔍 Problem Analysis

**Error:** `❌ Cannot POST /create-order`  
**API URL:** `https://your-backend.onrender.com/create-order`

**Root Cause:**
- ✅ Backend route `/create-order` exists (line 79 in `backend/server.js`)
- ❌ Deployed frontend still has **placeholder URL** `your-backend.onrender.com`
- ✅ Local code has correct URL: `https://enigmaugi.onrender.com`

---

## ✅ Solution: Redeploy Frontend

### Step 1: Verify Local Code

**File:** `js/registration.js` (Line 554)

**Should be:**
```javascript
return 'https://enigmaugi.onrender.com'; // ✅ Correct
```

**NOT:**
```javascript
return 'https://your-backend.onrender.com'; // ❌ Wrong
```

---

### Step 2: Redeploy to Netlify

#### Option A: Manual Deploy (Drag & Drop)
1. Go to: https://app.netlify.com/
2. Select your site: `enigmaugi`
3. Go to **Deploys** tab
4. Drag and drop your entire `D:\ENIGMA` folder
5. Wait for deployment to complete

#### Option B: Git Deploy (If using Git)
1. Commit changes:
   ```bash
   git add .
   git commit -m "Fix: Update backend URL"
   git push
   ```
2. Netlify will auto-deploy

#### Option C: Netlify CLI
```bash
netlify deploy --prod
```

---

### Step 3: Clear Browser Cache

After redeploy:
1. Open: `https://enigmaugi.netlify.app/registration.html`
2. Press `Ctrl + Shift + R` (Hard refresh)
3. Or clear browser cache

---

### Step 4: Verify Fix

1. Open browser console (F12)
2. Submit form
3. Check console log:
   ```
   ✅ API URL: https://enigmaugi.onrender.com/create-order
   ```
4. Should NOT see: `your-backend.onrender.com`

---

## 🔍 Quick Verification

### Check Deployed Code:
1. Open: `https://enigmaugi.netlify.app/registration.html`
2. Press `Ctrl + U` (View source)
3. Search for: `registration.js`
4. Click on the JS file link
5. Search for: `enigmaugi.onrender.com`
6. Should find the correct URL

---

## 🚨 If Still Not Working

### Check 1: Backend Health
```bash
curl https://enigmaugi.onrender.com
```
**Expected:** `{"status":"success","message":"ENIGMA XIII Registration API is running"}`

### Check 2: Backend Route
```bash
curl -X POST https://enigmaugi.onrender.com/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount":300}'
```
**Expected:** Order creation response

### Check 3: CORS
- Verify frontend URL in `backend/server.js` line 31
- Should be: `'https://enigmaugi.netlify.app'`

---

## ✅ Summary

**Issue:** Deployed frontend has old placeholder URL  
**Fix:** Redeploy frontend with updated code  
**Status:** Backend route exists and is correct

---

**After redeploy, the issue should be fixed!** 🚀

