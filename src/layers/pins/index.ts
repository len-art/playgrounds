import mapboxgl from "mapbox-gl";
import { lusolve, divide, flatten } from "mathjs";

import PinShaders from "./shaders";
import pins, { PinCluster } from "../../staticData/pins";
import pinObjectData from "../../obj/pin";
import clusterObjectData from "../../obj/cluster";

import data from "../../staticData/pins";
import { isPointInPolygon } from "../../helpers/mapHelpers";
import typeface, { GlyphInfos } from "../../staticData/typeface";

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

interface ClusterData extends PinData {
  texture: Texture;
}

export default class PinLayer {
  map?: mapboxgl.Map;
  clusters: PinCluster[];
  handleClickCallback?(vehicleId?: string): void;

  pinsProgram: WebGLProgram | null = null;
  clustersProgram: WebGLProgram | null = null;

  pinBackgrounds: PinBackgroundTextures = {};
  clusterBackgrounds: PinBackgroundTextures = {};

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
  clusterData: ClusterData[] = [];

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
    this.pinsProgram = this.createProgram(
      gl,
      PinShaders.vertex,
      PinShaders.fragment
    );
    this.clustersProgram = this.createProgram(
      gl,
      PinShaders.vertexClusters,
      PinShaders.fragmentClusters
    );

    if (!(this.pinsProgram && this.clustersProgram)) {
      return;
    }

    this.pinBackgrounds = this.createBackgroundTextures(gl, this.pinsProgram);
    this.clusterBackgrounds = this.createBackgroundTextures(
      gl,
      this.clustersProgram
    );

    this.pinTextures = this.createIconTextures(gl, this.pinsProgram);

    // this.createClusterTexture(gl, this.clustersProgram);

    this.pinTextureMap = this.createPinTextureMap(gl, this.pinsProgram);
    this.clusterTextureMap = this.createClusterTextureMap(
      gl,
      this.clustersProgram
    );

    const allPinData = this.createPinData(
      gl,
      this.pinsProgram,
      this.clustersProgram
    );
    this.pinData = allPinData.pins;
    this.clusterData = allPinData.clusters;
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

  createBackgroundTextures = (
    gl: WebGLRenderingContext,
    program: WebGLProgram
  ) => {
    /* creates background textures for every possession */
    return Object.keys(data.possessions).reduce(
      (acc: PinBackgroundTextures, possessionKey) => {
        const colorValues = data.possessions[possessionKey].rgbColor;

        const bufferLoc = gl.getUniformLocation(program, "u_bgTexture");

        const buffer = this.create1x1Texture(gl, [...colorValues, 255]);

        acc[possessionKey] = { bufferLoc, buffer };

        return acc;
      },
      {}
    );
  };

  createIconTextures = (gl: WebGLRenderingContext, program: WebGLProgram) => {
    /* sets a temporary transparent texture,
    asynchronously loads actual icons which are then copied to GPU buffer */
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;

    return Object.keys(data.actions).reduce(
      (acc: PinIconTextures, actionKey) => {
        const action = data.actions[actionKey];

        const bufferLoc = gl.getUniformLocation(program, "u_iconTexture");

        const buffer = this.create1x1Texture(gl, [0, 0, 0, 0]);

        const image = new Image();
        image.onload = () => {
          image.width = 128;
          image.height = 128;

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

  createClusterTexture = (
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    text: string
  ) => {
    /* sets a temporary transparent texture,
    asynchronously loads actual icons which are then copied to GPU buffer */
    const glyphUrl = typeface.createTextTexture(text);

    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;

    const bufferLoc = gl.getUniformLocation(program, "a_clusterTexture");

    const buffer = this.create1x1Texture(gl, [0, 0, 0, 0]);

    const image = new Image();
    image.onload = () => {
      image.width = 128;
      image.height = 128;

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
    image.src = glyphUrl as string;
    return { bufferLoc, buffer };
  };

  createPinTextureMap = (gl: WebGLRenderingContext, program: WebGLProgram) => {
    /* creates a texture map for pin icons */
    const bufferLoc = gl.getAttribLocation(program, "a_pinIconMap");
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

  createClusterTextureMap = (
    gl: WebGLRenderingContext,
    program: WebGLProgram
  ) => {
    /* creates a texture map for pin icons */
    const bufferLoc = gl.getAttribLocation(program, "a_clusterIconMap");

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

  createPinData = (
    gl: WebGLRenderingContext,
    programPins: WebGLProgram,
    programClusters: WebGLProgram
  ) => {
    const zoom = this.map?.getZoom();
    const cachedClusterTextures: Texture[] = [];

    return this.clusters.reduce(
      (acc: { clusters: ClusterData[]; pins: PinData[] }, cluster) => {
        let vertices = this.getPinVertices(cluster, zoom);

        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(vertices.flat()),
          gl.STATIC_DRAW
        );

        const pinData = {
          posBuffer,
          veticesCount: vertices.length,
          possessionKey: cluster.pins[0].possessionType,
          actionKey: cluster.pins[0].action
        };

        if (cluster.pins.length === 1) {
          /* it's-a-pin */
          const posBufferLoc = gl.getAttribLocation(programPins, "a_pinLoc");
          acc.pins.push({ ...pinData, posBufferLoc });
        } else {
          /* it's-a-cluster */
          const posBufferLoc = gl.getAttribLocation(
            programClusters,
            "a_pinLoc"
          );

          const clusterSize = cluster.pins.length;
          let icon: Texture;
          if (cachedClusterTextures[clusterSize]) {
            icon = cachedClusterTextures[clusterSize];
          } else {
            icon = this.createClusterTexture(
              gl,
              programClusters,
              cluster.pins.length.toString()
            );
            cachedClusterTextures[clusterSize] = icon;
          }

          acc.clusters.push({
            ...pinData,
            posBufferLoc,
            texture: icon
          });
        }

        return acc;
      },
      { clusters: [], pins: [] }
    );
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

    const clampedZoom = Math.min(Math.max(8, zoom), 18);
    const zoomPercent = clampedZoom / 19;
    const r = maxR - maxR * zoomPercent;

    const loc = mapboxgl.MercatorCoordinate.fromLngLat(
      cluster.pins[0].location
    );

    const c = [loc.x, loc.y - r];

    let model;
    if (cluster.pins.length === 1) {
      model = pinObjectData.groupedVertices;
    } else {
      model = clusterObjectData.groupedVertices;
    }

    const vertices = model.map(v => {
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

    /* calculate precise eye coordinates for high precision projection */
    var eyeHigh = this.getEyePosition(matrix) as number[];
    var eyeLow = eyeHigh.map(function(e) {
      return e - Math.fround(e);
    });

    /* render clusters first */
    if (!this.clustersProgram) {
      return;
    }
    gl.useProgram(this.clustersProgram);

    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.clustersProgram, "u_matrix"),
      false,
      matrix
    );

    gl.uniform4fv(
      gl.getUniformLocation(this.clustersProgram, "u_eyeHigh"),
      eyeHigh
    );
    gl.uniform4fv(
      gl.getUniformLocation(this.clustersProgram, "u_eyeLow"),
      eyeLow
    );

    this.renderClusters(gl);

    /* pins go on top of the clusters */
    if (!this.pinsProgram) {
      return;
    }
    gl.useProgram(this.pinsProgram);

    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.pinsProgram, "u_matrix"),
      false,
      matrix
    );

    gl.uniform4fv(
      gl.getUniformLocation(this.pinsProgram, "u_eyeHigh"),
      eyeHigh
    );
    gl.uniform4fv(gl.getUniformLocation(this.pinsProgram, "u_eyeLow"), eyeLow);

    this.renderPins(gl);
  };

  renderClusters = (gl: WebGLRenderingContext) => {
    /* pin icon texture map */
    gl.bindBuffer(gl.ARRAY_BUFFER, this.clusterTextureMap.buffer);

    gl.vertexAttribPointer(
      this.clusterTextureMap.bufferLoc,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(this.clusterTextureMap.bufferLoc);

    this.clusterData.forEach(pd => {
      if (!this.clustersProgram) {
        return false;
      }
      /* pin shape */
      gl.bindBuffer(gl.ARRAY_BUFFER, pd.posBuffer);

      gl.vertexAttribPointer(pd.posBufferLoc, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(pd.posBufferLoc);

      /* bg 1x1 texture */
      const backgroundTex = this.clusterBackgrounds[pd.possessionKey];
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, backgroundTex.buffer);
      gl.uniform1i(backgroundTex.bufferLoc, 0);

      /* icon texture */
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, pd.texture.buffer);
      gl.uniform1i(pd.texture.bufferLoc, 1);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, pd.veticesCount);
    });
  };

  renderPins = (gl: WebGLRenderingContext) => {
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
      if (!this.pinsProgram) {
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

      gl.drawArrays(gl.TRIANGLE_FAN, 0, pd.veticesCount);
    });
  };

  updatePins = (pins: PinCluster[]) => {
    this.clusters = pins;
    const gl = this.map?.getCanvas().getContext("webgl");
    if (!(gl && this.pinsProgram && this.clustersProgram)) {
      return;
    }

    const allPinData = this.createPinData(
      gl,
      this.pinsProgram,
      this.clustersProgram
    );

    this.pinData = allPinData.pins;
    this.clusterData = allPinData.clusters;

    this.map?.triggerRepaint();
  };
}
