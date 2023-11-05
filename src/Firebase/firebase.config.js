// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuzW0gmJgA8OVXKSDj6EhtH5dHQpZIHrg",
  authDomain: "novel-nexus-io.firebaseapp.com",
  projectId: "novel-nexus-io",
  storageBucket: "novel-nexus-io.appspot.com",
  messagingSenderId: "308889171056",
  appId: "1:308889171056:web:1262fb237d7ae633c970b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
