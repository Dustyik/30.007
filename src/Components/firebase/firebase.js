import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyDmPp4HXGTTdxiyKx7xQDbHWTBncOJliOM",
  authDomain: "team8-8a484.firebaseapp.com",
  databaseURL: "https://team8-8a484.firebaseio.com",
  projectId: "team8-8a484",
  storageBucket: "gs://team8-8a484.appspot.com",
  messagingSenderId: "51573092549",
  appId: "1:51573092549:web:527c3919fc4e0ea9e340ac",
  measurementId: "G-R642RLVV9V"
};

class firebaseclass {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  getstorage() {
    const storage = firebase.storage().ref().child("location1/images");
    return storage

  }

  getfirestore() {
    const db = firebase.firestore();
    var storearray = []

    db.collection("data").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        storearray.push(doc.data())
      });
    });
    return storearray
  }
}

export default new firebaseclass