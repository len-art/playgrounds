import React from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

const mapsConfig = {
  mapboxKey:
    "pk.eyJ1IjoibWlrZXdhZGhlcmEiLCJhIjoiY2prMGp1cXZmMDdrNzNxb2c4aG0yN2RwciJ9.l9HDsogzG93aM4VMmL5PbA",
  defaultZoom: 10,
  maxZoom: 20
};

mapboxgl.accessToken = mapsConfig.mapboxKey;

interface State {
  map: {
    lng: number;
    lat: number;
    zoom: number;
  };
}

export default class extends React.Component<{}, State> {
  state = {
    map: { lng: 5, lat: 34, zoom: 2 }
  };

  mapState = { lng: 5, lat: 34, zoom: 2 };

  mapContainer = React.createRef<HTMLDivElement>();

  map?: mapboxgl.Map;

  componentDidMount() {
    if (this.mapContainer.current) {
      this.map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [this.state.map.lng, this.state.map.lat],
        zoom: this.state.map.zoom
      });
    }
    this.map?.on("move", () => {
      if (!this.map) {
        return;
      }
      this.mapState = {
        lng: this.map.getCenter().lng,
        lat: this.map.getCenter().lat,
        zoom: this.map.getZoom()
      };
    });
  }

  render() {
    console.log("r");
    return (
      <div ref={this.mapContainer} className="mapContainer">
        Map
      </div>
    );
  }
}

// const App: React.FC = () => {
//   const [mapState, setMapState] = React.useState({
//     lng: 5,
//     lat: 34,
//     zoom: 2
//     })
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
