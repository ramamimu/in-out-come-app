// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyT2EC0FWJi8AIaiZUuuP2Bm0IkNnEkOg",
  authDomain: "fp-kelompok3.firebaseapp.com",
  projectId: "fp-kelompok3",
  storageBucket: "fp-kelompok3.appspot.com",
  messagingSenderId: "149193814070",
  appId: "1:149193814070:web:1ce58e060c04590aa3e897",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
