import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from "react-map-gl"
import '../App.css';
import * as parkdate from "./data/data.json"
import {plant} from "./plant.svg"
import firebase from "./firebase/firebase.js"

function App() {
  const accesstoken = "pk.eyJ1IjoiZHVzdHlpayIsImEiOiJjazdpcHR2cm4wajlhM2ZwZTc0Y2dvZWZkIn0.NDtL-vByWR8lDk3e2sQMgw"
  const [viewport, setviewport] = useState({
    latitude: 45.4215,
    longitude: -75.6972,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })

  console.log(firebase)

  const [selectedpark, useselectedpark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape"){
        useselectedpark(null);
      }
    };
    window.addEventListener("keydown", listener)

    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])

  return (
    <div className="App">
      <ReactMapGl {...viewport}
        mapboxApiAccessToken={accesstoken}
        mapStyle="mapbox://styles/dustyik/ck7iqho961qbl1ioalf6ne7qb"
        onViewportChange={viewport => {
          setviewport(viewport)
        }}>

        {parkdate.features.map((park) =>
          <Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]} longitude={park.geometry.coordinates[0]}>
            
            <button class="marker-btn" onClick={(e) => {
              e.preventDefault();
              useselectedpark(park);
              console.log("selected")
            }}>
              <img src = {plant} alt="Plant Icon"/>
            </button>

          </Marker>

        )}

        {selectedpark ?   
        (<Popup 
        latitude = {selectedpark.geometry.coordinates[1]}
        longitude = {selectedpark.geometry.coordinates[0]}
        onClose = {() => {
          useselectedpark(null);
        }}
        >
          <div>
            <h4>
              {selectedpark.properties.NAME}
            </h4>
            <p>
              {selectedpark.properties.DESCRIPTIO}
            </p>
          </div>
        </Popup>)
        : null}

      </ReactMapGl>

    </div>
  );
}

export default App;
