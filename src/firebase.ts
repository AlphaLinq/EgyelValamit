// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7BJn3M7TMRNXxC06J2ZtXURfwiKoaZ58",
  authDomain: "egyelvalamit-fdc71.firebaseapp.com",
  projectId: "egyelvalamit-fdc71",
  storageBucket: "egyelvalamit-fdc71.firebasestorage.app",
  messagingSenderId: "89935639849",
  appId: "1:89935639849:web:f26578bd941d7e1482f338",
  measurementId: "G-DSR0VW86SK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {db};