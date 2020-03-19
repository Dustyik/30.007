import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyDmPp4HXGTTdxiyKx7xQDbHWTBncOJliOM",
  authDomain: "team8-8a484.firebaseapp.com",
  databaseURL: "https://team8-8a484.firebaseio.com",
  projectId: "team8-8a484",
  storageBucket: "team8-8a484.appspot.com",
  messagingSenderId: "51573092549",
  appId: "1:51573092549:web:527c3919fc4e0ea9e340ac",
  measurementId: "G-R642RLVV9V"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;