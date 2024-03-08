// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
