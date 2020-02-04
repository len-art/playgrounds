import mapboxgl from "mapbox-gl";
import { lusolve, divide, flatten } from "mathjs";

import PinShaders from "./shaders";
import { PinCluster } from "../../staticData/pins";

import data from "../../staticData/pins";
import { isPointInPolygon } from "../../helpers/mapHelpers";
import typeface from "../../staticData/typeface";
import {
  Args,
  Buffer,
  PinBackgroundTextures,
  PinIconTextures,
  RenderablePins,
  RenderableClusters
} from "./models";
import { GlData } from "../commonModels";
import {
  createBackgroundTextures,
  getPinVertices,
  createPinTextureMap,
  createClusterTextureMap
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

  // pinData: PinData[] = [];
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
    const zoom = this.map?.getZoom();

    const clickedCluster = this.clusters.reduce(
      (acc: PinCluster | undefined, cluster) => {
        if (acc) {
          return acc;
        }
        const vertices = getPinVertices(cluster, zoom);

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

    this.pinBackgrounds = createBackgroundTextures(
      gl,
      this.pinsGlData.backgroundBufferLocation,
      data.possessions
    );
    this.clusterBackgrounds = createBackgroundTextures(
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

  createIconTextures = (
    gl: WebGLRenderingContext,
    bufferLoc: WebGLUniformLocation | null
  ) => {
    /* sets a temporary transparent texture,
    asynchronously loads actual icons which are then copied to GPU buffer */
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;

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

    const buffer = create1x1Texture(gl, [0, 0, 0, 0]);

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

  createPinData = (
    gl: WebGLRenderingContext,
    programPins: WebGLProgram,
    programClusters: WebGLProgram
  ) => {
    const zoom = this.map?.getZoom();

    return this.clusters.reduce(
      (
        acc: { clusters: RenderableClusters; pins: RenderablePins },
        cluster
      ) => {
        let vertices = getPinVertices(cluster, zoom);
        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(vertices.flat()),
          gl.STATIC_DRAW
        );

        const pinData = {
          posBuffer,
          verticesCount: vertices.length,
          possessionKey: cluster.pins[0].possessionType,
          actionKey: cluster.pins[0].action
        };

        if (cluster.pins.length === 1) {
          /* it's-a-pin */
          if (!acc.pins[pinData.possessionKey]) {
            const texture = this.pinBackgrounds[pinData.possessionKey];
            acc.pins[pinData.possessionKey] = {
              texture,
              data: {}
            };
          }
          if (!acc.pins[pinData.possessionKey].data[pinData.actionKey]) {
            const texture = this.pinTextures[pinData.actionKey];
            acc.pins[pinData.possessionKey].data[pinData.actionKey] = {
              texture,
              data: []
            };
          }
          const posBufferLoc = gl.getAttribLocation(programPins, "a_pinLoc");
          acc.pins[pinData.possessionKey].data[pinData.actionKey].data.push({
            ...pinData,
            posBufferLoc
          });
        } else {
          /* it's-a-cluster */
          const clusterSize = cluster.pins.length;
          if (!acc.clusters[pinData.possessionKey]) {
            const texture = this.clusterBackgrounds[pinData.possessionKey];
            acc.clusters[pinData.possessionKey] = { texture, data: [] };
          }
          if (!acc.clusters[pinData.possessionKey].data[clusterSize]) {
            const texture = this.createClusterTexture(
              gl,
              programClusters,
              cluster.pins.length.toString()
            );
            acc.clusters[pinData.possessionKey].data[clusterSize] = {
              texture,
              data: []
            };
          }

          const posBufferLoc = gl.getAttribLocation(
            programClusters,
            "a_pinLoc"
          );

          acc.clusters[pinData.possessionKey].data[clusterSize].data.push({
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

    Object.values(this.clusterData).forEach(possession => {
      /* bg 1x1 texture */
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, possession.texture.buffer);
      gl.uniform1i(possession.texture.bufferLoc, 0);

      Object.values(possession.data).forEach(size => {
        /* icon texture */
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, size.texture.buffer);
        gl.uniform1i(size.texture.bufferLoc, 1);

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

    Object.values(this.pinData).forEach(possessionGroup => {
      /* bg 1x1 texture */
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, possessionGroup.texture.buffer);
      gl.uniform1i(possessionGroup.texture.bufferLoc, 0);

      Object.values(possessionGroup.data).forEach(actionGroup => {
        /* icon texture */
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, actionGroup.texture.buffer);
        gl.uniform1i(actionGroup.texture.bufferLoc, 1);

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
    console.log(allPinData);

    this.pinData = allPinData.pins;
    this.clusterData = allPinData.clusters;

    this.map?.triggerRepaint();
  };
}
