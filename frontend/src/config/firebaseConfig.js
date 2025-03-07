import { initializeApp } from "firebase/app";

const firebaseConfig = {
    // apiKey: import.meta.env.VITE_API_KEY,
    // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    // projectId: import.meta.env.VITE_PROJECT_ID,
    // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    // appId: import.meta.env.VITE_APP_ID
    apiKey: "AIzaSyDnxQVkHO09OuOP6Y14bt9aYTniCXyOo6Q",
    authDomain: "fyp-amk.firebaseapp.com",
    projectId: "fyp-amk",
    storageBucket: "fyp-amk.firebasestorage.app",
    messagingSenderId: "650614997115",
    appId: "1:650614997115:web:0cbfe9f218314361e6a2de",
    measurementId: "G-SLJ54MYN2N"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;