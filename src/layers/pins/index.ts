import mapboxgl, { Point } from "mapbox-gl";
import { lusolve, divide, flatten } from "mathjs";

import PinShaders from "./shaders";
import { PinCluster } from "../../staticData/pins";
import pinShape from "../../img/pinShape.svg";
import clusterShape from "../../img/clusterShapes/red.svg";

import data from "../../staticData/pins";
import { isPointInPolygon } from "../../helpers/mapHelpers";
import typeface from "../../staticData/typeface";
import {
  Args,
  Buffer,
  PinBackgroundTextures,
  PinIconTextures,
  RenderablePins,
  RenderableClusters,
  Texture
} from "./models";
import { GlData } from "../commonModels";
import {
  getDefaultImageSettings,
  createBackgroundTextures,
  createClusterBackgroundTextures,
  getPinVertices,
  createPinTextureMap,
  createPinShapeTextureMap,
  createClusterTextureMap,
  createClusterShapeTextureMap
} from "./helpers";
import { create1x1Texture } from "../commonHelpers";

export default class PinLayer {
  map?: mapboxgl.Map;
  clusters: PinCluster[];
  handleClickCallback?(vehicleId?: string): void;

  clustersGlData: GlData = {
    program: null,
    matrixBufferLocation: null,
    eyeHighBufferLocation: null,
    eyeLowBufferLocation: null,
    backgroundBufferLocation: null
  };

  pinsGlData: GlData = {
    program: null,
    matrixBufferLocation: null,
    eyeHighBufferLocation: null,
    eyeLowBufferLocation: null,
    backgroundBufferLocation: null
  };

  pinShapeTexture: Texture = {
    bufferLoc: null,
    buffer: null
  };
  pinShapeTextureMap: Buffer = {
    bufferLoc: 0,
    buffer: null
  };

  clusterShapeTextureMap: Buffer = {
    bufferLoc: 0,
    buffer: null
  };

  pinBackgrounds: PinBackgroundTextures = {};

  clusterBackgrounds: PinBackgroundTextures = {};

  pinTextureLocation: WebGLUniformLocation | null = null;
  pinTextures: PinIconTextures = {};

  pinTextureMap: Buffer = {
    bufferLoc: 0,
    buffer: null
  };

  clusterTextureMap: Buffer = {
    bufferLoc: 0,
    buffer: null
  };

  pinData: RenderablePins = {};
  clusterData: RenderableClusters = {};

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
    const size = this.getPinSize();

    const clickedCluster = this.clusters.reduce(
      (acc: PinCluster | undefined, cluster) => {
        if (acc) {
          return acc;
        }
        const vertices = getPinVertices(cluster, size);

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
    this.clustersGlData.program = this.createProgram(
      gl,
      PinShaders.vertexClusters,
      PinShaders.fragmentClusters
    );
    this.pinsGlData.program = this.createProgram(
      gl,
      PinShaders.vertex,
      PinShaders.fragment
    );
    if (!(this.clustersGlData.program && this.pinsGlData.program)) {
      return;
    }

    this.setUniformValues(
      gl,
      this.clustersGlData.program,
      this.pinsGlData.program
    );

    this.pinShapeTexture = this.createPinShapeTexture(
      gl,
      this.pinsGlData.program
    );
    this.pinShapeTextureMap = createPinShapeTextureMap(
      gl,
      this.pinsGlData.program
    );

    this.clusterShapeTextureMap = createClusterShapeTextureMap(
      gl,
      this.clustersGlData.program
    );

    this.pinBackgrounds = createBackgroundTextures(
      gl,
      this.pinsGlData.backgroundBufferLocation,
      data.possessions
    );
    this.clusterBackgrounds = createClusterBackgroundTextures(
      gl,
      this.clustersGlData.backgroundBufferLocation,
      data.possessions
    );

    this.pinTextures = this.createIconTextures(gl, this.pinTextureLocation);

    this.pinTextureMap = createPinTextureMap(gl, this.pinsGlData.program);

    this.clusterTextureMap = createClusterTextureMap(
      gl,
      this.clustersGlData.program
    );

    const allPinData = this.createPinData(
      gl,
      this.pinsGlData.program,
      this.clustersGlData.program
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

  setUniformValues = (
    gl: WebGL2RenderingContext,
    clustersProgram: WebGLProgram,
    pinsProgram: WebGLProgram
  ) => {
    /* store buffer location for matrix uniform */
    this.clustersGlData.matrixBufferLocation = gl.getUniformLocation(
      clustersProgram,
      "u_matrix"
    );
    this.pinsGlData.matrixBufferLocation = gl.getUniformLocation(
      pinsProgram,
      "u_matrix"
    );

    /* store eye uniforms buffer location (needed to increase mercator projection resolution) */
    this.clustersGlData.eyeHighBufferLocation = gl.getUniformLocation(
      clustersProgram,
      "u_eyeHigh"
    );
    this.clustersGlData.eyeLowBufferLocation = gl.getUniformLocation(
      clustersProgram,
      "u_eyeLow"
    );
    this.pinsGlData.eyeHighBufferLocation = gl.getUniformLocation(
      pinsProgram,
      "u_eyeHigh"
    );
    this.pinsGlData.eyeLowBufferLocation = gl.getUniformLocation(
      pinsProgram,
      "u_eyeLow"
    );

    /* store background texture buffer uniform location */
    this.clustersGlData.backgroundBufferLocation = gl.getUniformLocation(
      clustersProgram,
      "u_bgTexture"
    );
    this.pinsGlData.backgroundBufferLocation = gl.getUniformLocation(
      pinsProgram,
      "u_bgTexture"
    );

    /* store pin icon texture uniform location */
    this.pinTextureLocation = gl.getUniformLocation(
      pinsProgram,
      "u_iconTexture"
    );
  };

  createPinShapeTexture = (
    gl: WebGLRenderingContext,
    program: WebGLProgram
  ) => {
    const def = getDefaultImageSettings(gl);

    const bufferLoc = gl.getUniformLocation(program, "u_pinShapeTexture");

    const buffer = create1x1Texture(gl, [0, 0, 0, 0]);

    const image = new Image();
    image.onload = () => {
      image.width = 256;
      image.height = 256;

      gl.bindTexture(gl.TEXTURE_2D, buffer);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(
        gl.TEXTURE_2D,
        def.level,
        def.internalFormat,
        def.srcFormat,
        def.srcType,
        image
      );
      gl.generateMipmap(gl.TEXTURE_2D);

      this.map?.triggerRepaint();
    };
    image.onerror = console.error;
    image.src = pinShape;
    return { bufferLoc, buffer };
  };

  createIconTextures = (
    gl: WebGLRenderingContext,
    bufferLoc: WebGLUniformLocation | null
  ) => {
    /* sets a temporary transparent texture,
    asynchronously loads actual icons which are then copied to GPU buffer */
    const def = getDefaultImageSettings(gl);

    return Object.keys(data.actions).reduce(
      (acc: PinIconTextures, actionKey) => {
        const action = data.actions[actionKey];

        const buffer = create1x1Texture(gl, [0, 0, 0, 0]);

        const image = new Image();
        image.onload = () => {
          image.width = 128;
          image.height = 128;

          gl.bindTexture(gl.TEXTURE_2D, buffer);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.texImage2D(
            gl.TEXTURE_2D,
            def.level,
            def.internalFormat,
            def.srcFormat,
            def.srcType,
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
    const def = getDefaultImageSettings(gl);

    const bufferLoc = gl.getUniformLocation(program, "a_clusterTexture");

    const buffer = create1x1Texture(gl, [0, 0, 0, 0]);

    const image = new Image();
    image.onload = () => {
      image.width = 128;
      image.height = 128;

      gl.bindTexture(gl.TEXTURE_2D, buffer);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(
        gl.TEXTURE_2D,
        def.level,
        def.internalFormat,
        def.srcFormat,
        def.srcType,
        image
      );
      gl.generateMipmap(gl.TEXTURE_2D);

      this.map?.triggerRepaint();
    };
    image.onerror = console.error;
    image.src = glyphUrl as string;
    return { bufferLoc, buffer };
  };

  getPinSize = () => {
    const base = 0.000009,
      min = 1.7707306199099548e-7,
      max = 0.000014877851150174592;

    const point1 = new Point(0, 0);
    const point2 = new Point(0.1, 0);
    const proj1 = this.map?.unproject(point1);
    const proj2 = this.map?.unproject(point2);
    if (!(proj1 && proj2)) {
      return base;
    }

    const diff = Math.abs((proj1.lng - proj2.lng) / 2);
    const clamped = Math.min(Math.max(diff, min), max);

    return diff === undefined ? base : clamped;
  };

  createPinData = (
    gl: WebGLRenderingContext,
    programPins: WebGLProgram,
    programClusters: WebGLProgram
  ) => {
    const size = this.getPinSize();

    return this.clusters.reduce(
      (
        acc: { clusters: RenderableClusters; pins: RenderablePins },
        cluster
      ) => {
        let vertices = getPinVertices(cluster, size);
        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(vertices.flat()),
          gl.STATIC_DRAW
        );

        const pinData = {
          posBuffer,
          verticesCount: vertices.length
        };
        const possessionKey = cluster.pins[0].possessionType,
          actionKey = cluster.pins[0].action;

        if (cluster.pins.length === 1) {
          /* it's-a-pin */
          if (!acc.pins[possessionKey]) {
            const texture = this.pinBackgrounds[possessionKey];
            acc.pins[possessionKey] = {
              texture,
              data: {}
            };
          }
          if (!acc.pins[possessionKey].data[actionKey]) {
            const texture = this.pinTextures[actionKey];
            acc.pins[possessionKey].data[actionKey] = {
              texture,
              data: []
            };
          }

          const posBufferLoc = gl.getAttribLocation(programPins, "a_pinLoc");

          acc.pins[possessionKey].data[actionKey].data.push({
            ...pinData,
            posBufferLoc
          });
        } else {
          /* it's-a-cluster */
          const clusterSize = cluster.pins.length;
          if (!acc.clusters[possessionKey]) {
            const texture = this.clusterBackgrounds[possessionKey];
            acc.clusters[possessionKey] = { texture, data: [] };
          }
          if (!acc.clusters[possessionKey].data[clusterSize]) {
            const texture = this.createClusterTexture(
              gl,
              programClusters,
              cluster.pins.length.toString()
            );
            acc.clusters[possessionKey].data[clusterSize] = {
              texture,
              data: []
            };
          }

          const posBufferLoc = gl.getAttribLocation(
            programClusters,
            "a_pinLoc"
          );

          acc.clusters[possessionKey].data[clusterSize].data.push({
            ...pinData,
            posBufferLoc
          });
        }

        return acc;
      },
      { clusters: {}, pins: {} }
    );
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
    if (!this.clustersGlData.program) {
      return;
    }
    gl.useProgram(this.clustersGlData.program);

    gl.uniformMatrix4fv(
      this.clustersGlData.matrixBufferLocation,
      false,
      matrix
    );

    gl.uniform4fv(this.clustersGlData.eyeHighBufferLocation, eyeHigh);
    gl.uniform4fv(this.clustersGlData.eyeLowBufferLocation, eyeLow);

    this.renderClusters(gl);

    /* pins go on top of the clusters */
    if (!this.pinsGlData.program) {
      return;
    }

    gl.useProgram(this.pinsGlData.program);

    gl.uniformMatrix4fv(this.pinsGlData.matrixBufferLocation, false, matrix);

    gl.uniform4fv(this.pinsGlData.eyeHighBufferLocation, eyeHigh);
    gl.uniform4fv(this.pinsGlData.eyeLowBufferLocation, eyeLow);

    this.renderPins(gl);
  };

  renderClusters = (gl: WebGLRenderingContext) => {
    /* cluster icon texture map */
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

    /* cluster shape texture map */
    gl.bindBuffer(gl.ARRAY_BUFFER, this.clusterShapeTextureMap.buffer);

    gl.vertexAttribPointer(
      this.clusterShapeTextureMap.bufferLoc,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(this.clusterShapeTextureMap.bufferLoc);

    Object.values(this.clusterData).forEach(possession => {
      /* cluster shape  texture */
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, possession.texture.buffer);
      gl.uniform1i(possession.texture.bufferLoc, 1);

      Object.values(possession.data).forEach(size => {
        /* icon texture */
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, size.texture.buffer);
        gl.uniform1i(size.texture.bufferLoc, 2);

        size.data.forEach(cluster => {
          /* pin shape */
          gl.bindBuffer(gl.ARRAY_BUFFER, cluster.posBuffer);

          gl.vertexAttribPointer(
            cluster.posBufferLoc,
            4,
            gl.FLOAT,
            false,
            0,
            0
          );
          gl.enableVertexAttribArray(cluster.posBufferLoc);

          gl.drawArrays(gl.TRIANGLE_FAN, 0, cluster.verticesCount);
        });
      });
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

    /* pin shape texture map */
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pinShapeTextureMap.buffer);

    gl.vertexAttribPointer(
      this.pinShapeTextureMap.bufferLoc,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(this.pinShapeTextureMap.bufferLoc);

    /* pin shape texture */
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.pinShapeTexture.buffer);
    gl.uniform1i(this.pinShapeTexture.bufferLoc, 0);

    Object.values(this.pinData).forEach(possessionGroup => {
      /* bg 1x1 texture */
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, possessionGroup.texture.buffer);
      gl.uniform1i(possessionGroup.texture.bufferLoc, 1);

      Object.values(possessionGroup.data).forEach(actionGroup => {
        /* icon texture */
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, actionGroup.texture.buffer);
        gl.uniform1i(actionGroup.texture.bufferLoc, 2);

        actionGroup.data.forEach(pin => {
          /* pin shape */
          gl.bindBuffer(gl.ARRAY_BUFFER, pin.posBuffer);

          gl.vertexAttribPointer(pin.posBufferLoc, 4, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(pin.posBufferLoc);

          gl.drawArrays(gl.TRIANGLE_FAN, 0, pin.verticesCount);
        });
      });
    });
  };

  updatePins = (pins: PinCluster[]) => {
    this.clusters = pins;
    const gl = this.map?.getCanvas().getContext("webgl");
    if (!(gl && this.pinsGlData.program && this.clustersGlData.program)) {
      return;
    }
    const allPinData = this.createPinData(
      gl,
      this.pinsGlData.program,
      this.clustersGlData.program
    );

    this.pinData = allPinData.pins;
    this.clusterData = allPinData.clusters;

    this.map?.triggerRepaint();
  };
}
