# ✅ ENIGMA XIII - System Activation Checklist

## 🎯 Complete Setup Guide (Step by Step)

---

## 📋 PHASE 1: Firebase Setup (15-20 minutes)

### Step 1: Firebase Project Create करें
1. [Firebase Console](https://console.firebase.google.com/) पर जाएं
2. **Add Project** click करें
3. Project name: `ENIGMA-XIII` (या कोई भी नाम)
4. Google Analytics enable/disable (optional)
5. **Create Project** click करें

### Step 2: Firestore Database Enable करें
1. Left menu से **Firestore Database** select करें
2. **Create Database** click करें
3. **Start in production mode** select करें
4. Location: `asia-south1` (Mumbai) या nearest location
5. **Enable** click करें

### Step 3: Firebase Storage Enable करें
1. Left menu से **Storage** select करें
2. **Get Started** click करें
3. **Start in production mode** select करें
4. Location: same as Firestore
5. **Done** click करें

### Step 4: Web App Add करें
1. Project Settings (⚙️ icon) → **General** tab
2. Scroll down to **Your apps** section
3. **Web** icon (</>) click करें
4. App nickname: `ENIGMA Web`
5. **Register app** click करें
6. **Config values copy करें** (ये बाद में use होंगे)

### Step 5: Service Account Key Download करें
1. Project Settings → **Service Accounts** tab
2. **Generate New Private Key** click करें
3. JSON file download होगा
4. File को `backend/serviceAccountKey.json` के नाम से save करें
5. ⚠️ **Important**: इस file को Git में commit न करें!

### Step 6: Security Rules Deploy करें
1. Firestore Database → **Rules** tab
2. `FIREBASE_CONSOLE_PASTE.txt` file का content copy करें
3. Rules editor में paste करें
4. **Publish** click करें

### Step 7: Storage Rules Set करें
1. Storage → **Rules** tab
2. ये rules paste करें:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /id_cards/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 1048576; // 1MB limit
    }
  }
}
```
3. **Publish** click करें

---

## 💳 PHASE 2: Razorpay Setup (10 minutes)

### Step 1: Razorpay Account Create करें
1. [Razorpay Dashboard](https://dashboard.razorpay.com/) पर जाएं
2. Sign up करें (अगर account नहीं है)
3. Email verify करें

### Step 2: Test Keys लें
1. Dashboard → **Settings** → **API Keys**
2. **Generate Test Keys** (अगर नहीं हैं)
3. **Key ID** और **Key Secret** copy करें
4. ⚠️ Secret key को safe रखें (कभी share न करें)

### Step 3: Test Mode में Keys Use करें
- Development के लिए Test keys use करें
- Production में Live keys use करेंगे

---

## 🔧 PHASE 3: Backend Setup (20-25 minutes)

### Step 1: Backend Dependencies Install करें
```bash
cd backend
npm install
```

### Step 2: Environment Variables Set करें
1. `backend/` folder में `.env` file create करें
2. `backend/.env.example` देखकर format समझें
3. `.env` file में ये add करें:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
PORT=5000
NODE_ENV=development

# Firebase (Optional - अगर serviceAccountKey.json use नहीं कर रहे)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
```

### Step 3: Service Account Key Place करें
1. Firebase से download किया हुआ JSON file
2. `backend/serviceAccountKey.json` के नाम से save करें
3. File structure check करें:
```
backend/
  ├── serviceAccountKey.json  ← यहाँ होना चाहिए
  ├── server.js
  ├── firebase.js
  └── package.json
```

### Step 4: Backend Test करें (Locally)
```bash
cd backend
npm start
```

**Check करें:**
- Console में `✅ Firebase Admin SDK initialized` दिखना चाहिए
- Console में `🚀 ENIGMA XIII Registration API running on port 5000` दिखना चाहिए
- Browser में `http://localhost:5000` open करें
- `{"status":"success"}` response आना चाहिए

### Step 5: Backend Deploy करें (Render.com)

1. **Render.com पर Account Create करें**
   - [Render Dashboard](https://dashboard.render.com/) पर जाएं
   - Sign up करें

2. **New Web Service Create करें**
   - **New** → **Web Service** click करें
   - Git repository connect करें या code upload करें

3. **Service Configure करें:**
   - **Name**: `enigma-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `backend` (अगर root से deploy कर रहे हैं)

4. **Environment Variables Add करें:**
   - **Environment** tab में जाएं
   - ये variables add करें:
     ```
     RAZORPAY_KEY_ID=rzp_test_xxxxx
     RAZORPAY_KEY_SECRET=your_secret
     PORT=10000
     NODE_ENV=production
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
     FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
     ```

5. **CORS Update करें:**
   - `backend/server.js` में `allowedOrigins` array update करें
   - अपने frontend URL add करें

6. **Deploy करें**
   - **Create Web Service** click करें
   - Deployment complete होने का wait करें
   - Backend URL note करें: `https://enigma-backend.onrender.com`

---

## 🎨 PHASE 4: Frontend Setup (15 minutes)

### Step 1: Firebase Config Update करें
1. `js/firebaseConfig.js` file open करें
2. Firebase Console से copy किए हुए config values paste करें:
```javascript
export const firebaseConfig = {
    apiKey: "AIzaSy...",  // Firebase से copy करें
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### Step 2: Backend URL Update करें
1. `js/registration.js` file open करें
2. Line 365 पर `API_BASE_URL` update करें:
```javascript
const API_BASE_URL = 'https://enigma-backend.onrender.com'; // अपना backend URL
```

### Step 3: Frontend Deploy करें

**Option A: Netlify (Recommended)**
1. [Netlify](https://app.netlify.com/) पर जाएं
2. **Add new site** → **Deploy manually**
3. Project folder drag & drop करें (backend folder exclude करें)
4. Deploy complete होने का wait करें
5. Frontend URL note करें: `https://your-site.netlify.app`

**Option B: Vercel**
1. [Vercel](https://vercel.com/) पर जाएं
2. **Add New Project**
3. Git repo connect करें या folder upload करें
4. Deploy करें

### Step 4: Backend CORS में Frontend URL Add करें
1. Render.com dashboard में backend service open करें
2. **Environment** tab में जाएं
3. `backend/server.js` में frontend URL add करें
4. Redeploy करें

---

## 🧪 PHASE 5: Testing (10 minutes)

### Step 1: Frontend Test करें
1. Deployed frontend URL open करें
2. Browser console check करें:
   - `✅ Firebase initialized` दिखना चाहिए
   - कोई error नहीं होना चाहिए

### Step 2: Registration Form Test करें
1. Registration page open करें
2. Form fill करें:
   - Name, Email, Phone, etc.
   - ID card upload करें (1MB से कम, JPG/PNG)
3. Events select करें
4. Submit button click करें

### Step 3: Payment Test करें (Razorpay Test Mode)
1. Razorpay checkout open होगा
2. **Test Card Details:**
   - Card Number: `4111 1111 1111 1111`
   - CVV: कोई भी 3 digits (e.g., `123`)
   - Expiry: कोई भी future date (e.g., `12/25`)
   - Name: कोई भी नाम

3. **या UPI Test करें:**
   - UPI ID: `success@razorpay` (always succeeds)
   - या: `failure@razorpay` (always fails - testing के लिए)

### Step 4: Verify Payment
1. Payment complete होने के बाद
2. Success page पर redirect होना चाहिए
3. Payment ID, Name, Email display होना चाहिए

### Step 5: Firestore Check करें
1. Firebase Console → Firestore Database
2. `registrations` collection check करें
3. New document दिखना चाहिए:
   - `payment_status: "paid"`
   - सभी form data
   - `idUrl` (Firebase Storage URL)

### Step 6: Storage Check करें
1. Firebase Console → Storage
2. `id_cards/` folder check करें
3. Uploaded ID card file दिखना चाहिए

---

## ✅ FINAL CHECKLIST

### Firebase
- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Storage enabled
- [ ] Web app added & config copied
- [ ] Service account key downloaded
- [ ] Security rules deployed
- [ ] Storage rules set

### Razorpay
- [ ] Razorpay account created
- [ ] Test keys generated
- [ ] Keys saved securely

### Backend
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with all variables
- [ ] `serviceAccountKey.json` placed in backend folder
- [ ] Backend runs locally (`npm start`)
- [ ] Backend deployed on Render.com
- [ ] Environment variables set in Render
- [ ] CORS configured with frontend URL
- [ ] Health check working (`/` endpoint)

### Frontend
- [ ] `firebaseConfig.js` updated with Firebase credentials
- [ ] `registration.js` में `API_BASE_URL` updated
- [ ] Frontend deployed (Netlify/Vercel)
- [ ] All pages loading correctly

### Testing
- [ ] Frontend loads without errors
- [ ] Firebase initializes correctly
- [ ] Registration form works
- [ ] ID card uploads to Firebase Storage
- [ ] Razorpay checkout opens
- [ ] Test payment successful
- [ ] Success page shows correctly
- [ ] Data saved in Firestore
- [ ] Payment ID displayed correctly

---

## 🚨 Common Issues & Solutions

### Issue 1: Firebase not initializing
**Solution:**
- Check `firebaseConfig.js` में सभी values correct हैं
- Browser console में errors check करें
- Firebase project में Web app properly added है या नहीं

### Issue 2: Backend API calls failing
**Solution:**
- Check `API_BASE_URL` correct है
- Backend running है या नहीं (Render logs check करें)
- CORS में frontend URL added है या नहीं

### Issue 3: Payment not working
**Solution:**
- Razorpay keys correct हैं या नहीं
- Test mode में test keys use कर रहे हैं
- Browser console में errors check करें

### Issue 4: Data not saving to Firestore
**Solution:**
- Service account key correct है
- Backend logs check करें
- Firestore security rules check करें

---

## 📞 Support

अगर कोई problem आए:
1. Console logs check करें (browser + backend)
2. Firebase Console में errors check करें
3. Render.com logs check करें
4. `DEPLOYMENT_GUIDE.md` देखें

---

## 🎉 Success!

अगर सब कुछ working है:
- ✅ Frontend live है
- ✅ Backend running है
- ✅ Payments working हैं
- ✅ Data saving हो रहा है

**System fully active है!** 🚀

---

**Estimated Total Time**: 60-70 minutes
**Difficulty**: Medium




