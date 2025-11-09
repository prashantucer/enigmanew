# Firestore Security Rules - Production Mode

## Overview

These security rules ensure that:
- Only the backend service account can write/update payment_status = "paid"
- Users can only read their own registration records (matched by email)
- All delete operations are denied
- All other collections are denied by default

## Important Notes

⚠️ **Service Account Bypass**: Firebase Admin SDK (service account) requests bypass security rules by default. The rules here add an extra layer of validation, but the primary security is that only your backend has the service account credentials.

## Rule Structure

### 1. Read Access
```javascript
allow read: if request.auth != null && 
               request.auth.token.email == resource.data.email;
```

**Requires Firebase Authentication**. Users must be authenticated and can only read records where their email matches the document's email field.

**Alternative (without Auth)**: If you're not using Firebase Auth, you can use a less secure approach:
```javascript
allow read: if request.query.email == resource.data.email;
```

### 2. Write Access (Create)
```javascript
allow create: if isValidRegistrationData(request.resource.data);
```

Validates that:
- All required fields are present
- Data types are correct
- Payment status can only be "paid" if coming from service account (no auth)

### 3. Update Access
```javascript
allow update: if isValidUpdateData(request.resource.data, resource.data);
```

Only allows:
- Updates from service account (no auth)
- Changing payment_status to "paid"
- Cannot change payment_id, order_id, or email

### 4. Delete Access
```javascript
allow delete: if false;
```

**All deletes are denied** - no exceptions.

## Setup Instructions

### Option 1: Using Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules** tab
4. Copy and paste the rules from `firestore.rules` file
5. Click **Publish**

### Option 2: Using Firebase CLI

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (if not already):
   ```bash
   firebase init firestore
   ```

4. Deploy rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Quick Copy-Paste Version

For immediate use in Firebase Console, copy the content from `FIREBASE_CONSOLE_PASTE.txt` and paste it directly into the Rules editor.

## JSON Format (For Programmatic Deployment)

If you need to deploy rules programmatically, use the content from `firestore.rules.production.json`.

**Note**: Firebase Console uses the `.rules` format, not JSON. Use the `.txt` file for manual paste.

## Testing Rules

### Test Read Access
```javascript
// Should work if authenticated user's email matches
db.collection('registrations')
  .where('email', '==', userEmail)
  .get();

// Should fail - different email
db.collection('registrations')
  .where('email', '==', 'other@email.com')
  .get();
```

### Test Write Access
```javascript
// Should work from backend (service account)
// Should fail from frontend (client SDK)
db.collection('registrations').add({
  name: 'Test',
  email: 'test@example.com',
  payment_status: 'paid'
});
```

### Test Delete Access
```javascript
// Should always fail
db.collection('registrations').doc('docId').delete();
```

## Security Best Practices

1. **Service Account Security**:
   - Never expose service account key in frontend
   - Store service account key securely (environment variables, secret management)
   - Rotate keys regularly

2. **Email Verification**:
   - Consider adding email verification before allowing read access
   - Use Firebase Auth email verification

3. **Rate Limiting**:
   - Implement rate limiting in your backend
   - Monitor for suspicious activity

4. **Data Validation**:
   - Always validate data on backend before writing to Firestore
   - Use TypeScript or schema validation

5. **Monitoring**:
   - Enable Firestore audit logs
   - Monitor failed rule evaluations
   - Set up alerts for unauthorized access attempts

## Alternative: Email-Based Read Without Auth

If you're not using Firebase Authentication, you can use this less secure approach:

```javascript
match /registrations/{registrationId} {
  // Allow read if email query parameter matches document email
  allow read: if request.query.email == resource.data.email;
  
  // Rest of rules...
}
```

**Warning**: This is less secure as anyone with an email can query for that email's records. Use Firebase Auth for better security.

## Production Checklist

- [ ] Rules deployed to production
- [ ] Service account key secured
- [ ] Firebase Auth enabled (if using email-based read)
- [ ] Rules tested in Firebase Console Rules Playground
- [ ] Monitoring and alerts configured
- [ ] Backup rules stored securely
- [ ] Team members aware of rule changes

## Troubleshooting

### "Permission denied" errors

1. Check if user is authenticated (for read access)
2. Verify email matches document email
3. Ensure backend is using service account (not client SDK)
4. Check Firestore logs for detailed error messages

### Service account writes failing

- Service account should bypass rules, but if using client SDK with service account key, it won't work
- Always use Firebase Admin SDK on backend
- Never use service account key in frontend code

## Support

For issues or questions:
- Check [Firebase Documentation](https://firebase.google.com/docs/firestore/security/get-started)
- Review [Firestore Security Rules Reference](https://firebase.google.com/docs/reference/rules/rules.firestore)
- Test rules in [Firebase Console Rules Playground](https://console.firebase.google.com/project/_/firestore/rules)

