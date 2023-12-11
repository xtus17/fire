import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTzsBRXBMSq_YYSKIVnElsoxCHT5u4sf4",
  authDomain: "easydb-6b44f.firebaseapp.com",
  projectId: "easydb-6b44f",
  storageBucket: "easydb-6b44f.appspot.com",
  messagingSenderId: "942100161123",
  appId: "1:942100161123:web:ffd48068493af321600e56",
};

export const Firebase = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export const serverStamp = firebase.firestore.Timestamp;
