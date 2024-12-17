import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBYsnMdSfwvNdI2oRlccmHKhrSGZiUSNHg",
    authDomain: "moon-cycle-65356.firebaseapp.com",
    projectId: "moon-cycle-65356",
    storageBucket: "moon-cycle-65356.firebasestorage.app",
    messagingSenderId: "801965952285",
    appId: "1:801965952285:web:6ec2f5585ef7bf2e0c65f4",
    measurementId: "G-JN7BNZN3NT"
  };

/// Inisialisasi Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inisialisasi auth Firebase menggunakan firebaseApp
const auth = getAuth(firebaseApp);

// Ekspor auth dan fungsi createUserWithEmailAndPassword
export { auth, createUserWithEmailAndPassword };
export default firebaseApp;

