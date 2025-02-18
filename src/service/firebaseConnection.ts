// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX1Lr6O_KemVdxKFCFy7DlEwLi7hT5yPk",
  authDomain: "pi-v1-7d49f.firebaseapp.com",
  projectId: "pi-v1-7d49f",
  storageBucket: "pi-v1-7d49f.firebasestorage.app",
  messagingSenderId: "777456009819",
  appId: "1:777456009819:web:d3577693f9e90fe5d6b57e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };