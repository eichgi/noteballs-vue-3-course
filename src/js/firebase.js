// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore, connectFirestoreEmulator, initializeFirestore} from "firebase/firestore";
import {getAuth, connectAuthEmulator} from "firebase/auth";
import {getStorage} from 'firebase/storage';

//console.log("ENV: ", import.meta.env);

let firebaseConfig;
if (import.meta.env.VITE_APP_MODE === 'local') {
  firebaseConfig = {
    apiKey: 'AIzaSyCym_9b5_Ua2L0LCBCNzAeYTlmjG9Tjde0',
    projectId: 'cloud-functions-7714b',
  };
} else {
  firebaseConfig = {
    apiKey: 'AIzaSyCym_9b5_Ua2L0LCBCNzAeYTlmjG9Tjde0',
    authDomain: 'noteballs-6b195.firebaseapp.com',
    projectId: 'noteballs-6b195',
    storageBucket: 'noteballs-6b195.appspot.com',
    messagingSenderId: '825430964177',
    appId: '1:825430964177:web:57191d05cac72b9beed2f0'
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