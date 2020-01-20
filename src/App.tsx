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

interface TestLayer extends mapboxgl.CustomLayerInterface {
  program: WebGLProgram | null;
  aPosLocation: number;
  aColorLocation: number;
  vertexBuffer: WebGLBuffer | null;
  colorBuffer: WebGLBuffer | null;
  type: any;
}

interface ExtendedLayer extends TestLayer {
  aPinShapeLocation: number;
  pinShapeBuffer: WebGLBuffer | null;

  pinDetails: {
    aPosLocation: number;
    posBuffer: WebGLBuffer | null;
    aColorLocation: number;
    colorBuffer: WebGLBuffer | null;
    arraySize: number;
  }[];
}

let clusterSize = 0;

let colors: number[] | undefined;

const getPinVertices = (loc: mapboxgl.MercatorCoordinate) => {
  const mercatorRadius = 0.000006;
  const c = [loc.x, loc.y - mercatorRadius];

  return [
    c,
    [c[0], c[1] - mercatorRadius],
    [c[0] + mercatorRadius / 2, c[1] - mercatorRadius / 2],
    [c[0] + mercatorRadius, c[1]],
    [c[0] + mercatorRadius / 2, c[1] + mercatorRadius / 2],
    [c[0], c[1] + mercatorRadius * 1.2],
    [c[0] - mercatorRadius / 2, c[1] + mercatorRadius / 2],
    [c[0] - mercatorRadius, c[1]],
    [c[0] - mercatorRadius / 2, c[1] - mercatorRadius / 2],
    [c[0], c[1] - mercatorRadius]
  ];
};

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
      // this.map && this.map.addLayer(this.testLayer);
      this.map && this.map.addLayer(this.highlightLayer);
    });
    this.map.on("click", this.handleClick);
  };

  highlightLayer: ExtendedLayer = {
    id: "skipIns",
    type: "custom",
    program: null,
    aPosLocation: 0,
    aColorLocation: 0,
    vertexBuffer: null,
    colorBuffer: null,
    aPinShapeLocation: 0,
    pinShapeBuffer: null,
    pinDetails: [],

    onAdd: function(map: mapboxgl.Map, gl: WebGL2RenderingContext) {
      // create GLSL source for vertex shader
      const vertexSource = `
      uniform mat4 u_matrix;
      attribute vec2 a_pos;
      attribute vec4 a_color;
      varying vec4 color;

      void main() {
        gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
        color = a_color;
      }`;

      // create GLSL source for fragment shader
      const fragmentSource = `
      precision mediump float;

      varying vec4 color;

      void main() {
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
      }

      this.pinDetails = [];
      data.pins.forEach(cluster => {
        if (!this.program) {
          return;
        }
        const aPosLocation = gl.getAttribLocation(this.program, "a_pos");
        const aColorLocation = gl.getAttribLocation(this.program, "a_color");

        const projection = mapboxgl.MercatorCoordinate.fromLngLat(
          cluster.pins[0].location
        );
        const vertices = getPinVertices(projection);
        const colors = Array.from(
          new Array(vertices.length),
          () => data.possessions[cluster.pins[0].possessionType].color
        );

        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(vertices.flat()),
          gl.STATIC_DRAW
        );

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(colors.flat()),
          gl.STATIC_DRAW
        );

        this.pinDetails.push({
          aPosLocation,
          aColorLocation,
          posBuffer,
          colorBuffer,
          arraySize: vertices.length
        });
      });
      clusterSize = this.pinDetails.length;
    },
    render: function(gl: WebGL2RenderingContext, matrix: Iterable<number>) {
      gl.useProgram(this.program);
      if (this.program) {
        gl.uniformMatrix4fv(
          gl.getUniformLocation(this.program, "u_matrix"),
          false,
          matrix
        );
      }

      this.pinDetails.forEach(pd => {
        gl.bindBuffer(gl.ARRAY_BUFFER, pd.posBuffer);

        gl.vertexAttribPointer(pd.aPosLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pd.aPosLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, pd.colorBuffer);

        gl.vertexAttribPointer(pd.aColorLocation, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pd.aColorLocation);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, pd.arraySize);
      });
    }
  };

  testLayer: TestLayer = {
    id: "testVehs",
    type: "custom",
    program: null,
    aPosLocation: 0,
    aColorLocation: 0,
    vertexBuffer: null,
    colorBuffer: null,

    onAdd: function(map: mapboxgl.Map, gl: WebGL2RenderingContext) {
      // create GLSL source for vertex shader
      const vertexSource = `
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
      const fragmentSource = `
      precision mediump float;

      varying vec4 color;

      void main() {
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
          const l = mapboxgl.MercatorCoordinate.fromLngLat(
            cluster.pins[0].location
          );
          acc.locations.push([l.x, l.y]);
          acc.colors.push(
            data.possessions[cluster.pins[0].possessionType].color
          );
          return acc;
        },
        { locations: [], colors: [] }
      );
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
      gl.drawArrays(gl.POINTS, 0, clusterSize);
    }
  };

  handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (!this.map) {
      return;
    }

    console.log(
      mapboxgl.MercatorCoordinate.fromLngLat(data.pins[0].pins[0].location)
    );
    console.log(mapboxgl.MercatorCoordinate.fromLngLat(e.lngLat));
  };

  render() {
    return <div ref={this.mapContainer} className="mapContainer"></div>;
  }
}
