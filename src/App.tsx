import React from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

// @ts-ignore
import vtxShader from "./shaders/vertex.vs";

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

interface ExtendedLayer extends mapboxgl.CustomLayerInterface {
  program: WebGLProgram | null;
  aPos: number;
  buffer: WebGLBuffer | null;
  type: any;
}

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
      this.map && this.map.addLayer(this.highlightLayer, "building");
    });
  };

  // create a custom style layer to implement the WebGL content
  highlightLayer: ExtendedLayer = {
    id: "highlight",
    type: "custom",
    program: null,
    aPos: 0,
    buffer: null,

    // method called when the layer is added to the map
    // https://docs.mapbox.com/mapbox-gl-js/api/#styleimageinterface#onadd
    onAdd: function(map: mapboxgl.Map, gl: WebGL2RenderingContext) {
      // create GLSL source for vertex shader
      var vertexSource = `
      uniform mat4 u_matrix;
      attribute vec2 a_pos;
      void main (){
        gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
      }
      `;

      // "" +
      // "uniform mat4 u_matrix;" +
      // "attribute vec2 a_pos;" +
      // "void main() {" +
      // "    gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);" +
      // "}";

      // create GLSL source for fragment shader
      var fragmentSource =
        "" +
        "void main() {" +
        "    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);" +
        "}";

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
        this.aPos = gl.getAttribLocation(this.program, "a_pos");
      }

      // define vertices of the triangle to be rendered in the custom style layer
      var helsinki = mapboxgl.MercatorCoordinate.fromLngLat({
        lng: 25.004,
        lat: 60.239
      });
      var berlin = mapboxgl.MercatorCoordinate.fromLngLat({
        lng: 13.403,
        lat: 52.562
      });
      var kyiv = mapboxgl.MercatorCoordinate.fromLngLat({
        lng: 30.498,
        lat: 50.541
      });

      // create and initialize a WebGLBuffer to store vertex and color data
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          helsinki.x,
          helsinki.y,
          berlin.x,
          berlin.y,
          kyiv.x,
          kyiv.y
        ]),
        gl.STATIC_DRAW
      );
    },

    // method fired on each animation frame
    // https://docs.mapbox.com/mapbox-gl-js/api/#map.event:render
    render: function(gl: WebGL2RenderingContext, matrix: Iterable<number>) {
      if (this.program) {
        gl.useProgram(this.program);
        gl.uniformMatrix4fv(
          gl.getUniformLocation(this.program, "u_matrix"),
          false,
          matrix
        );
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.enableVertexAttribArray(this.aPos);
      gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    }
  };

  render() {
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
