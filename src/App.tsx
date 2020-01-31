import React from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

import PinLayer from "./layers/pins";
import data, { ProjectedPin } from "./staticData/pins";
import typeface from "./staticData/typeface";
import clusterPins from "./helpers/clusterPins";
import PinPopup from "./PinPopup";

const mapsConfig = {
  mapboxKey:
    "pk.eyJ1IjoibWlrZXdhZGhlcmEiLCJhIjoiY2prMGp1cXZmMDdrNzNxb2c4aG0yN2RwciJ9.l9HDsogzG93aM4VMmL5PbA",
  defaultZoom: 10,
  maxZoom: 20
};

mapboxgl.accessToken = mapsConfig.mapboxKey;

interface State {
  clickedVehicleId?: string;
}

export default class extends React.Component<State> {
  highlightProgram: WebGLProgram | null = null;
  highlightAPos: number = 0;
  highlightBuffer: WebGLBuffer | null = null;

  lastMapZoom?: number;

  mapContainer = React.createRef<HTMLDivElement>();

  map?: mapboxgl.Map;

  state: State = {
    clickedVehicleId: undefined
  };

  pinLayer?: PinLayer;

  componentDidMount() {
    // console.log(typeface.createTextTexture("2"));
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
      /* cluster pins on first load */
      this.map.on("load", this.clusterPins);
    }
  };

  createLayers = () => {
    this.pinLayer = new PinLayer({
      map: this.map,
      clusters: [],
      handleClick: this.handlePinClick
    });
    /* enable for demo purposes */
    // this.animatePins();
  };

  createEventHandlers = () => {
    if (!this.map) {
      return;
    }
    this.map.on("moveend", this.handleMapMove);
  };

  handleMapMove = async (
    e: mapboxgl.MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
      mapboxgl.EventData
  ) => {
    const zoom = this.map?.getZoom();
    if (typeof zoom === "number" && zoom !== this.lastMapZoom) {
      this.lastMapZoom = zoom;
      this.clusterPins();
    }
  };

  clusterPins = async () => {
    const projectedPins = data.unclusteredPins.reduce(
      (acc: ProjectedPin[], p) => {
        if (!this.map) {
          return acc;
        }
        acc.push({
          ...p,
          screenLocation: this.map.project([p.location.lng, p.location.lat])
        });
        return acc;
      },
      []
    );

    const clusters = await clusterPins(projectedPins);
    this.pinLayer?.updatePins(clusters);
  };

  handlePinClick = (vehicleId?: string) => {
    this.setState({ clickedVehicleId: vehicleId });
  };

  closePinPopup = () => {
    this.setState({ clickedVehicleId: undefined });
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

  render() {
    return (
      <>
        {/* <canvas
          id="cnvs"
          style={{
            zIndex: 100,
            position: "relative"
          }}
        /> */}
        {/* <img id="imgtest" /> */}
        <div ref={this.mapContainer} className="mapContainer"></div>
        <PinPopup
          vehicleId={this.state.clickedVehicleId}
          handleClose={this.closePinPopup}
        />
      </>
    );
  }
}
