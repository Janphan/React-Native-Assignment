// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyN03mHD_tREZKzZKkhvFHNhDuir77oDE",
    authDomain: "shoppinglistfirebase-c3406.firebaseapp.com",
    databaseURL: "https://shoppinglistfirebase-c3406-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglistfirebase-c3406",
    storageBucket: "shoppinglistfirebase-c3406.appspot.com",
    messagingSenderId: "40510060364",
    appId: "1:40510060364:web:f7118020d4d52ecb2481e9",
    measurementId: "G-8QK7C9VFYQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);