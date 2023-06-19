// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "api-key-here",
  authDomain: "weather-app-324a2.firebaseapp.com",
  projectId: "weather-app-324a2",
  storageBucket: "weather-app-324a2.appspot.com",
  messagingSenderId: "554873970032",
  appId: "1:554873970032:web:ad118ab60192d08a1ec3b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
