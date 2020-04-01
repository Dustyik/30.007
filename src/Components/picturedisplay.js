import React from "react";
import Gallery from "./Gallery"
import firebase from "./firebase/firebase.js"
import { CommunicationPresentToAll } from "material-ui/svg-icons";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photosurl: [],
      pathurllength: null,
      photosobject: {}
    }
    this.getPics = this.getPics.bind(this);
    this.randint = this.randint.bind(this);
  }

  async componentDidMount() {
    console.log("componentdidmount", this.state)
    this.setState({
      lat: this.props.location.state.lat,
      long: this.props.location.state.long,
      name: this.props.location.state.name,
      postalcode: this.props.location.state.postalcode,
      powerlevel: this.props.location.state.powerlevel,
      waterlevel: this.props.location.state.waterlevel,
      hasstart: this.props.location.state.hasstart
    })
    await this.getPics(this.props.location.state.id)

  }

  async getPics(deets) {
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

    this.setState({
      pathurllength: pathurl.length
    })

    var downloadurl = []
    let obj = []
    for (var i = 0; i < pathurl.length; i++) {
      var starsRef = storageRef.child(pathurl[i]);
      downloadurl.push(starsRef.getDownloadURL().then((url) => {
        // downloadurl.add(url)
        this.state.photosurl.push(url)
        this.setState(this.state)

        let emptyobj = {}
        emptyobj.src = url
        emptyobj.width = 3
        emptyobj.height = 2
        obj.push(emptyobj)

        this.setState({
          photosobject: obj
        })
      }
      ))
    }

    // this.createphotosobject();
  }

  randint(int) {
    return Math.floor(Math.random() * int) + 1; //returns rand int between 1 to (int + 1)
  }

  render() {
    if(this.state.photosobject.length == this.state.pathurllength && this.state.photosobject.length > 0){
      var exist = true
    }
    console.log(exist, this.state)
    return (
      <div>
        <h2>
          {this.state.name} 
          <h6>
            Set-up exist at: {this.state.postalcode}
          </h6>
        </h2>

        <h5>
          Current Water level: {this.state.waterlevel}
        </h5>
        <h5>
          Current Power level: {this.state.powerlevel}
        </h5>

        <div>
          {exist ? (
            <Gallery photos={this.state.photosobject} />
          ) : (
              <div />
            )}
        </div>
      </div>

    );
  }
}

export default App
