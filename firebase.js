import firebase from "firebase";

import firebase from "firebase";

const firebaseConfig = {
  apiKey:
    process.env.NODE_ENV === "production"
      ? process.env.FIREBASE_API_KEY
      : process.env.FIREBASE_DEV_API_KEY,
  authDomain:
    process.env.NODE_ENV === "production"
      ? process.env.FIREBASE_AUTH_DOMAIN
      : process.env.FIREBASE_DEV_AUTH_DOMAIN,
  projectId:
    process.env.NODE_ENV === "production"
      ? process.env.FIREBASE_PROJECT_ID
      : process.env.FIREBASE_DEV_PROJECT_ID,
  storageBucket:
    process.env.NODE_ENV === "production"
      ? process.env.FIREBASE_STORAGE_BUCKET
      : process.env.FIREBASE_DEV_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NODE_ENV === "production"
      ? process.env.FIREBASE_MESSAGING_SENDER_ID
      : process.env.FIREBASE_DEV_MESSAGING_SENDER_ID,
  appId:
    process.env.NODE_ENV === "production"
      ? process.env.FIREBASE_APP_ID
      : process.env.FIREBASE_DEV_APP_ID
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
