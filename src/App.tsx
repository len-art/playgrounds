import React from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

import PinLayer from "./layers/pin";
import data from "./staticData/pins";

const mapsConfig = {
  mapboxKey:
    "pk.eyJ1IjoibWlrZXdhZGhlcmEiLCJhIjoiY2prMGp1cXZmMDdrNzNxb2c4aG0yN2RwciJ9.l9HDsogzG93aM4VMmL5PbA",
  defaultZoom: 10,
  maxZoom: 20
};

mapboxgl.accessToken = mapsConfig.mapboxKey;

export default class extends React.Component {
  highlightProgram: WebGLProgram | null = null;
  highlightAPos: number = 0;
  highlightBuffer: WebGLBuffer | null = null;

  mapContainer = React.createRef<HTMLDivElement>();

  map?: mapboxgl.Map;

  state = {
    image: undefined
  };

  pinLayer?: PinLayer;

  componentDidMount() {
    this.createMap();
    this.createLayers();
  }

  createMap = () => {
    if (this.mapContainer.current) {
      this.map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-77.0369, 38.9072],
        zoom: 12
      });
    }
  };

  createLayers = () => {
    this.pinLayer = new PinLayer({
      map: this.map,
      pins: [],
      onClick: console.log
    });
    /* enable for demo purposes */
    // this.animatePins();
  };

  animatePins = () => {
    setInterval(() => {
      this.pinLayer?.updatePins(
        data.pins.map(c => ({
          ...c,
          pins: c.pins.map(p => ({
            ...p,
            location: {
              lat: p.location.lat + 0.001 * Math.random(),
              lng: p.location.lng + 0.001 * Math.random()
            }
          }))
        }))
      );
    }, 3000);
  };

  render() {
    return (
      <>
        <div ref={this.mapContainer} className="mapContainer"></div>
      </>
    );
  }
}
