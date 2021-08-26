/* This file contains the codes required for access to the firebase database of the project
    , it also contains code for iitializing the application*/

// to get access to the database we would need the admin SDK
const admin = require("firebase-admin");

// set environment project id
const project = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

/*Your Firebase service account can be used to authenticate 
multiple Firebase features, such as Database, Storage and
 Auth, programmatically via the unified Admin SDK */
var serviceAccount =
  project === "gistoracle-28360"
    ? require("../../utils/firebase/firebaseServiceAccount/gistoracle-28360-firebase-adminsdk-ewftv-9107d0cc69.json")
    : require("../../utils/firebase/firebaseServiceAccount/gistoracle-dev-firebase-adminsdk-4qg56-ce04c6150b.json");

// intializing the application to use the admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

// instantiate the firebase store
const db = admin.firestore();

module.exports = { admin, db };
