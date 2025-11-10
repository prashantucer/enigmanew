# ✅ Quick Checklist - Razorpay Fix

## 🎯 3 Simple Steps

### ✅ Step 1: Render.com → Environment Variables
- [ ] `RAZORPAY_KEY_ID` = `rzp_test_RdkBIbYhYwLVr7` (ya apna key)
- [ ] `RAZORPAY_KEY_SECRET` = Razorpay Dashboard se copy kiya hua secret key

**Secret Key kaise milega:**
1. https://dashboard.razorpay.com/ → Settings → API Keys
2. Key Secret copy karein

### ✅ Step 2: Service Restart
- [ ] Render Dashboard → **Restart** button click karein
- [ ] 2-3 minutes wait karein

### ✅ Step 3: Logs Check
- [ ] Render Dashboard → **Logs** tab
- [ ] Check: `✅ Razorpay initialized successfully`

**Agar yeh dikhe:**
```
❌ Razorpay: ❌ Not configured
```
**Matlab:** Environment variables properly set nahi hain. Dobara check karein.

---

## 🧪 Test
1. Frontend: https://enigmaugii.netlify.app/registration
2. Form submit karein
3. Razorpay popup aana chahiye ✅

---

## ❌ Agar Abhi Bhi Error
Render.com logs ka screenshot share karein!

