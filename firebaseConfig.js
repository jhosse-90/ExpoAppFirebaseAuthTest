// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getReactNativePersistence} from "@firebase/auth/dist/rn/index.js";
import { initializeAuth } from "firebase/auth";
import  AsyncStorage  from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ1DEZJJaGcvaHTEB9jqJ3KaStb_gHTZ8",
  authDomain: "fir-authtestapp-5cfb7.firebaseapp.com",
  projectId: "fir-authtestapp-5cfb7",
  storageBucket: "fir-authtestapp-5cfb7.firebasestorage.app",
  messagingSenderId: "50113815813",
  appId: "1:50113815813:web:4c830cde984d487f05836c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initializae Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)



