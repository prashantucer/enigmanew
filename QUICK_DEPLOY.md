# 🚀 Quick Deployment Guide (हिंदी)

## 📋 Step-by-Step Deployment

---

## 🌐 Step 1: Frontend Deploy (Netlify)

### Easiest Method: Drag & Drop

1. **Go to Netlify:**
   - https://app.netlify.com/
   - Sign up/Login करें

2. **Deploy:**
   - "Add new site" → "Deploy manually"
   - `D:\ENIGMA` folder drag करें
   - Wait for deployment
   - URL मिलेगा: `https://your-site.netlify.app`

3. **Update Backend URL:**
   - `js/registration.js` में line 546:
   ```javascript
   const API_BASE_URL = 'https://your-backend.onrender.com';
   ```
   - Code update करके फिर से deploy करें

---

## 🔧 Step 2: Backend Deploy (Render.com)

### Method: Dashboard

1. **Go to Render:**
   - https://dashboard.render.com/
   - Sign up/Login करें

2. **Create Web Service:**
   - "New" → "Web Service"
   - GitHub repo connect करें (या code upload करें)

3. **Settings:**
   ```
   Name: enigma-backend
   Environment: Node
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   ```

4. **Environment Variables Add करें:**
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
   FIREBASE_PROJECT_ID=enigmaregistration
   FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@enigmaregistration.iam.gserviceaccount.com
   NODE_ENV=production
   PORT=5000
   ```

5. **Deploy:**
   - "Create Web Service" click करें
   - Wait for deployment
   - URL मिलेगा: `https://enigma-backend.onrender.com`

---

## 🔐 Step 3: CORS Update

### Backend में Update करें

`backend/server.js` में line 24-33:

```javascript
const allowedOrigins = [
    'http://localhost:5500',
    'http://localhost:8000',
    'https://your-site.netlify.app',  // अपना Netlify URL
    'https://your-site.vercel.app',   // अगर Vercel use करें
];
```

---

## 🔑 Step 4: Razorpay Live Keys

1. **Razorpay Dashboard:**
   - https://dashboard.razorpay.com/
   - "Live Mode" switch करें

2. **Keys Copy करें:**
   - Key ID: `rzp_live_xxxxx`
   - Key Secret: `xxxxx`

3. **Render में Update करें:**
   - Environment variables में update करें

---

## ✅ Step 5: Testing

### Test करें:

1. **Frontend:**
   - Deployed URL open करें
   - Form test करें

2. **Backend:**
   - `https://your-backend.onrender.com` open करें
   - "ENIGMA Registration API is running" दिखना चाहिए

3. **Complete Flow:**
   - Form fill करें
   - Submit करें
   - Payment करें
   - Data Firestore में check करें

---

## 📝 Quick Checklist

### Frontend:
- [ ] Netlify/Vercel पर deploy किया
- [ ] Backend URL update किया
- [ ] Test किया

### Backend:
- [ ] Render.com पर deploy किया
- [ ] Environment variables set किए
- [ ] CORS update किया
- [ ] Razorpay live keys set किए
- [ ] Test किया

---

## 🚨 Common Issues

### CORS Error:
- Backend में frontend URL add करें

### Backend Not Starting:
- Environment variables check करें

### Payment Failed:
- Razorpay keys check करें (live mode)

---

## 🎯 After Deployment

1. **Test:** Complete registration flow
2. **Monitor:** Firestore में data check करें
3. **Share:** Frontend URL users को share करें

---

**Status**: Ready to deploy! Follow steps above! 🚀



