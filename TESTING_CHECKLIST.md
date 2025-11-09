# ✅ Testing Checklist - Live Server

## 🎯 Current Status

- ✅ Page opened on Live Server
- ✅ URL: `http://127.0.0.1:5500/registration.html` (or similar)

---

## 🔍 Step 1: Check Browser Console (F12)

### Expected Messages:
- ✅ `✅ Firebase initialized`
- ✅ `✅ Firebase Storage: Available`
- ✅ `✅ Firebase Storage functions: Available`
- ✅ `🚀 Starting registration form initialization...`
- ✅ `✅ Form elements found`
- ✅ `📋 Populating event dropdowns...`
- ✅ `✅ Added 21 events to dropdowns`
- ✅ `✅ Registration form initialized`

### If Errors:
- ❌ Red errors दिख रहे हैं → Screenshot लें या error message बताएं

---

## 🧪 Step 2: Test Event Dropdowns

1. **Event 1 dropdown check करें:**
   - Click करें
   - सभी 21 events दिखने चाहिए:
     - Open Mic
     - KBC Quiz
     - Dramatics
     - Chess
     - Dance
     - Singing
     - etc.

2. **Event 2 dropdown check करें:**
   - Click करें
   - सभी events दिखने चाहिए

**Status**: Events दिख रहे हैं? ✅ / ❌

---

## 📤 Step 3: Test ID Card Upload

1. **File Select करें:**
   - "Select File" button click करें
   - JPG/PNG file choose करें (< 1MB)

2. **Check Console:**
   - `📤 Starting file upload...` दिखना चाहिए
   - `✅ Using Firebase Storage functions from window` दिखना चाहिए
   - `📤 Uploading file to: id_cards/...` दिखना चाहिए
   - `✅ ID card uploaded successfully: [URL]` दिखना चाहिए

3. **Check UI:**
   - File name के साथ ✓ दिखना चाहिए
   - "Uploading..." message दिखना चाहिए, फिर file name

**Status**: Upload हो रहा है? ✅ / ❌

---

## 📝 Step 4: Test Form Submission

1. **Form Fill करें:**
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - All required fields
   - Event 1: Select any event
   - ID card: Upload करें
   - Terms & Rules: Check करें

2. **Submit Button Click करें**

3. **Check Console:**
   - `📝 Form submitted` दिखना चाहिए
   - `✅ Form validation passed` दिखना चाहिए
   - `🔄 Creating Razorpay order...` दिखना चाहिए
   - `✅ Order created:` दिखना चाहिए

4. **Razorpay Checkout:**
   - Razorpay payment modal open होना चाहिए

**Status**: Submit काम कर रहा है? ✅ / ❌

---

## 🐛 Common Issues & Fixes

### Issue 1: Events नहीं दिख रहे
**Check:**
- Console में `✅ Added 21 events to dropdowns` दिख रहा है?
- Console में कोई errors हैं?

### Issue 2: ID Card Upload नहीं हो रहा
**Check:**
- Console में `✅ Firebase Storage: Available` दिख रहा है?
- File size < 1MB है?
- File type JPG/PNG है?

### Issue 3: Submit पर कुछ नहीं हो रहा
**Check:**
- Console में `📝 Form submitted` दिख रहा है?
- Backend running है? (`http://localhost:5000`)
- Console में कोई errors हैं?

---

## ✅ Success Indicators

### Everything Working:
- ✅ Events dropdown में सभी events दिख रहे हैं
- ✅ ID card upload हो रहा है
- ✅ Form submit करने पर Razorpay checkout open हो रहा है
- ✅ Console में कोई red errors नहीं हैं

---

## 📋 Report Back

Please tell me:
1. Events दिख रहे हैं? ✅ / ❌
2. ID card upload हो रहा है? ✅ / ❌
3. Submit button काम कर रहा है? ✅ / ❌
4. Console में कोई errors हैं? (F12 → Console tab)

---

**Status**: Testing in progress... 🧪

