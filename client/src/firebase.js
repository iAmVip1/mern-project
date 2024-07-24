// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "college-project-7295c.firebaseapp.com",
  projectId: "college-project-7295c",
  storageBucket: "college-project-7295c.appspot.com",
  messagingSenderId: "483824254644",
  appId: "1:483824254644:web:39fea519425048ede561e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);