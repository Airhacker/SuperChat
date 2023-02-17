import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_Hl_6ATiZ8aCq0QgWyAc0J9L3Q73aQSM",
  authDomain: "superchat-eb6a9.firebaseapp.com",
  projectId: "superchat-eb6a9",
  storageBucket: "superchat-eb6a9.appspot.com",
  messagingSenderId: "604528816023",
  appId: "1:604528816023:web:6f8013889ae138ac885ed2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
