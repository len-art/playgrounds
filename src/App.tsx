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

interface PinBackgroundTex {
  texLoc: WebGLUniformLocation | null;
  texBuffer: WebGLTexture | null;
}

interface PinIconTex {
  texLoc: WebGLUniformLocation | null;
  texBuffer: WebGLTexture | null;
}

interface ExtendedLayer extends TestLayer {
  aPinShapeLocation: number;
  pinShapeBuffer: WebGLBuffer | null;
  iconMapBuffer: WebGLTexture | null;
  iconMapLoc: number;

  pinBackgroundTex: Record<string, PinBackgroundTex>;
  pinIconTex: Record<string, PinIconTex>;

  pinDetails: {
    aPosLocation: number;
    posBuffer: WebGLBuffer | null;
    arraySize: number;
    possessionKey: string;
    actionKey: string;
  }[];
}

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

const createBgTexture = (gl: WebGL2RenderingContext, color: number[]) => {
  /* creates 1x1 texture for pin background */
  const tempTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tempTexture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([color[0], color[1], color[2], 255]);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    1,
    1,
    0,
    srcFormat,
    srcType,
    pixel
  );

  return tempTexture;
};

export default class extends React.Component {
  highlightProgram: WebGLProgram | null = null;
  highlightAPos: number = 0;
  highlightBuffer: WebGLBuffer | null = null;

  mapContainer = React.createRef<HTMLDivElement>();

  map?: mapboxgl.Map;

  state = {
    image: undefined
  };

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
    pinBackgroundTex: {},
    pinIconTex: {},
    pinDetails: [],
    iconMapBuffer: null,
    iconMapLoc: 0,

    onAdd: function(map: mapboxgl.Map, gl: WebGL2RenderingContext) {
      /* GLSL source for vertex shader */
      const vertexSource = `
      uniform mat4 u_matrix;
      
      attribute vec2 a_iconMap;
      attribute vec2 a_pos;

      varying vec2 v_iconCoord;

      void main() {
        gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
        v_iconCoord = a_iconMap;
      }`;

      /* GLSL source for fragment shader */
      const fragmentSource = `
      precision mediump float;

      uniform sampler2D u_bgTexture;
      uniform sampler2D u_iconTexture;

      varying vec2 v_iconCoord;

      void main() {
        vec4 bgColor = texture2D(u_bgTexture, vec2(0.0, 0.0));
        vec4 iconColor = texture2D(u_iconTexture, v_iconCoord);

        if (iconColor.a == 0.0 || v_iconCoord.x < 0.0 ||
          v_iconCoord.y < 0.0 ||
          v_iconCoord.x > 1.0 ||
          v_iconCoord.y > 1.0) {
          gl_FragColor = bgColor;
        } else {
          gl_FragColor = bgColor * vec4(255, 255, 255, 255);
        }
      }`;

      /* create a vertex shader */
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      if (vertexShader) {
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);
        const log = gl.getShaderInfoLog(vertexShader);
        if (log && log.length) {
          console.error("Vertex Shader Error", log);
        }
      }

      /* create a fragment shader */
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      if (fragmentShader) {
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);
        const log = gl.getShaderInfoLog(fragmentShader);
        if (log && log.length) {
          console.error("Fragment Shader Error", log);
        }
      }

      // link the two shaders into a WebGL program
      this.program = gl.createProgram();
      if (this.program && vertexShader && fragmentShader) {
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
      }

      if (!this.program) {
        return;
      }

      this.pinBackgroundTex = {};
      this.pinDetails = [];

      /* background textures */
      this.pinBackgroundTex = Object.keys(data.possessions).reduce(
        (acc: Record<string, PinBackgroundTex>, possessionKey) => {
          if (!this.program) {
            return acc;
          }
          const colorValues = data.possessions[possessionKey].rgbColor;

          const uTexLoc = gl.getUniformLocation(this.program, "u_bgTexture");

          const texBuffer = createBgTexture(gl, colorValues);

          acc[possessionKey] = { texLoc: uTexLoc, texBuffer };

          return acc;
        },
        {}
      );

      /* icon textures */
      const level = 0;
      const internalFormat = gl.RGBA;
      const srcFormat = gl.RGBA;
      const srcType = gl.UNSIGNED_BYTE;

      this.pinIconTex = Object.keys(data.actions).reduce(
        (acc: Record<string, PinIconTex>, actionKey) => {
          if (!this.program) {
            return acc;
          }
          const action = data.actions[actionKey];

          const texLoc = gl.getUniformLocation(this.program, "u_iconTexture");

          const texBuffer = createBgTexture(gl, [255, 0, 255, 255]);

          const image = new Image();
          image.onload = () => {
            image.width = 128;
            image.height = 128;

            gl.bindTexture(gl.TEXTURE_2D, texBuffer);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(
              gl.TEXTURE_2D,
              level,
              internalFormat,
              srcFormat,
              srcType,
              image
            );
            gl.generateMipmap(gl.TEXTURE_2D);
          };
          image.onerror = console.error;
          image.src = action.svg;

          acc[actionKey] = { texLoc, texBuffer };

          return acc;
        },
        {}
      );

      data.pins.forEach(cluster => {
        if (!this.program) {
          return;
        }
        const aPosLocation = gl.getAttribLocation(this.program, "a_pos");

        const projection = mapboxgl.MercatorCoordinate.fromLngLat(
          cluster.pins[0].location
        );
        const vertices = getPinVertices(projection);

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
          arraySize: vertices.length,
          possessionKey: cluster.pins[0].possessionType,
          actionKey: cluster.pins[0].action
        });
      });

      /* pin icon map */
      this.iconMapLoc = gl.getAttribLocation(this.program, "a_iconMap");

      this.iconMapBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.iconMapBuffer);

      const textureMapping = [
        [0.5, 0.2],
        [0.5, 2],
        [1.5, 1.2],
        [2, 0.2],
        [1.5, -1.2],
        [0.5, -3],
        [-1.5, -1.2],
        [-2, 0.2],
        [-1.5, 1.2],
        [0.5, 2]
      ];

      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureMapping.flat()),
        gl.STATIC_DRAW
      );
    },
    render: function(gl: WebGL2RenderingContext, matrix: Iterable<number>) {
      gl.useProgram(this.program);
      if (!this.program) {
        return;
      }
      gl.uniformMatrix4fv(
        gl.getUniformLocation(this.program, "u_matrix"),
        false,
        matrix
      );

      this.pinDetails.forEach(pd => {
        if (!this.program) {
          return false;
        }
        /* bind and use vertex buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, pd.posBuffer);

        gl.vertexAttribPointer(pd.aPosLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pd.aPosLocation);

        /* icon texture map */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.iconMapBuffer);

        gl.vertexAttribPointer(this.iconMapLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.iconMapLoc);

        /* bg 1x1 texture */
        const backgroundTex = this.pinBackgroundTex[pd.possessionKey];
        gl.uniform1i(backgroundTex.texLoc, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, backgroundTex.texBuffer);

        /* icon texture */
        const iconTex = this.pinIconTex[pd.actionKey];
        gl.uniform1i(iconTex.texLoc, 1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, iconTex.texBuffer);

        // gl.enable(gl.BLEND);
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, pd.arraySize);
      });
    }
  };

  render() {
    return <div ref={this.mapContainer} className="mapContainer"></div>;
  }
}
