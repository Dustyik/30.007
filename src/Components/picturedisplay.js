import React from "react";
import { photos } from "./photos"
import Gallery from "./Gallery"
import firebase from "./firebase/firebase.js"
import { CommunicationPresentToAll } from "material-ui/svg-icons";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
    this.getPics = this.getPics.bind(this);
  }

  async componentDidMount(){
    let collection = await this.getPics(this.props.location.state.id);
    this.setState({
      photos: collection
    })

  }

  async getPics(deets) {
    console.log("get pics", deets)
    const storage = firebase.storage();
    var storageRef = storage.ref(deets)
    var listRef = storageRef.child('images');

    var imageref = []
    await listRef.listAll().then(function (res) {
      res.items.forEach(function (itemRef) {
        imageref.push(itemRef.name)
      });
    }).catch(function (error) {
      console.log("error")
    });

    var pathurl = []
    for (let i = 0; i < imageref.length; i++) {
      let path = "/images/" + imageref[i]
      pathurl.push(path)
    }

    console.log(pathurl)
    var downloadurl = []
    for (var i = 0; i < pathurl.length; i++) {
      var starsRef = storageRef.child(pathurl[i]);
      console.log(starsRef)
      downloadurl.push(starsRef.getDownloadURL())
    }

    console.log(downloadurl, "downloadurl")

    var photose = []
    for (var i = 0; i < downloadurl.length; i++) {
      let bleg = {
        src: await downloadurl[i],
        width: 1,
        height: 1
      }
      photose.push(bleg)
    }
    console.log(photose)

    return photose
  }


  render() {
    return (
      <div>
        <Gallery photos={photos}>
        </Gallery>
      </div>

    );
  }
}

export default App
