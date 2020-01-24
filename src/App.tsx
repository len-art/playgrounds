import React from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

import PinLayer from "./layers/pin";

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

  layer: any;

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
    this.layer = new PinLayer({
      map: this.map,
      pins: [],
      onClick: console.log
    });
  };

  render() {
    return (
      <>
        <div ref={this.mapContainer} className="mapContainer"></div>
      </>
    );
  }
}
