# ENIGMA XIII - Complete Deployment Guide

This guide covers deploying both frontend and backend of the ENIGMA XIII registration system.

---

## 📋 Table of Contents

1. [Frontend Deployment](#frontend-deployment)
   - [Netlify](#netlify-deployment)
   - [Vercel](#vercel-deployment)
2. [Backend Deployment](#backend-deployment)
   - [Render.com](#render-deployment)
3. [Environment Variables](#environment-variables)
4. [CORS Configuration](#cors-configuration)
5. [Testing](#testing)
6. [Post-Deployment Checklist](#post-deployment-checklist)

---

## 🎨 Frontend Deployment

### Netlify Deployment

#### Step 1: Prepare for Deployment

1. **Update Firebase Config**
   - Open `js/firebaseConfig.js`
   - Replace placeholders with your Firebase project credentials:
   ```javascript
   export const firebaseConfig = {
       apiKey: "your-actual-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "your-app-id"
   };
   ```

2. **Update Backend API URL**
   - Open `js/registration.js`
   - Update `API_BASE_URL` to your backend URL:
   ```javascript
   const API_BASE_URL = 'https://your-backend.onrender.com';
   ```

#### Step 2: Deploy to Netlify

**Option A: Using Netlify CLI**

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize site:
   ```bash
   netlify init
   ```

4. Deploy:
   ```bash
   netlify deploy --prod
   ```

**Option B: Using Netlify Dashboard**

1. Go to [Netlify](https://app.netlify.com/)
2. Click **Add new site** → **Deploy manually**
3. Drag and drop your project folder (excluding `backend/`, `node_modules/`, etc.)
4. Or connect your Git repository for automatic deployments

#### Step 3: Configure Build Settings

- **Build command**: (Leave empty for static site)
- **Publish directory**: `.` (root)
- **Node version**: 18.x or higher

#### Step 4: Set Environment Variables (if needed)

In Netlify Dashboard → Site settings → Environment variables:
- Not required for static frontend, but you can add:
  - `FIREBASE_API_KEY` (if using env vars)
  - `BACKEND_URL` (if using env vars)

---

### Vercel Deployment

#### Step 1: Prepare for Deployment

Same as Netlify - update Firebase config and backend URL.

#### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

**Option B: Using Vercel Dashboard**

1. Go to [Vercel](https://vercel.com/)
2. Click **Add New Project**
3. Import your Git repository or upload folder
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `.`
   - **Build Command**: (Leave empty)
   - **Output Directory**: `.`

#### Step 3: Configure vercel.json (Optional)

Create `vercel.json` in root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## 🔧 Backend Deployment

### Render.com Deployment

#### Step 1: Prepare Backend

1. **Create `render.yaml`** (Optional, for infrastructure as code):
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
           value: 10000
   ```

2. **Update CORS in `backend/server.js`**:
   ```javascript
   app.use(cors({
       origin: [
           'https://your-frontend.netlify.app',
           'https://your-frontend.vercel.app',
           'http://localhost:5500' // For local testing
       ],
       credentials: true
   }));
   ```

#### Step 2: Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Create New Web Service**:
   - Click **New** → **Web Service**
   - Connect your Git repository OR upload code

3. **Configure Service**:
   - **Name**: `enigma-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `backend` (if deploying from root) OR leave empty if deploying backend folder

4. **Set Environment Variables**:
   Click **Environment** tab and add:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   PORT=10000
   NODE_ENV=production
   ```

5. **Firebase Service Account**:
   
   **Option A: Using JSON File**
   - Upload `serviceAccountKey.json` to Render
   - Or paste entire JSON as environment variable:
   ```
   FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
   ```
   
   **Option B: Using Individual Variables** (Recommended):
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_CLIENT_ID=123456789
   FIREBASE_PRIVATE_KEY_ID=key_id_here
   FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
   ```

6. **Deploy**:
   - Click **Create Web Service**
   - Render will build and deploy automatically
   - Note your service URL (e.g., `https://enigma-backend.onrender.com`)

---

## 🔐 Environment Variables

### Frontend Environment Variables

**For Netlify/Vercel** (if using build-time variables):

Create `.env.production`:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_BACKEND_URL=https://your-backend.onrender.com
```

**Note**: For static sites, update values directly in `js/firebaseConfig.js` and `js/registration.js`.

### Backend Environment Variables (Render.com)

| Variable | Description | Example |
|----------|-------------|---------|
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | `rzp_test_xxxxxxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret | `your_secret_key` |
| `PORT` | Server port | `10000` (Render default) |
| `NODE_ENV` | Environment | `production` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `your-project-id` |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | `-----BEGIN PRIVATE KEY-----\n...` |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | `firebase-adminsdk@...` |

---

## 🌐 CORS Configuration

### Update Backend CORS

Edit `backend/server.js`:

```javascript
import cors from 'cors';

// Update CORS to allow your frontend domains
app.use(cors({
    origin: [
        'https://your-site.netlify.app',        // Netlify
        'https://your-site.vercel.app',         // Vercel
        'https://your-custom-domain.com',       // Custom domain
        'http://localhost:5500',                 // Local development
        'http://localhost:8000'                 // Local development
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**After deployment**, update with your actual frontend URLs.

---

## 🧪 Testing

### 1. Test Frontend

1. **Visit your deployed frontend URL**
2. **Check Console**:
   - Open browser DevTools
   - Verify Firebase initializes: `✅ Firebase initialized`
   - Check for any errors

3. **Test Registration Form**:
   - Fill all fields
   - Upload ID card (should upload to Firebase Storage)
   - Verify file upload completes

### 2. Test Backend

1. **Health Check**:
   ```bash
   curl https://your-backend.onrender.com/
   ```
   Should return: `{"status":"success","message":"ENIGMA XIII Registration API is running"}`

2. **Test Create Order**:
   ```bash
   curl -X POST https://your-backend.onrender.com/create-order \
     -H "Content-Type: application/json" \
     -d '{"amount": 300, "currency": "INR"}'
   ```
   Should return order details with `order_id`.

### 3. Test Razorpay Payment (Test Mode)

1. **Use Razorpay Test Credentials**:
   - Get test keys from [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Use test mode for development

2. **Test Payment Flow**:
   - Fill registration form
   - Click Submit
   - Razorpay checkout should open
   - Use test card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - Name: Any name

3. **Test UPI**:
   - Select UPI option in Razorpay checkout
   - Use test UPI: `success@razorpay` (always succeeds)
   - Or: `failure@razorpay` (always fails)

4. **Verify Payment**:
   - After successful payment, check:
     - Redirects to success page
     - Payment ID displayed
     - Data saved in Firestore

### 4. Test Firestore

1. **Check Firestore Console**:
   - Go to Firebase Console → Firestore Database
   - Verify `registrations` collection has new documents
   - Check that `payment_status = "paid"`

2. **Verify Data Structure**:
   ```javascript
   {
     name: "John Doe",
     email: "john@example.com",
     amount: 300,
     idUrl: "https://firebasestorage.googleapis.com/...",
     payment_id: "pay_xxxxx",
     order_id: "order_xxxxx",
     payment_status: "paid",
     createdAt: Timestamp
   }
   ```

---

## ✅ Post-Deployment Checklist

### Frontend
- [ ] Firebase config updated with production keys
- [ ] Backend API URL updated in `registration.js`
- [ ] All assets loading correctly
- [ ] Registration form functional
- [ ] ID card upload working
- [ ] Success page accessible

### Backend
- [ ] Environment variables set in Render
- [ ] CORS configured with frontend URLs
- [ ] Firebase service account configured
- [ ] Health check endpoint working
- [ ] `/create-order` endpoint working
- [ ] `/verify-payment` endpoint working
- [ ] Firestore writes successful

### Payment
- [ ] Razorpay test keys configured
- [ ] Test payment successful
- [ ] Payment verification working
- [ ] Success page redirect working

### Security
- [ ] Firestore security rules deployed
- [ ] Service account key secured (not in code)
- [ ] Razorpay keys secured (environment variables)
- [ ] CORS restricted to frontend domains only

### Monitoring
- [ ] Backend logs accessible in Render
- [ ] Error tracking set up (optional)
- [ ] Firebase console monitoring enabled

---

## 🔄 Updating Deployment

### Frontend Updates

**Netlify**:
- Push to connected Git repo (auto-deploys)
- Or: `netlify deploy --prod`

**Vercel**:
- Push to connected Git repo (auto-deploys)
- Or: `vercel --prod`

### Backend Updates

**Render**:
- Push to connected Git repo (auto-deploys)
- Or: Manual redeploy from dashboard
- Environment variables persist across deployments

---

## 🐛 Troubleshooting

### Frontend Issues

**Firebase not initializing**:
- Check Firebase config values
- Verify API key is correct
- Check browser console for errors

**Backend API calls failing**:
- Verify `API_BASE_URL` is correct
- Check CORS configuration
- Verify backend is running

### Backend Issues

**Service won't start**:
- Check Render logs
- Verify all environment variables are set
- Check `package.json` scripts

**Firestore connection failing**:
- Verify service account JSON is correct
- Check Firebase project ID matches
- Review backend logs for errors

**CORS errors**:
- Add frontend URL to CORS origin list
- Verify frontend URL is exact match
- Check credentials setting

### Payment Issues

**Razorpay checkout not opening**:
- Verify Razorpay script is loaded
- Check `key_id` from backend response
- Check browser console for errors

**Payment verification failing**:
- Verify Razorpay keys are correct
- Check backend logs for signature errors
- Ensure using test keys in test mode

---

## 📞 Support

For deployment issues:
- **Netlify**: [Netlify Support](https://www.netlify.com/support/)
- **Vercel**: [Vercel Support](https://vercel.com/support)
- **Render**: [Render Support](https://render.com/docs)
- **Razorpay**: [Razorpay Support](https://razorpay.com/support/)

---

## 🔗 Quick Links

- [Netlify Dashboard](https://app.netlify.com/)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Render Dashboard](https://dashboard.render.com/)
- [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [Firebase Console](https://console.firebase.google.com/)

---

**Last Updated**: 2025
**Version**: 1.0.0


