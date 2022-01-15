import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDHZk-q25IDt8pYhBLdVF66PlrdbTiI4sQ",
    authDomain: "tinder-97330.firebaseapp.com",
    projectId: "tinder-97330",
    storageBucket: "tinder-97330.appspot.com",
    messagingSenderId: "981380582685",
    appId: "1:981380582685:web:9c62114c38b7a93b9265f4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
