import React from "react";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage"
import picturedisplay from "./Components/picturedisplay"
import "bootstrap/dist/css/bootstrap.min.css"

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){

  return (
    <BrowserRouter>
    <React.Fragment>

      <Navbar/>
      <Switch>
       <Route exact path="/" component={Homepage}/>
        <Route exact path="/gallery" component={picturedisplay} />
        <Route path="/Livefeed " component={picturedisplay}/>
      </Switch>
    </React.Fragment>
    </BrowserRouter>
  );
}
}

export default App
