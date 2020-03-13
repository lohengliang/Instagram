import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD69Fnb61UIqEVOCfKvkx9U3JXhPRMBR1I",
  authDomain: "instagram-55ddc.firebaseapp.com",
  databaseURL: "https://instagram-55ddc.firebaseio.com",
  projectId: "instagram-55ddc",
  storageBucket: "instagram-55ddc.appspot.com",
  messagingSenderId: "813997176982",
  appId: "1:813997176982:web:1c5aa164646f9295cc2ab7",
  measurementId: "G-WLL0F8CX9M"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
