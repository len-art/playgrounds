import mapboxgl from "mapbox-gl";
import { lusolve, divide, flatten } from "mathjs";

import PinShaders from "./shaders";
import { PinCluster } from "../../staticData/pins";
import pinObjectData from "../../obj/pin";
import clusterObjectData from "../../obj/cluster";

import data from "../../staticData/pins";
import { isPointInPolygon } from "../../helpers/mapHelpers";

interface Args {
  map?: mapboxgl.Map;
  clusters: PinCluster[];
  handleClick?(vehicleId?: string): void;
}

interface Texture {
  bufferLoc: WebGLUniformLocation | null;
  buffer: WebGLTexture | null;
}

interface Buffer {
  bufferLoc: number;
  buffer: WebGLBuffer | null;
}

type PinBackgroundTextures = Record<string, Texture>;
type PinIconTextures = Record<string, Texture>;

interface PinData {
  posBufferLoc: number;
  posBuffer: WebGLBuffer | null;
  veticesCount: number;
  possessionKey: string;
  actionKey: string;
}

export default class PinLayer {
  map?: mapboxgl.Map;
  clusters: PinCluster[];
  handleClickCallback?(vehicleId?: string): void;

  program: WebGLProgram | null = null;

  pinBackgrounds: PinBackgroundTextures = {};

  pinTextures: PinIconTextures = {};

  pinTextureMap: Buffer = {
    bufferLoc: 0,
    buffer: null
  };

  clusterTextureMap: Buffer = {
    bufferLoc: 0,
    buffer: null
  };

  pinData: PinData[] = [];

  constructor(args: Args) {
    this.map = args.map;
    this.clusters = args.clusters;
    this.handleClickCallback = args.handleClick;

    this.init();
  }

  init() {
    this.map &&
      this.map.on("load", () => {
        if (this.map) {
          this.map.addLayer({
            type: "custom",
            id: "pinLayer",
            onAdd: this.onAdd,
            render: this.render
          });
          this.map.on("click", this.handleClick);
        }
      });
  }

  handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (!this.map) {
      return;
    }
    const projectedClick = mapboxgl.MercatorCoordinate.fromLngLat(e.lngLat);
    const zoom = this.map?.getZoom();

    const clickedCluster = this.clusters.reduce(
      (acc: PinCluster | undefined, cluster) => {
        if (acc) {
          return acc;
        }
        const vertices = this.getPinVertices(cluster, zoom);

        const wasClicked = isPointInPolygon(
          [projectedClick.x, projectedClick.y],
          vertices
        );

        return wasClicked ? cluster : acc;
      },
      undefined
    );

    console.log(clickedCluster);
    if (this.handleClickCallback) {
      this?.handleClickCallback(clickedCluster?.pins[0].blackboxId);
    }
  };

  onAdd = (map: mapboxgl.Map, gl: WebGL2RenderingContext) => {
    /* called when layer is added */
    this.program = this.createProgram(
      gl,
      PinShaders.vertex,
      PinShaders.fragment
    );

    if (!this.program) {
      return;
    }

    this.pinBackgrounds = this.createBackgroundTextures(gl);

    this.pinTextures = this.createIconTextures(gl);

    this.pinTextureMap = this.createPinTextureMap(gl);

    this.clusterTextureMap = this.createClusterTextureMap(gl);

    this.pinData = this.createPinData(gl);
  };

  createProgram = (
    gl: WebGL2RenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) => {
    /* create and compile a vertex shader */
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (vertexShader) {
      gl.shaderSource(vertexShader, vertexShaderSource);
      // gl.shaderSource(vertexShader, PinShaders.vertex);
      gl.compileShader(vertexShader);
      const log = gl.getShaderInfoLog(vertexShader);
      if (log && log.length) {
        console.error("Vertex Shader Error", log);
      }
    }

    /* create and compile a fragment shader */
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fragmentShader) {
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      // gl.shaderSource(fragmentShader, PinShaders.fragment);
      gl.compileShader(fragmentShader);
      const log = gl.getShaderInfoLog(fragmentShader);
      if (log && log.length) {
        console.error("Fragment Shader Error", log);
      }
    }

    /* attach shaders to this WebGL program */
    const program = gl.createProgram();
    if (program && vertexShader && fragmentShader) {
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      const log = gl.getProgramInfoLog(program);
      if (log && log.length) {
        console.error("Program Error", log);
      }
    }
    return program;
  };

  createBackgroundTextures = (gl: WebGLRenderingContext) => {
    /* creates background textures for every possession */
    return Object.keys(data.possessions).reduce(
      (acc: PinBackgroundTextures, possessionKey) => {
        if (!this.program) {
          return acc;
        }
        const colorValues = data.possessions[possessionKey].rgbColor;

        const bufferLoc = gl.getUniformLocation(this.program, "u_bgTexture");

        const buffer = this.create1x1Texture(gl, [...colorValues, 255]);

        acc[possessionKey] = { bufferLoc, buffer };

        return acc;
      },
      {}
    );
  };

  createIconTextures = (gl: WebGLRenderingContext) => {
    /* sets a temporary transparent texture,
    asynchronously loads actual icons which are then copied to GPU buffer */
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;

    return Object.keys(data.actions).reduce(
      (acc: PinIconTextures, actionKey) => {
        if (!this.program) {
          return acc;
        }
        const action = data.actions[actionKey];

        const bufferLoc = gl.getUniformLocation(this.program, "u_iconTexture");

        const buffer = this.create1x1Texture(gl, [0, 0, 0, 0]);

        const image = new Image();
        image.onload = () => {
          image.width = 256;
          image.height = 256;

          gl.bindTexture(gl.TEXTURE_2D, buffer);
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

          this.map?.triggerRepaint();
        };
        image.onerror = console.error;
        image.src = action.svg;

        acc[actionKey] = { bufferLoc, buffer };

        return acc;
      },
      {}
    );
  };

  createPinTextureMap = (gl: WebGLRenderingContext) => {
    /* creates a texture map for pin icons */
    if (!this.program) {
      return {
        bufferLoc: 0,
        buffer: null
      };
    }
    const bufferLoc = gl.getAttribLocation(this.program, "a_pinIconMap");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(pinObjectData.mesh.textures),
      gl.STATIC_DRAW
    );
    return {
      bufferLoc,
      buffer
    };
  };

  createClusterTextureMap = (gl: WebGLRenderingContext) => {
    /* creates a texture map for pin icons */
    if (!this.program) {
      return {
        bufferLoc: 0,
        buffer: null
      };
    }
    const bufferLoc = gl.getAttribLocation(this.program, "a_clusterIconMap");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(clusterObjectData.mesh.textures),
      gl.STATIC_DRAW
    );
    return {
      bufferLoc,
      buffer
    };
  };

  createPinData = (gl: WebGLRenderingContext) => {
    /* creates pin data and copies needed information to GPU buffers */
    const zoom = this.map?.getZoom();
    return this.clusters.reduce((acc: PinData[], cluster) => {
      if (!this.program) {
        return acc;
      }
      const posBufferLoc = gl.getAttribLocation(this.program, "a_pinLoc");

      const vertices = this.getPinVertices(cluster, zoom);

      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices.flat()),
        gl.STATIC_DRAW
      );

      acc.push({
        posBufferLoc,
        posBuffer,
        veticesCount: vertices.length,
        possessionKey: cluster.pins[0].possessionType,
        actionKey: cluster.pins[0].action
      });

      return acc;
    }, []);
  };

  create1x1Texture = (gl: WebGLRenderingContext, color: number[]) => {
    /* creates a 1x1 texture with provided color in RGBA */
    const tempTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tempTexture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([color[0], color[1], color[2], color[3]]);
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

  getPinVertices = (cluster: PinCluster, zoom = 10) => {
    const maxR = 0.000009;

    const clampedZoom = Math.min(Math.max(8, zoom), 17);
    const zoomPercent = clampedZoom / 18;
    const r = maxR - maxR * zoomPercent;

    const loc = mapboxgl.MercatorCoordinate.fromLngLat(
      cluster.pins[0].location
    );

    const c = [loc.x, loc.y - r];

    const vertices = pinObjectData.groupedVertices.map(v => {
      const x = c[0] + r * v[0];
      const y = c[1] + r * v[1];
      return [x, y, x - Math.fround(x), y - Math.fround(y)];
    });

    return vertices;
  };

  getClusterVertices = (cluster: PinCluster, zoom = 10) => {
    const maxR = 0.000009;

    const clampedZoom = Math.min(Math.max(8, zoom), 17);
    const zoomPercent = clampedZoom / 18;
    const r = maxR - maxR * zoomPercent;

    const loc = mapboxgl.MercatorCoordinate.fromLngLat(
      cluster.pins[0].location
    );

    const c = [loc.x, loc.y - r];

    const vertices = clusterObjectData.groupedVertices.map(v => {
      const x = c[0] + r * v[0];
      const y = c[1] + r * v[1];
      return [x, y, x - Math.fround(x), y - Math.fround(y)];
    });

    return vertices;
  };

  getEyePosition = (matrix: number[]) => {
    const transform = [
      [matrix[0], matrix[4], matrix[8], matrix[12]],
      [matrix[1], matrix[5], matrix[9], matrix[13]],
      [matrix[2], matrix[6], matrix[10], matrix[14]],
      [matrix[3], matrix[7], matrix[11], matrix[15]]
    ];
    let eye = lusolve(transform, [[0], [0], [0], [1]]);
    // @ts-ignore
    const clip_w = 1.0 / eye[3][0];
    // @ts-ignore
    eye = divide(eye, eye[3][0]);
    // @ts-ignore
    eye[3][0] = clip_w;

    return flatten(eye);
  };

  render = (gl: WebGLRenderingContext, matrix: number[]) => {
    /* called every frame */
    gl.useProgram(this.program);
    if (!(this.program && this.map)) {
      return;
    }

    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.program, "u_matrix"),
      false,
      matrix
    );

    /* calculate precise eye coordinates for high precision projection */
    var eyeHigh = this.getEyePosition(matrix) as number[];
    var eyeLow = eyeHigh.map(function(e) {
      return e - Math.fround(e);
    });
    gl.uniform4fv(gl.getUniformLocation(this.program, "u_eyeHigh"), eyeHigh);
    gl.uniform4fv(gl.getUniformLocation(this.program, "u_eyeLow"), eyeLow);

    /* pin icon texture map */
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pinTextureMap.buffer);

    gl.vertexAttribPointer(
      this.pinTextureMap.bufferLoc,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(this.pinTextureMap.bufferLoc);

    this.pinData.forEach(pd => {
      if (!this.program) {
        return false;
      }
      /* pin shape */
      gl.bindBuffer(gl.ARRAY_BUFFER, pd.posBuffer);

      gl.vertexAttribPointer(pd.posBufferLoc, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(pd.posBufferLoc);

      /* bg 1x1 texture */
      const backgroundTex = this.pinBackgrounds[pd.possessionKey];
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, backgroundTex.buffer);
      gl.uniform1i(backgroundTex.bufferLoc, 0);

      /* icon texture */
      const iconTex = this.pinTextures[pd.actionKey];
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, iconTex.buffer);
      gl.uniform1i(iconTex.bufferLoc, 1);

      // gl.enable(gl.BLEND);
      // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, pd.veticesCount);
    });
  };

  updatePins = (pins: PinCluster[]) => {
    this.clusters = pins;
    const gl = this.map?.getCanvas().getContext("webgl");
    if (!gl) {
      return;
    }

    this.pinData = this.createPinData(gl);
    this.map?.triggerRepaint();
  };
}
