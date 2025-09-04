// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP5NknEVtmoVVnOSWPbRsRlUpx-t63cTQ",
  authDomain: "course-management-efd48.firebaseapp.com",
  databaseURL: "https://course-management-efd48-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "course-management-efd48",
  storageBucket: "course-management-efd48.firebasestorage.app",
  messagingSenderId: "65494531510",
  appId: "1:65494531510:web:df1836d7c5bb0bced09517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
