import React from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

import data from "./data";

const mapsConfig = {
  mapboxKey:
    "pk.eyJ1IjoibWlrZXdhZGhlcmEiLCJhIjoiY2prMGp1cXZmMDdrNzNxb2c4aG0yN2RwciJ9.l9HDsogzG93aM4VMmL5PbA",
  defaultZoom: 10,
  maxZoom: 20
};

mapboxgl.accessToken = mapsConfig.mapboxKey;

interface ExtendedLayer extends mapboxgl.CustomLayerInterface {
  program: WebGLProgram | null;
  aPosLocation: number;
  aColorLocation: number;
  vertexBuffer: WebGLBuffer | null;
  colorBuffer: WebGLBuffer | null;
  type: any;
}

let clusterSize = 0;

let colors: number[] | undefined;

export default class extends React.Component {
  highlightProgram: WebGLProgram | null = null;
  highlightAPos: number = 0;
  highlightBuffer: WebGLBuffer | null = null;

  mapContainer = React.createRef<HTMLDivElement>();

  map?: mapboxgl.Map;

  componentDidMount() {
    if (this.mapContainer.current) {
      this.map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [5, 34],
        zoom: 2
      });
    }
    this.setMapEvents();
    // this.map?.on("move", () => {
    //   if (!this.map) {
    //     return;
    //   }
    //   this.mapState = {
    //     lng: this.map.getCenter().lng,
    //     lat: this.map.getCenter().lat,
    //     zoom: this.map.getZoom()
    //   };
    // });
  }

  get mapState() {
    if (this.map) {
      return {
        lng: this.map.getCenter().lng,
        lat: this.map.getCenter().lat,
        zoom: this.map.getZoom()
      };
    }
    return {
      lng: 0,
      lat: 0,
      zoom: 0
    };
  }

  setMapEvents = () => {
    if (!this.map) {
      return;
    }
    this.map.on("load", () => {
      // @ts-ignore
      this.map && this.map.addLayer(this.highlightLayer);
    });
    this.map.on("click", "skipIns", this.handleClick);
  };

  // create a custom style layer to implement the WebGL content
  highlightLayer: ExtendedLayer = {
    id: "skipIns",
    type: "custom",
    program: null,
    aPosLocation: 0,
    aColorLocation: 0,
    vertexBuffer: null,
    colorBuffer: null,

    // method called when the layer is added to the map
    // https://docs.mapbox.com/mapbox-gl-js/api/#styleimageinterface#onadd
    onAdd: function(map: mapboxgl.Map, gl: WebGL2RenderingContext) {
      // create GLSL source for vertex shader
      var vertexSource = `
      uniform mat4 u_matrix;
      attribute vec2 a_pos;
      attribute vec4 a_color;
      varying vec4 color;

      void main() {
        gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
        gl_PointSize = 20.0;
        color = a_color;
      }`;

      // create GLSL source for fragment shader
      var fragmentSource = `
      precision mediump float;
      varying vec4 color;
      void main() {
        float r = 0.0;
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        r = dot(cxy, cxy);
        // if (r > 1.0) {
        //     discard;
        // }

        gl_FragColor = color;
      }`;

      // create a vertex shader
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      if (vertexShader) {
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);
      }

      // create a fragment shader
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      if (fragmentShader) {
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);
      }

      // link the two shaders into a WebGL program
      this.program = gl.createProgram();
      if (this.program && vertexShader && fragmentShader) {
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        this.aPosLocation = gl.getAttribLocation(this.program, "a_pos");
        this.aColorLocation = gl.getAttribLocation(this.program, "a_color");
      }

      const { locations, colors } = data.pins.reduce(
        (acc: { locations: number[][]; colors: number[][] }, cluster) => {
          cluster.pins.forEach(p => {
            const l = mapboxgl.MercatorCoordinate.fromLngLat(p.location);
            acc.locations.push([l.x, l.y]);
            // acc.colors.push([0.9, 0.1, 0.9]);
            acc.colors.push(data.possessions[p.possessionType].color);
          });
          return acc;
        },
        { locations: [], colors: [] }
      );
      console.log(locations.flat(), colors.flat());
      clusterSize = locations.length;

      this.vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(locations.flat()),
        gl.STATIC_DRAW
      );

      this.colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(colors.flat()),
        gl.STATIC_DRAW
      );
    },

    // method fired on each animation frame
    // https://docs.mapbox.com/mapbox-gl-js/api/#map.event:render
    render: function(gl: WebGL2RenderingContext, matrix: Iterable<number>) {
      gl.useProgram(this.program);
      if (this.program) {
        gl.uniformMatrix4fv(
          gl.getUniformLocation(this.program, "u_matrix"),
          false,
          matrix
        );
      }
      /* vertices */
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

      gl.vertexAttribPointer(this.aPosLocation, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.aPosLocation);

      /* colors */
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

      gl.vertexAttribPointer(this.aColorLocation, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.aColorLocation);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, clusterSize);
    }
  };

  handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (!this.map) {
      return;
    }
    // @ts-ignore
    console.log(e, this.map.transform);
    const click = e.point;
    const mapLngLat = this.mapState;
    // const unprojectedCamera = this.map.unproject(mapLngLat);
  };

  render() {
    return <div ref={this.mapContainer} className="mapContainer"></div>;
  }
}
