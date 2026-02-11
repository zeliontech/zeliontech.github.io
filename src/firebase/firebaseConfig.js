import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (conditionally)
let analytics = null;

export const initAnalytics = async () => {
  // Only run in browser
  if (typeof window === "undefined") return null;

  try {
    // Check if analytics is supported
    const supported = await isSupported();
    if (!supported) {
      if (import.meta.env.DEV) {
        console.log("[Analytics] Not supported in this environment");
      }
      return null;
    }

    // Initialize analytics
    analytics = getAnalytics(app);
    
    if (import.meta.env.DEV) {
      console.log("[Analytics] Initialized successfully");
    }
    
    return analytics;
  } catch (error) {
    console.error("[Analytics] Initialization failed:", error);
    return null;
  }
};

export { app, db, analytics };
