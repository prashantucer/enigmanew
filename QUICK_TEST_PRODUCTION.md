# 🧪 Quick Production Test Guide

## 🚀 Test Your Deployed System

---

## Step 1: Open Registration Page

```
https://enigmaugi.netlify.app/registration.html
```

**Check:**
- ✅ Page loads without errors
- ✅ Browser console (F12) shows: `✅ Firebase initialized`
- ✅ Events dropdown populated

---

## Step 2: Fill Registration Form

**Required Fields:**
- Name
- Email
- Contact Number
- Student ID
- College
- Course
- Branch
- Year
- At least 1 Event

**Optional:**
- ID Card Upload

---

## Step 3: Submit & Test Payment

1. Click **Submit**
2. Razorpay checkout should open
3. Use **Test Card:**
   - Card: `4111 1111 1111 1111`
   - Expiry: `12/25`
   - CVV: `123`
   - OTP: `1234`
4. Complete payment

---

## Step 4: Verify Success

**Expected:**
- ✅ Redirects to success page
- ✅ Payment ID displayed
- ✅ Name & Email displayed
- ✅ Order ID displayed

---

## Step 5: Check Data Storage

**Firebase Console:**
1. Go to: https://console.firebase.google.com/
2. Project: `enigmaregistration`
3. Firestore Database → `registrations` collection
4. Verify new registration document

**Check Fields:**
- ✅ payment_id
- ✅ order_id
- ✅ payment_status: "paid"
- ✅ All form fields
- ✅ idUrl (if uploaded)

---

## ✅ Success Indicators

- ✅ Form submits successfully
- ✅ Payment completes
- ✅ Success page shows
- ✅ Data in Firestore
- ✅ No console errors

---

## 🚨 If Something Fails

### Check Browser Console (F12)
- Look for red errors
- Check Network tab for failed requests

### Check Render.com Logs
- Backend service → Logs tab
- Look for error messages

### Check Firebase Console
- Verify security rules
- Check Storage rules

---

## 🎯 Quick Test Summary

```
1. Open: https://enigmaugi.netlify.app/registration.html
2. Fill form
3. Submit
4. Pay with test card
5. Verify success page
6. Check Firestore
```

---

**Ready to test!** 🚀




