// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo-3dZgjcw0p5TABPwoy_-yX1E0Bc6j00",
  authDomain: "int305-assignment-092.firebaseapp.com",
  projectId: "int305-assignment-092",
  storageBucket: "int305-assignment-092.appspot.com",
  messagingSenderId: "298206586319",
  appId: "1:298206586319:web:170b429370e3970de11eba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export default db