import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIpzTCQicCNkHYVgA6GHyJuGY0xplOR2k",
    authDomain: "training-6b090.firebaseapp.com",
    projectId: "training-6b090",
    storageBucket: "training-6b090.appspot.com",
    messagingSenderId: "241194150617",
    appId: "1:241194150617:web:0a5a3c2e68bc2191f2ecc8",
    measurementId: "G-W2FBSXSCQ7"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app); // Specify that db is of type Firestore

export { db, app };

