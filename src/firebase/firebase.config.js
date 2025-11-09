// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCChTqDxHluGRDGISZPRz_OuNY2PeOnsAY",
  authDomain: "eco-track-authentication.firebaseapp.com",
  projectId: "eco-track-authentication",
  storageBucket: "eco-track-authentication.firebasestorage.app",
  messagingSenderId: "591676427603",
  appId: "1:591676427603:web:dc15d8209266f42cd125a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };