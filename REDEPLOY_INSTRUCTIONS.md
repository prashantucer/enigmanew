# 🚀 Netlify Redeploy Instructions - Fix Payment Issue

## ✅ Problem Fixed
- ✅ Local file `js/registration.js` has correct URL: `https://enigmaugi.onrender.com`
- ✅ Cache settings updated in `netlify.toml`
- ❌ Netlify par abhi purana version deployed hai

## 🔧 Step-by-Step Redeploy

### Step 1: Git Commit & Push
```bash
# Check current status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Fix: Update backend API URL to enigmaugi.onrender.com"

# Push to repository
git push origin main
# (or git push origin master - depends on your branch name)
```

### Step 2: Netlify Dashboard se Redeploy

**Option A: Automatic (Recommended)**
- Git push ke baad Netlify automatically deploy karega
- Netlify Dashboard → Your Site → Deploys tab check karein
- New deployment start hoga automatically

**Option B: Manual Redeploy**
1. Netlify Dashboard open karein: https://app.netlify.com
2. Apni site select karein
3. **Deploys** tab click karein
4. Latest deployment ke right side **"..."** (three dots) click karein
5. **"Trigger deploy"** → **"Clear cache and deploy site"** select karein
6. Deployment complete hone ka wait karein (2-3 minutes)

### Step 3: Browser Cache Clear

**Chrome/Edge:**
- `Ctrl + Shift + Delete` (Windows) ya `Cmd + Shift + Delete` (Mac)
- **Cached images and files** select karein
- **Clear data** click karein

**Ya Hard Refresh:**
- `Ctrl + F5` (Windows) ya `Cmd + Shift + R` (Mac)

### Step 4: Verify Deployment

1. **Website open karein:** https://enigmaugii.netlify.app/registration
2. **Browser Console open karein:** `F12` → Console tab
3. **Check log:** `🔗 Backend API URL:` should show `https://enigmaugi.onrender.com`
4. **Form submit karke test karein**

## ✅ Expected Result

**Console me yeh dikhna chahiye:**
```
🔗 Backend API URL: https://enigmaugi.onrender.com
📍 Current hostname: enigmaugii.netlify.app
🌐 Full URL: https://enigmaugii.netlify.app/registration
```

**Agar abhi bhi `your-backend.onrender.com` dikhe:**
- Browser cache clear karein (Step 3)
- Hard refresh karein (`Ctrl + F5`)
- Incognito/Private window me test karein

## 🔍 Troubleshooting

### Issue: Deployment nahi ho raha
- Git repository check karein - changes push hue ya nahi
- Netlify Dashboard → Site settings → Build & deploy → Check connected repository

### Issue: Abhi bhi old URL dikh raha hai
- Browser cache clear karein
- Incognito window me test karein
- Netlify Dashboard → Deploys → Check latest deployment timestamp

### Issue: 404 error abhi bhi aa raha hai
- Backend check karein: https://enigmaugi.onrender.com
- Should show: `{"status":"success","message":"ENIGMA XIII Registration API is running"}`
- Agar backend down hai, Render.com dashboard check karein

## 📞 Support

Agar abhi bhi issue hai:
1. Browser console me exact error message share karein
2. Netlify deployment logs share karein
3. Backend health check: https://enigmaugi.onrender.com


