# ✅ Database Fields Verification

## 📊 Complete List of Fields Stored in Database

### ✅ Personal Information
1. **name** - Student Name
2. **email** - Email ID
3. **studIdNo** - Student ID Number
4. **groupName** - Group Name (optional)

### ✅ College & Identity
5. **college** - College Selection (UCER/UIM/UPT/Other)
6. **customCollege** - Custom College Name (when "Other" is selected)
7. **aadhaarNo** - Aadhaar Number

### ✅ Academic Details
8. **course** - Course
9. **branch** - Branch
10. **year** - Year (1st/2nd/3rd/4th/Post Graduate)

### ✅ Contact Information
11. **contactNumber** - Contact Number

### ✅ Event Selection
12. **event1** - Event 1 (Required)
13. **event2** - Event 2 (Required)

### ✅ Payment Information
14. **amount** - Amount Paid (₹300)
15. **payment_id** - Razorpay Payment ID
16. **order_id** - Razorpay Order ID
17. **payment_status** - Payment Status ("paid")
18. **createdAt** - Registration Date & Time

---

## 🔍 Where Data is Stored

### 1. **Backend Database (Firestore)**
**File:** `backend/server.js`
**Collection:** `registrations`
**Location:** Firebase Firestore

**All fields are saved via:**
```javascript
const registrationDoc = {
    name, email, amount,
    payment_id, order_id, payment_status, createdAt,
    studIdNo, groupName, college, customCollege,
    aadhaarNo, course, branch, year,
    contactNumber, event1, event2
};
```

### 2. **Frontend Database (Firestore)**
**File:** `js/registration.js`
**Collection:** `registrations`
**Location:** Firebase Firestore (client-side save as backup)

**All fields are saved via:**
```javascript
const allFormData = {
    name, email, amount,
    payment_id, order_id, payment_status, createdAt,
    studIdNo, groupName, college, customCollege,
    aadhaarNo, course, branch, year,
    contactNumber, event1, event2
};
```

---

## ✅ Verification Checklist

### Backend (`backend/server.js`)
- ✅ Receives all fields from frontend
- ✅ Saves to Firestore with all fields
- ✅ Includes customCollege field
- ✅ Includes all form fields

### Frontend (`js/registration.js`)
- ✅ Collects all form fields
- ✅ Sends all fields to backend
- ✅ Saves to Firestore (backup)
- ✅ Stores in sessionStorage for success page

### Database Structure
```
Firestore Collection: registrations
├── Document ID (auto-generated)
├── name: string
├── email: string
├── studIdNo: string
├── groupName: string
├── college: string
├── customCollege: string
├── aadhaarNo: string
├── course: string
├── branch: string
├── year: string
├── contactNumber: string
├── event1: string
├── event2: string
├── amount: number
├── payment_id: string
├── order_id: string
├── payment_status: string
└── createdAt: timestamp
```

---

## 🧪 Testing

### To Verify Data is Stored:

1. **Submit a test registration**
2. **Check Firebase Console:**
   - Go to Firebase Console
   - Firestore Database → `registrations` collection
   - Open latest document
   - Verify all 18 fields are present

3. **Check Backend Logs:**
   - Render.com logs should show:
   - `✅ Registration saved to Firestore: {document_id}`

4. **Check Frontend Console:**
   - Browser console should show:
   - `✅ Registration saved to Firestore: {document_id}`

---

## 📝 Notes

- **All fields are required** except:
  - `groupName` (optional)
  - `customCollege` (only when college = "Other")

- **Data is saved in TWO places:**
  1. Backend Firestore (primary)
  2. Frontend Firestore (backup)

- **Both saves happen automatically** after payment verification

---

## ✅ Confirmation

**YES, ALL 18 FIELDS ARE STORED IN DATABASE!**

Every field from the registration form is:
- ✅ Collected from form
- ✅ Sent to backend
- ✅ Saved to Firestore database
- ✅ Available for retrieval and display

