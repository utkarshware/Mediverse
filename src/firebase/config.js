import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPYyTp-6HNPN9e3096y3AFK000Q6HCgUo",
  authDomain: "mediverse-e3066.firebaseapp.com",
  projectId: "mediverse-e3066",
  storageBucket: "mediverse-e3066.firebasestorage.app",
  messagingSenderId: "885013758300",
  appId: "1:885013758300:web:a78c92c2a21487eef74199",
  measurementId: "G-0KF5L7QF4C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set persistence to LOCAL for "remember me" functionality
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting auth persistence:", error);
});

// Initialize Firestore database
export const db = getFirestore(app);

// Google Auth Provider with additional scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export default app;
