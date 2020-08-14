//import firebase from "firebase";
import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import "firebase/storage";

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDeoHTeMTcarGhgSt5zdvRWGeKiHQCT2c0",
  authDomain: "vue-shop-9cfcd.firebaseapp.com",
  databaseURL: "https://vue-shop-9cfcd.firebaseio.com",
  projectId: "vue-shop-9cfcd",
  storageBucket: "vue-shop-9cfcd.appspot.com",
  messagingSenderId: "156535260613",
  appId: "1:156535260613:web:4a8840c52eea0dcedef7ac",
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db };
