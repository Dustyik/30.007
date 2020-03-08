import React from "react";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage"

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
        <Route exact path="/Home" component={Homepage} />
        <Route path="/Livefeed " component={Homepage}/>
      </Switch>
    </React.Fragment>
    </BrowserRouter>
  );
}
}

export default App
