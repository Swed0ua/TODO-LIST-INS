import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEg62Um2_dyb2emYCMFVljqHEldYr0FtE",
    authDomain: "todolist-a10b8.firebaseapp.com",
    databaseURL: "https://todolist-a10b8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todolist-a10b8",
    storageBucket: "todolist-a10b8.firebasestorage.app",
    messagingSenderId: "132019226866",
    appId: "1:132019226866:web:b7bdc68febecf17256a86b",
    measurementId: "G-N3VQZDJXH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth };
