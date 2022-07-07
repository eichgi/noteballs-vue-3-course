// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCym_9b5_Ua2L0LCBCNzAeYTlmjG9Tjde0',
  authDomain: 'noteballs-6b195.firebaseapp.com',
  projectId: 'noteballs-6b195',
  storageBucket: 'noteballs-6b195.appspot.com',
  messagingSenderId: '825430964177',
  appId: '1:825430964177:web:57191d05cac72b9beed2f0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db
}
