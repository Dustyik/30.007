import React from 'react';
import ReactMapGl, { Marker, Popup } from "react-map-gl"
import '../App.css';
import firebase from "./firebase/firebase.js"
import "firebase/firestore"
import icon from "./rsz_icon.png"
import { useHistory } from "react-router-dom"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function App() {
  const accesstoken = "pk.eyJ1IjoiZHVzdHlpayIsImEiOiJjazdpcHR2cm4wajlhM2ZwZTc0Y2dvZWZkIn0.NDtL-vByWR8lDk3e2sQMgw"
  const [viewport, setviewport] = React.useState({
    latitude: 1.3521, // sg centre
    longitude: 103.8198, //sg centre
    width: "100vw",
    height: "100vh",
    zoom: 11
  })

  const [details, setdetails] = React.useState([
  ])

  const history = useHistory();

  const callback = React.useCallback(
    (e) => {
      console.log("visitgallery")
      history.push("/gallery")
    },
    [],
  );

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("data").get()
      setdetails(data.docs.map(doc => doc.data()))
    }
    fetchData();
  }, [])

  const [selectedpark, useselectedpark] = React.useState(null);

  React.useEffect(() => {
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

        {details.map((details) =>
          <Marker key={details.name} latitude={details.lat} longitude={details.long}>

            <button class="marker-btn" onClick={(e) => {
              e.preventDefault();
              useselectedpark(details);
            }}>
              <img src={icon} alt="icon" className="navbar-brand" />
            </button>

          </Marker>

        )}

        {selectedpark ?
          (<Popup
            latitude={selectedpark.lat}
            longitude={selectedpark.long}
            closeOnClick={false}
            onClose={() => {
              useselectedpark(null);
            }}
          >
            <div>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{selectedpark.name}</Card.Title>
                  <Card.Text>
                    {selectedpark.postalcode}
                  </Card.Text>
                  <Button  href="#" onClick={(e) => {
                    callback();
                  }}>
                    Visit Gallery
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Popup>)
          : null}
        {
          console.log("in render", details)
        }

      </ReactMapGl>

    </div>
  );
}

export default App;
