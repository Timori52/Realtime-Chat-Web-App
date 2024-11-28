import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBt5Qc6zhJ88YwrcMjJKrsXwnFgWOsg-Ro",
  authDomain: "my-chat-app-505c8.firebaseapp.com",
  projectId: "my-chat-app-505c8",
  storageBucket: "my-chat-app-505c8.firebasestorage.app",
  messagingSenderId: "122386391494",
  appId: "1:122386391494:web:1c0e4f38e3310943db12c7",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);