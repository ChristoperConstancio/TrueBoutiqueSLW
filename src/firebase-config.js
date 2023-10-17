// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC49xnzP5IjQJFEhE_Me7alb9cwQubaCFA",
  authDomain: "trueboutique-f0edb.firebaseapp.com",
  projectId: "trueboutique-f0edb",
  storageBucket: "trueboutique-f0edb.appspot.com",
  messagingSenderId: "291774169184",
  appId: "1:291774169184:web:800cab38b384bf01778305",
  measurementId: "G-ECGN8R8VDE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db  = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export { db, storage };

