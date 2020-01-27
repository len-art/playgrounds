import React from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

import PinLayer from "./layers/pins";
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
    this.createEventHandlers();
  }

  createMap = () => {
    if (this.mapContainer.current) {
      this.map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: "mapbox://styles/mikewadhera/ck1rtb0jk09ia1ck1yfofff2l",
        center: [-77.0369, 38.9072],
        zoom: 12
      });
    }
  };

  createLayers = () => {
    this.pinLayer = new PinLayer({
      map: this.map,
      pins: []
    });
    /* enable for demo purposes */
    // this.animatePins();
  };

  animatePins = () => {
    setInterval(() => {
      this.pinLayer?.updatePins(
        data.clusters.map(c => ({
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

  clusterPins = () => {};

  createEventHandlers = () => {
    if (!this.map) {
      return;
    }
    this.map.on("moveend", this.handleMapMove);
  };

  handleMapMove = (
    e: mapboxgl.MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
      mapboxgl.EventData
  ) => {
    console.log("moveend");
  };

  render() {
    return (
      <>
        <div ref={this.mapContainer} className="mapContainer"></div>
      </>
    );
  }
}
