import app from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDmPp4HXGTTdxiyKx7xQDbHWTBncOJliOM",
    authDomain: "team8-8a484.firebaseapp.com",
    databaseURL: "https://team8-8a484.firebaseio.com",
    projectId: "team8-8a484",
    storageBucket: "team8-8a484.appspot.com",
    messagingSenderId: "51573092549",
    appId: "1:51573092549:web:527c3919fc4e0ea9e340ac",
    measurementId: "G-R642RLVV9V"
  };

  class Firebase {
      constructor() {
        app.initializeApp(firebaseConfig);

        var defaultstorage = app.storage();

        console.log("from firebasejs", defaultstorage)
      }
  }


  export default Firebase