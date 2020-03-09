import React from "react";
import {photos} from "./photos"
import Gallery from "./Gallery"

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){

  return (
      <div>
          <Gallery photos={photos}>
          </Gallery>
      </div>

  );
}
}

export default App
