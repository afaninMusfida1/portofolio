import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC86yNmRkwvVo2qLYpbbn29QRHpA7zUx-k",
  authDomain: "todolist-a9b25.firebaseapp.com",
  projectId: "todolist-a9b25",
  storageBucket: "todolist-a9b25.firebasestorage.app",
  messagingSenderId: "914559115987",
  appId: "1:914559115987:web:0b299f6b34586612682a26",
  measurementId: "G-5YM0BNEFP0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);