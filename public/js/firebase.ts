// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD-TV0eMLTkNg8czZvLOUs-bhTCQcu98Qo",
  authDomain: "sangmyung1-1.firebaseapp.com",
  databaseURL: "https://sangmyung1-1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sangmyung1-1",
  storageBucket: "sangmyung1-1.appspot.com",
  messagingSenderId: "1074007264233",
  appId: "1:1074007264233:web:1ed0bf73678459ae925978",
  measurementId: "G-MTX2P9JZXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userInfo: any

onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo = user
  }
});

export { app, auth, db, userInfo }