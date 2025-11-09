# 🚀 Quick Setup Guide (हिंदी में)

## ⚡ Fast Track - 5 Steps में System Active करें

### 1️⃣ Firebase Setup (10 min)
```
1. Firebase Console → New Project
2. Firestore Database → Create (Production mode)
3. Storage → Get Started (Production mode)
4. Project Settings → Service Accounts → Generate Key
5. Key को backend/serviceAccountKey.json में save करें
```

### 2️⃣ Razorpay Setup (5 min)
```
1. Razorpay Dashboard → Settings → API Keys
2. Test Keys generate करें
3. Key ID और Secret copy करें
```

### 3️⃣ Backend Deploy (15 min)
```
1. backend/.env file create करें:
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
   PORT=5000

2. Render.com पर:
   - New Web Service
   - Build: cd backend && npm install
   - Start: cd backend && npm start
   - Environment variables add करें
   - Deploy करें
```

### 4️⃣ Frontend Update (5 min)
```
1. js/firebaseConfig.js में Firebase keys paste करें
2. js/registration.js में API_BASE_URL update करें
3. Netlify/Vercel पर deploy करें
```

### 5️⃣ Test करें (5 min)
```
1. Registration form fill करें
2. ID card upload करें
3. Payment करें (test card: 4111 1111 1111 1111)
4. Success page check करें
```

---

## 📝 Important Files to Update

### Before Deployment:

1. **js/firebaseConfig.js**
   ```javascript
   apiKey: "YOUR_ACTUAL_KEY"  // Firebase से
   projectId: "YOUR_PROJECT_ID"  // Firebase से
   // ... बाकी values
   ```

2. **js/registration.js** (Line 365)
   ```javascript
   const API_BASE_URL = 'https://your-backend.onrender.com';
   ```

3. **backend/.env**
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
   ```

4. **backend/server.js** (Line 24-32)
   ```javascript
   const allowedOrigins = [
       'https://your-site.netlify.app',  // अपना URL
   ];
   ```

---

## ✅ Checklist

- [ ] Firebase project ready
- [ ] Service account key downloaded
- [ ] Razorpay test keys ready
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Netlify/Vercel
- [ ] All URLs updated
- [ ] Test payment successful

---

**Total Time**: ~40 minutes
**Status**: System Active! 🎉



