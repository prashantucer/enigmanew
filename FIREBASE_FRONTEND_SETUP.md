# Firebase Frontend Setup Guide

## Option 1: Using ES Modules (Recommended for Build Tools)

If you're using a build tool (Vite, Webpack, Parcel, etc.):

1. **Install Firebase:**
   ```bash
   npm install firebase
   ```

2. **Use the config file:**
   ```javascript
   import { db, storage } from './js/firebaseConfig.js';
   ```

3. **Update `js/firebaseConfig.js`** with your Firebase project credentials:
   - Go to Firebase Console → Project Settings → General
   - Scroll down to "Your apps" section
   - Copy the config values

## Option 2: Using CDN (For Static HTML Sites)

If you're serving static HTML files:

1. **Add Firebase CDN to your HTML** (in `index.html` or `registration.html`):
   ```html
   <script type="module">
     import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
     import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
     import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
     
     const firebaseConfig = {
       apiKey: "your-api-key-here",
       authDomain: "your-project-id.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project-id.appspot.com",
       messagingSenderId: "your-messaging-sender-id",
       appId: "your-app-id"
     };
     
     const app = initializeApp(firebaseConfig);
     const db = getFirestore(app);
     const storage = getStorage(app);
     
     // Make available globally
     window.firebaseDb = db;
     window.firebaseStorage = storage;
   </script>
   ```

2. **Use in your scripts:**
   ```javascript
   // Access via window object
   const db = window.firebaseDb;
   const storage = window.firebaseStorage;
   ```

## Getting Firebase Config

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ → **Project Settings**
4. Scroll down to **Your apps** section
5. If you don't have a web app, click **Add app** → **Web** (</> icon)
6. Copy the config values

## Example Usage

### Reading from Firestore:
```javascript
import { collection, getDocs } from 'firebase/firestore';
import { db } from './js/firebaseConfig.js';

async function getRegistrations() {
  const querySnapshot = await getDocs(collection(db, 'registrations'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}
```

### Uploading to Storage:
```javascript
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './js/firebaseConfig.js';

async function uploadFile(file) {
  const storageRef = ref(storage, `id-cards/${file.name}`);
  await uploadBytes(storageRef, file);
}
```

## Security Rules

Make sure to set up proper Firestore and Storage security rules in Firebase Console:

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{document=**} {
      allow read: if true; // Adjust based on your needs
      allow write: if false; // Only backend should write
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /id-cards/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 1048576; // 1MB limit
    }
  }
}
```

## Notes

- Keep your `apiKey` public (it's safe for client-side use)
- Never expose your Firebase Admin SDK keys (server-side only)
- Use environment variables for sensitive config in production
- The config file uses placeholders - replace with actual values



