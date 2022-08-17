// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore, connectFirestoreEmulator, initializeFirestore} from "firebase/firestore";
import {getAuth, connectAuthEmulator} from "firebase/auth";

let firebaseConfig;
if (import.meta.env.VITE_APP_MODE === 'local') {
  firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  };
} else {
  firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {ignoreUndefinedProperties: true});
const db = getFirestore(app);
const auth = getAuth();

if (import.meta.env.VITE_APP_MODE === 'local') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export {
  db,
  auth,
};