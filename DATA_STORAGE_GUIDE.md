# 📊 Form Data Storage Guide

## ✅ Where Data is Stored

Form submit करने पर data **2 जगह** store होता है:

---

## 1️⃣ Firebase Firestore (Main Storage) ✅

### Location:
- **Database**: Firebase Firestore
- **Collection**: `registrations`
- **Project**: `enigmaregistration`

### Data Structure:
```javascript
{
  // Payment Details
  payment_id: "pay_xxxxx",
  order_id: "order_xxxxx",
  payment_status: "paid",
  amount: 300,
  
  // User Details
  name: "Student Name",
  email: "student@example.com",
  contactNumber: "9876543210",
  
  // Academic Details
  studIdNo: "12345",
  groupName: "Group Name",
  college: "College Name",
  aadhaarNo: "123456789012",
  course: "B.Tech",
  branch: "CSE",
  year: "3rd Year",
  
  // Event Details
  event1: "dance",
  event2: "singing",
  
  // ID Card
  idUrl: "https://firebasestorage.googleapis.com/...", // या null अगर upload नहीं किया
  
  // Timestamp
  createdAt: Timestamp
}
```

---

## 2️⃣ Firebase Storage (ID Card Images) 📸

### Location:
- **Storage**: Firebase Storage
- **Path**: `id_cards/{email}_{timestamp}.jpg`
- **Project**: `enigmaregistration`

### Example:
```
id_cards/test_example_com_1704067200000.jpg
```

---

## 🔄 Data Flow

### Step 1: Form Submit
```
User fills form → Clicks Submit
```

### Step 2: Payment Processing
```
Frontend → Backend (/create-order)
Backend → Razorpay (Order created)
Razorpay → User (Payment modal)
```

### Step 3: Payment Success
```
User completes payment
Razorpay → Frontend (Payment success)
Frontend → Backend (/verify-payment)
```

### Step 4: Data Storage
```
Backend verifies payment
Backend saves to Firestore (registrations collection)
Backend saves ID card URL (if uploaded)
Frontend also saves to Firestore (backup)
```

---

## 📍 How to View Stored Data

### Method 1: Firebase Console
1. Go to: https://console.firebase.google.com/
2. Select project: `enigmaregistration`
3. Go to **Firestore Database**
4. Open collection: `registrations`
5. View all documents

### Method 2: Firebase Storage
1. Go to Firebase Console
2. Go to **Storage**
3. Open folder: `id_cards`
4. View uploaded ID card images

---

## 🔐 Data Security

### Firestore Security Rules:
- ✅ Only backend (service account) can write
- ✅ Users can read only their own data (by email)
- ❌ No deletes allowed
- ✅ Payment status can only be "paid" from backend

### Storage Security Rules:
- ✅ Users can upload to `id_cards/` folder
- ✅ Files are public (downloadable via URL)
- ✅ File size limit: 1MB
- ✅ Allowed types: JPG, JPEG, PNG

---

## 📋 What Data is Saved

### Always Saved:
- ✅ Name
- ✅ Email
- ✅ Contact Number
- ✅ Payment ID
- ✅ Order ID
- ✅ Amount
- ✅ Payment Status
- ✅ Events Selected
- ✅ Timestamp

### Conditionally Saved:
- ⚠️ ID Card URL (only if uploaded)
- ⚠️ Other form fields (if filled)

---

## 🎯 Example Document

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "contactNumber": "9876543210",
  "payment_id": "pay_ABC123XYZ",
  "order_id": "order_XYZ789ABC",
  "payment_status": "paid",
  "amount": 300,
  "event1": "dance",
  "event2": "singing",
  "idUrl": "https://firebasestorage.googleapis.com/...",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## ✅ Summary

**Data Storage:**
1. **Firestore** → All registration data
2. **Storage** → ID card images (if uploaded)

**Access:**
- Firebase Console → View all data
- Backend can read/write
- Users can read their own data

**Security:**
- Backend writes only after payment verification
- Payment status must be "paid"
- No deletes allowed

---

**Status**: Data Firebase में safely store हो रहा है! 🚀

