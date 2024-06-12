import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tech-world-1c9fb.firebaseapp.com",
  projectId: "tech-world-1c9fb",
  storageBucket: "tech-world-1c9fb.appspot.com",
  messagingSenderId: "949853832988",
  appId: "1:949853832988:web:98542542623318e07f1cd9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
