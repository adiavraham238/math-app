import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyAtedi2wVb1RkEOMaWjcNzJovfE1OADUb8",
    authDomain: "adiapp-cbca5.firebaseapp.com",
    projectId: "adiapp-cbca5",
    storageBucket: "adiapp-cbca5.firebasestorage.app",
    messagingSenderId: "1069621326593",
    appId: "1:1069621326593:web:81bd83747d7ec6460c6100",
    measurementId: "G-VTFTFFKM6B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 