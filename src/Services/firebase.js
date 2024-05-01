// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnKuP9c4n_gNaHRhWo8-sNOUfJ-dY6a-A",
  authDomain: "paintcont-1ff14.firebaseapp.com",
  projectId: "paintcont-1ff14",
  storageBucket: "paintcont-1ff14.appspot.com",
  messagingSenderId: "547298127700",
  appId: "1:547298127700:web:12321fec2338ae217ba2c1",
  measurementId: "G-1KSEQ7GK0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };