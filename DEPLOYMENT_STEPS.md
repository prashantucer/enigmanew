# 🚀 Deployment Guide - Step by Step

## 📋 Overview

Deploy करने के लिए:
1. **Frontend** → Netlify या Vercel
2. **Backend** → Render.com
3. **Environment Variables** → Set करें
4. **CORS** → Update करें

---

## 🌐 Step 1: Frontend Deployment (Netlify)

### Option A: Netlify (Recommended)

#### 1.1: Prepare for Deployment
```bash
# Ensure all files are ready
cd D:\ENIGMA
# Check that registration.html, js/, css/ folders are present
```

#### 1.2: Deploy via Netlify Dashboard

**Method 1: Drag & Drop (Easiest)**
1. Go to: https://app.netlify.com/
2. Sign up/Login
3. Drag `D:\ENIGMA` folder to Netlify dashboard
4. Wait for deployment
5. Get your URL: `https://your-site-name.netlify.app`

**Method 2: Git Integration**
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Auto-deploy on every push

#### 1.3: Update Firebase Config (if needed)
- `js/firebaseConfig.js` में config already set है
- Production में same config use होगा

#### 1.4: Update Backend URL
- `js/registration.js` में line 546:
```javascript
const API_BASE_URL = 'https://your-backend.onrender.com'; // Update this
```

---

### Option B: Vercel

#### 1.1: Install Vercel CLI
```bash
npm install -g vercel
```

#### 1.2: Deploy
```bash
cd D:\ENIGMA
vercel
```

#### 1.3: Follow prompts
- Project name
- Deploy settings
- Get your URL: `https://your-site.vercel.app`

---

## 🔧 Step 2: Backend Deployment (Render.com)

### 2.1: Prepare Backend

#### Create `render.yaml` (already exists)
```yaml
services:
  - type: web
    name: enigma-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

### 2.2: Deploy on Render.com

#### Method 1: Via Dashboard
1. Go to: https://dashboard.render.com/
2. Sign up/Login
3. Click "New" → "Web Service"
4. Connect GitHub repo (or upload code)
5. Settings:
   - **Name**: `enigma-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `backend` (if repo root is ENIGMA)

#### Method 2: Via Git
1. Push code to GitHub
2. Connect repo to Render
3. Auto-deploy

### 2.3: Set Environment Variables

Render dashboard में **Environment** section में add करें:

```
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
FIREBASE_PROJECT_ID=enigmaregistration
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@enigmaregistration.iam.gserviceaccount.com
NODE_ENV=production
PORT=5000
```

**OR** use `serviceAccountKey.json`:
- Upload `serviceAccountKey.json` to Render
- Backend automatically use करेगा

---

## 🔐 Step 3: Update CORS

### 3.1: Backend CORS Update

`backend/server.js` में line 24-33:

```javascript
const allowedOrigins = [
    'http://localhost:5500',
    'http://localhost:8000',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:8000',
    // Add your production frontend URLs:
    'https://your-site.netlify.app',        // Netlify URL
    'https://your-site.vercel.app',         // Vercel URL
    'https://your-custom-domain.com'        // Custom domain
];
```

---

## 🔑 Step 4: Update Frontend Backend URL

### 4.1: Update API URL

`js/registration.js` में line 546:

```javascript
// For production
const API_BASE_URL = 'https://your-backend.onrender.com';

// For local testing
// const API_BASE_URL = 'http://localhost:5000';
```

---

## 📝 Step 5: Razorpay Configuration

### 5.1: Switch to Live Mode

1. Go to: https://dashboard.razorpay.com/
2. Switch to **Live Mode**
3. Get **Key ID** and **Key Secret**
4. Update in Render environment variables

### 5.2: Update Backend

Render dashboard में:
```
RAZORPAY_KEY_ID=rzp_live_xxxxx  (not rzp_test_)
RAZORPAY_KEY_SECRET=your_live_secret
```

---

## 🔥 Step 6: Firebase Configuration

### 6.1: Firebase Already Configured
- Frontend: `js/firebaseConfig.js` में config set है
- Backend: `serviceAccountKey.json` या env variables

### 6.2: Security Rules
- Firestore rules already set (`firestore.rules`)
- Storage rules check करें

---

## ✅ Step 7: Testing

### 7.1: Test Frontend
1. Open deployed frontend URL
2. Check console for errors
3. Test form submission

### 7.2: Test Backend
1. Open: `https://your-backend.onrender.com`
2. Should see: "ENIGMA Registration API is running"

### 7.3: Test Payment
1. Fill form
2. Submit
3. Use **live Razorpay** test (or real payment)
4. Verify data in Firestore

---

## 📋 Deployment Checklist

### Frontend
- [ ] Code pushed to GitHub (optional)
- [ ] Deployed on Netlify/Vercel
- [ ] Backend URL updated in `registration.js`
- [ ] Firebase config correct
- [ ] Test form submission

### Backend
- [ ] Code pushed to GitHub (optional)
- [ ] Deployed on Render.com
- [ ] Environment variables set
- [ ] CORS updated with frontend URL
- [ ] Razorpay live keys set
- [ ] Firebase credentials set
- [ ] Test API endpoints

### Testing
- [ ] Frontend loads correctly
- [ ] Form validation works
- [ ] Payment checkout opens
- [ ] Payment successful
- [ ] Data saved to Firestore
- [ ] Success page shows

---

## 🚨 Common Issues

### Issue 1: CORS Error
**Fix**: Update `allowedOrigins` in `backend/server.js` with your frontend URL

### Issue 2: Backend Not Starting
**Fix**: Check environment variables in Render dashboard

### Issue 3: Payment Failed
**Fix**: Check Razorpay keys (live mode for production)

### Issue 4: Firestore Error
**Fix**: Check Firebase credentials in Render environment variables

---

## 🎯 Quick Deploy Commands

### Netlify (via CLI)
```bash
npm install -g netlify-cli
cd D:\ENIGMA
netlify deploy
netlify deploy --prod
```

### Vercel (via CLI)
```bash
npm install -g vercel
cd D:\ENIGMA
vercel
vercel --prod
```

### Render (via Git)
```bash
git add .
git commit -m "Deploy to production"
git push origin main
# Auto-deploys on Render
```

---

## 📞 Support

### If Issues:
1. Check browser console (F12)
2. Check backend logs in Render dashboard
3. Check Netlify/Vercel deployment logs
4. Verify environment variables

---

## 🎉 After Deployment

1. **Test**: Complete registration flow
2. **Monitor**: Check Firestore for data
3. **Update**: Share frontend URL with users
4. **Backup**: Keep local code backed up

---

**Status**: Ready to deploy! Follow steps above! 🚀






