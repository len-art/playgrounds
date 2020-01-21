import React from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

import data, { PinCluster } from "./data";

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
    arraySize: number;
    colorValues: number[];
  }[];
}

let clusterSize = 0;

const getPinVertices = (loc: mapboxgl.MercatorCoordinate) => {
  const mercatorRadius = 0.000006;
  const c = [loc.x, loc.y - mercatorRadius];

  return [
    c,
    [c[0], c[1] - mercatorRadius],
    [c[0] + mercatorRadius / 1.5, c[1] - mercatorRadius / 1.5],
    [c[0] + mercatorRadius, c[1]],
    [c[0] + mercatorRadius / 1.5, c[1] + mercatorRadius / 1.5],
    [c[0], c[1] + mercatorRadius * 1.2],
    [c[0] - mercatorRadius / 1.5, c[1] + mercatorRadius / 1.5],
    [c[0] - mercatorRadius, c[1]],
    [c[0] - mercatorRadius / 1.5, c[1] - mercatorRadius / 1.5],
    [c[0], c[1] - mercatorRadius]
  ];
};

/* simplified 2d ray cast becaue we only render 2d-like */
const isPointInPolygon = ([x, y]: number[], vs: number[][]) =>
  vs.reduce((acc, point, index, self) => {
    const nextPoint = (index + 1) % self.length;
    const x1 = point[0],
      y1 = point[1];

    var x2 = vs[nextPoint][0],
      y2 = vs[nextPoint][1];

    const isY1Bigger = y1 > y;
    const isY2Bigger = y2 > y;

    const doesIntersect =
      isY1Bigger !== isY2Bigger && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1;

    if (doesIntersect) {
      return !acc;
    }
    return acc;
  }, false);

const loadImageAndCreateTextureInfo = (
  gl: WebGL2RenderingContext,
  url: string
) => {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  const textureInfo = {
    width: 1,
    height: 1,
    texture: tex
  };
  const img = new Image();
  if (!img) {
    return;
  }
  img.onload = () => {
    textureInfo.width = img.width;
    textureInfo.height = img.height;

    gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  };
  // img.addEventListener("load", function() {
  //   textureInfo.width = img.width;
  //   textureInfo.height = img.height;

  //   gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
  //   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  // });
  img.src = url;

  return textureInfo;
};

// const drawImage = (gl: WebGL2RenderingContext, /*program: WebGLProgram, positionBuffer: WebGLBuffer, positionLocation: number, */ tex: WebGLTexture, texWidth: number, texHeight: number, dstX: number, dstY: number)  => {
//   gl.bindTexture(gl.TEXTURE_2D, tex);

//   // Setup the attributes to pull data from our buffers
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//   gl.enableVertexAttribArray(positionLocation);
//   gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
//   gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
//   gl.enableVertexAttribArray(texcoordLocation);
//   gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

//   // this matrix will convert from pixels to clip space
//   var matrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);

//   // this matrix will translate our quad to dstX, dstY
//   matrix = m4.translate(matrix, dstX, dstY, 0);

//   // this matrix will scale our 1 unit quad
//   // from 1 unit to texWidth, texHeight units
//   matrix = m4.scale(matrix, texWidth, texHeight, 1);

//   // Set the matrix.
//   gl.uniformMatrix4fv(matrixLocation, false, matrix);

//   // Tell the shader to get the texture from texture unit 0
//   gl.uniform1i(textureLocation, 0);

//   // draw the quad (2 triangles, 6 vertices)
//   gl.drawArrays(gl.TRIANGLES, 0, 6);
// }

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
        center: [-77.0369, 38.9072],
        zoom: 12
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
      // this.map && this.map.addLayer(this.testLayer);
      this.map && this.map.addLayer(this.highlightLayer);
    });
    this.map.on("click", this.handleClick);
  };

  handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (!this.map) {
      return;
    }
    const projectedClick = mapboxgl.MercatorCoordinate.fromLngLat(e.lngLat);
    const clickedPin = data.pins.reduce(
      (acc: PinCluster | undefined, cluster) => {
        if (acc) {
          return acc;
        }
        const projection = mapboxgl.MercatorCoordinate.fromLngLat(
          cluster.pins[0].location
        );
        // we should only compute vertices when copying them to the buffer
        const vertices = getPinVertices(projection);

        const wasClicked = isPointInPolygon(
          [projectedClick.x, projectedClick.y],
          vertices
        );
        return wasClicked ? cluster : acc;
      },
      undefined
    );

    console.log(clickedPin);
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
      console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
      // create GLSL source for vertex shader
      const vertexSource = `
      uniform mat4 u_matrix;
      uniform vec3 u_color;
      attribute vec2 a_pos;
      attribute vec3 a_color;

      varying vec3 color;

      void main() {
        gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
        // color = a_color;
        color = u_color;
      }`;

      // create GLSL source for fragment shader
      const fragmentSource = `
      precision mediump float;

      varying vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }`;

      // create a vertex shader
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      if (vertexShader) {
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);
        const log = gl.getShaderInfoLog(vertexShader);
        if (log && log.length) {
          console.log("Vertex Shader Error", log);
        }
      }

      // create a fragment shader
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      if (fragmentShader) {
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);
        const log = gl.getShaderInfoLog(fragmentShader);
        if (log && log.length) {
          console.log("Fragment Shader Error", log);
        }
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

        const projection = mapboxgl.MercatorCoordinate.fromLngLat(
          cluster.pins[0].location
        );
        const vertices = getPinVertices(projection);
        const colorValues =
          data.possessions[cluster.pins[0].possessionType].color;

        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(vertices.flat()),
          gl.STATIC_DRAW
        );

        this.pinDetails.push({
          aPosLocation,
          posBuffer,
          colorValues,
          arraySize: vertices.length
        });
      });
      clusterSize = this.pinDetails.length;

      /* textures */
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
        if (!this.program) {
          return false;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, pd.posBuffer);

        gl.vertexAttribPointer(pd.aPosLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pd.aPosLocation);

        gl.uniform3f(
          gl.getUniformLocation(this.program, "u_color"),
          pd.colorValues[0],
          pd.colorValues[1],
          pd.colorValues[2]
        );

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

  render() {
    return <div ref={this.mapContainer} className="mapContainer"></div>;
  }
}
