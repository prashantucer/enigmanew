# 🚀 Quick Deployment Guide

## Frontend (Netlify) - 5 Minutes

1. **Update Config Files**:
   - `js/firebaseConfig.js` - Add Firebase credentials
   - `js/registration.js` - Update `API_BASE_URL` to your backend URL

2. **Deploy**:
   - Go to [Netlify](https://app.netlify.com/)
   - Drag & drop project folder (excluding `backend/`)
   - Done! ✅

## Backend (Render.com) - 10 Minutes

1. **Prepare**:
   - Ensure `backend/` folder has all files
   - `package.json` exists with correct scripts

2. **Deploy**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - New → Web Service
   - Connect Git repo OR upload `backend/` folder
   - Build: `npm install`
   - Start: `npm start`

3. **Set Environment Variables**:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
   PORT=10000
   NODE_ENV=production
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
   ```

4. **Update CORS**:
   - Edit `backend/server.js`
   - Add your Netlify URL to `allowedOrigins` array

5. **Deploy** ✅

## Test Payment

1. Use Razorpay test mode
2. Test card: `4111 1111 1111 1111`
3. Test UPI: `success@razorpay`

## Done! 🎉

See `DEPLOYMENT_GUIDE.md` for detailed instructions.


