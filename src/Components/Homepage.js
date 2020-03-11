import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from "react-map-gl"
import '../App.css';
import * as parkdate from "./data/data.json"
import { plant } from "./plant.svg"
import firebaseclass from "./firebase/firebase.js"

function App() {
  const accesstoken = "pk.eyJ1IjoiZHVzdHlpayIsImEiOiJjazdpcHR2cm4wajlhM2ZwZTc0Y2dvZWZkIn0.NDtL-vByWR8lDk3e2sQMgw"
  const [viewport, setviewport] = useState({
    latitude: 1.3521, // sg centre
    longitude: 103.8198, //sg centre
    width: "100vw",
    height: "100vh",
    zoom: 11
  })

  const [coordinates, setcoordinates] = useState({
    data : [[103.96286, 1.34017], [103.86299, 1.36576]]

  })

  const data = firebaseclass.getfirestore();
  
  console.log(data)


  const [selectedpark, useselectedpark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
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

        {coordinates.data.map((coordinates) =>
          <Marker key={coordinates[0]} latitude={coordinates[1]} longitude={coordinates[0]}>

            <button class="marker-btn" onClick={(e) => {
              e.preventDefault();
              useselectedpark(coordinates);
              console.log("selected")
            }}>
              <img src={plant} alt="Plant Icon" />
            </button>

          </Marker>

        )}

        {selectedpark ?
          (<Popup
            latitude={selectedpark.geometry.coordinates[1]}
            longitude={selectedpark.geometry.coordinates[0]}
            onClose={() => {
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
