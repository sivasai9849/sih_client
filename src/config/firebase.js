// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdkcYiz-A5tYFb6DKBc7IgNoNUhRyd710",
  authDomain: "sih-docs-trans.firebaseapp.com",
  projectId: "sih-docs-trans",
  storageBucket: "sih-docs-trans.appspot.com",
  messagingSenderId: "849654216898",
  appId: "1:849654216898:web:7f38139fe1402bc240a35b",
  measurementId: "G-SQF6YNMWL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };