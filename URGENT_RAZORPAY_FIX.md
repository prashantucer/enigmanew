# 🚨 URGENT: Razorpay Credentials Fix

## ❌ Current Error
```
Invalid Razorpay credentials
Failed to create order: 500
```

**Matlab:** Render.com par Razorpay credentials missing ya galat hain.

---

## ✅ Step-by-Step Fix (5 Minutes)

### Step 1: Render.com Dashboard Open Karein
1. https://dashboard.render.com/ par login karein
2. Apni **backend service** select karein (jo `enigmaugi.onrender.com` par deployed hai)

### Step 2: Environment Variables Check Karein
1. Left sidebar me **"Environment"** tab click karein
2. Check karein ki yeh 2 variables hain:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

**Agar nahi hain:**
- **"Add Environment Variable"** button click karein
- Neeche diye gaye steps follow karein

**Agar hain:**
- Values check karein (next step)

### Step 3: Razorpay Credentials Set Karein

#### A. Razorpay Key ID
1. **Variable Name:** `RAZORPAY_KEY_ID`
2. **Value:** `rzp_test_RdkBIbYhYwLVr7` (ya apna test key)
3. **Save** karein

#### B. Razorpay Secret Key (Important!)

**Secret Key kaise milega:**
1. **Razorpay Dashboard:** https://dashboard.razorpay.com/
2. Login karein
3. **Settings** (top right gear icon) → **API Keys**
4. **Test Mode** ya **Live Mode** select karein
5. **Key Secret** copy karein
   - ⚠️ **Important:** Yeh sirf ek baar dikhta hai!
   - Agar nahi dikh raha, **"Generate New Key"** click karein
   - New key generate hoga (purana key delete ho jayega)

**Render.com par add karein:**
1. **Variable Name:** `RAZORPAY_KEY_SECRET`
2. **Value:** Copy kiya hua secret key paste karein
3. **⚠️ Important:** 
   - Secret key me **spaces** nahi hone chahiye
   - **Beginning/end** me extra characters nahi hone chahiye
   - Complete key copy karein (usually 32+ characters)
4. **Save** karein

### Step 4: Service Restart (CRITICAL!)
1. Render Dashboard me apni service par
2. Top right me **"Restart"** button click karein
3. Ya **"Manual Deploy"** → **"Clear build cache & deploy"**
4. **2-3 minutes** wait karein (deployment complete hone tak)

### Step 5: Logs Verify Karein
1. Render Dashboard → **"Logs"** tab click karein
2. Latest logs me yeh dikhna chahiye:

**✅ SUCCESS (Sahi hai):**
```
✅ Razorpay initialized successfully
🔑 Razorpay Key ID: rzp_test_Rd...
🚀 ENIGMA XIII Registration API running on port 5000
🔑 Razorpay: ✅ Initialized
```

**❌ ERROR (Abhi bhi issue hai):**
```
❌ Failed to initialize Razorpay: ...
❌ Razorpay: ❌ Not configured
⚠️  Missing: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET
```

**Agar error dikhe:**
- Environment variables dobara check karein
- Secret key properly copy hua hai ya nahi
- Service restart karein

---

## 🔍 Verification Steps

### 1. Backend Health Check
Browser me open karein:
```
https://enigmaugi.onrender.com
```

**Expected:**
```json
{
  "status": "success",
  "message": "ENIGMA XIII Registration API is running",
  "version": "1.0.0"
}
```

### 2. Test Payment
1. Frontend: https://enigmaugii.netlify.app/registration
2. Form fill karein
3. Submit karein
4. **Razorpay popup aana chahiye** ✅

### 3. Browser Console Check
**F12** → **Console** me:
- ✅ `Creating Razorpay order...`
- ✅ `✅ Order created: order_xxxxx`
- ❌ **Agar abhi bhi error:** Render logs share karein

---

## 🚨 Common Mistakes

### Mistake 1: Secret Key Me Spaces
❌ **Wrong:** `rzp_test_abc def ghi`
✅ **Correct:** `rzp_test_abcdefghi`

### Mistake 2: Incomplete Key Copy
❌ **Wrong:** `rzp_test_abc...` (truncated)
✅ **Correct:** Complete key (32+ characters)

### Mistake 3: Test/Live Mode Mismatch
- Test Key ID → Test Secret Key
- Live Key ID → Live Secret Key
- **Mix mat karein!**

### Mistake 4: Service Restart Nahi Kiya
- Environment variables add karne ke **baad** service restart **zaroor** karein
- Bina restart ke changes apply nahi hote

---

## 📸 Screenshot Checklist

Agar abhi bhi issue hai, yeh screenshots share karein:

1. **Render.com Environment Variables:**
   - Variable names visible (values hide karke)
   - Total count of variables

2. **Render.com Logs:**
   - Latest startup logs
   - Razorpay initialization messages

3. **Razorpay Dashboard:**
   - API Keys page (sensitive data hide karke)
   - Test/Live mode indicator

---

## ✅ Expected Result

**After fix:**
- ✅ Render logs: `✅ Razorpay initialized successfully`
- ✅ Form submit: Razorpay popup opens
- ✅ Payment: Test payment successful
- ✅ No errors in console

---

## 🆘 Still Not Working?

**Agar abhi bhi issue hai:**
1. Render.com logs ka screenshot share karein
2. Environment variables list share karein (values hide karke)
3. Browser console error message share karein

**Quick Test:**
- Render logs me `✅ Razorpay initialized` dikh raha hai?
- Agar nahi → Environment variables check karein
- Agar haan → Razorpay API issue ho sakta hai

