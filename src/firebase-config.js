// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKDDxSbkXJ_4B8DVndy91_uLNc_tvThkU",
  authDomain: "chatroom-43b21.firebaseapp.com",
  projectId: "chatroom-43b21",
  storageBucket: "chatroom-43b21.appspot.com",
  messagingSenderId: "873735425757",
  appId: "1:873735425757:web:99772f835c707d6b609534"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);