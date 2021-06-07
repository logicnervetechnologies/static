import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCrSR0aquvWFH-dXyG_7tv_S8QkCW1dWT4",
  authDomain: "algoimplement.firebaseapp.com",
  databaseURL: "https://algoimplement.firebaseio.com",
  projectId: "algoimplement",
  storageBucket: "algoimplement.appspot.com",
  messagingSenderId: "864207905789",
  appId: "1:864207905789:web:b2f3a328831587d8472f94",
  measurementId: "G-HRYB5XB9YH"
});

export default app;