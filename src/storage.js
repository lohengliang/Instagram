import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyD69Fnb61UIqEVOCfKvkx9U3JXhPRMBR1I",
  authDomain: "instagram-55ddc.firebaseapp.com",
  databaseURL: "https://instagram-55ddc.firebaseio.com",
  storageBucket: "instagram-55ddc.appspot.com"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

export default storage;
