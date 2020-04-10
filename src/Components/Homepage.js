import React from 'react';
import ReactMapGl, { Marker, Popup } from "react-map-gl"
import '../App.css';
import firebase from "./firebase/firebase.js"
import "firebase/firestore"
import icon from "./utils/plantlogobgremoved.png"
import { useHistory } from "react-router-dom"
import Cardjs from "./card.js"
import logo from "./utils/GClogocropped.png"
import MUIButton from '@material-ui/core/Button';

const descriptionlat = 1.411229;
const descriptionlong = 103.628490;

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
  const [selectedpark, useselectedpark] = React.useState(null);

  const history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("data").get()
      setdetails(  
      data.docs.map(doc => doc.data())
      )
    }
    fetchData();
  }, [])

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

            <button class="marker-btn" style={{ background: 'rgba(245, 245, 245, 0', elevation: "0", border: "none" }}
              onClick={(e) => {
                e.preventDefault();
                useselectedpark(details);
              }}>
              <img src={icon} alt="icon" className="navbar-brand" />
            </button>

          </Marker>

        )}
        <div  style = {{justifyContent: "center", textAlign: "center"}}>
        <Marker key={"description marker"} latitude={descriptionlat} longitude={descriptionlong}>

            <MUIButton variant="outlined" style={{ background: 'rgba(152, 251, 152, 0.3', border: "none"}}
            
            >
             <h6 class = "text-title2">
              Currently {details.length} farms in progress
              </h6>
            </MUIButton>

          </Marker>

        </div>

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
              <Cardjs
                title={selectedpark.name}
                powerlevel={"Current power level of farm is at " + selectedpark.powerlevel + "%"}
                waterlevel={"Current water level of farm is at " + selectedpark.waterlevel + "%"}
                deets={selectedpark}
                history={history}
              >
              </Cardjs>


            </div>
          </Popup>)
          : null}

      </ReactMapGl>

    </div>
  );
}

export default App;
