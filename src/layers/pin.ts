import mapboxgl from "mapbox-gl";

import PinShaders from "../shaders/pin";
import { PinCluster } from "../data";
import pinObjectData from "../obj/pin";

import data from "../data";

interface Args {
  map?: mapboxgl.Map;
  pins: PinCluster[];
  onClick(): void;
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
  pins: PinCluster[];

  program: WebGLProgram | null = null;

  pinBackgrounds: PinBackgroundTextures = {};

  pinTextures: PinIconTextures = {};

  pinTextureMap: Buffer = {
    bufferLoc: 0,
    buffer: null
  };

  pinData: PinData[] = [];

  constructor(args: Args) {
    this.map = args.map;
    this.pins = args.pins;

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
        }
      });
  }

  onAdd = (map: mapboxgl.Map, gl: WebGL2RenderingContext) => {
    /* called when layer is added */
    this.program = this.createProgram(gl);
    if (!this.program) {
      return;
    }

    this.pinBackgrounds = this.createBackgroundTextures(gl);

    this.pinTextures = this.createIconTextures(gl);

    this.pinTextureMap = this.createPinTextureMap(gl);

    this.pinData = this.createPinData(gl, data.pins);
  };

  createProgram = (gl: WebGL2RenderingContext) => {
    /* create and compile a vertex shader */
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (vertexShader) {
      gl.shaderSource(vertexShader, PinShaders.vertex);
      gl.compileShader(vertexShader);
      const log = gl.getShaderInfoLog(vertexShader);
      if (log && log.length) {
        console.error("Vertex Shader Error", log);
      }
    }

    /* create and compile a fragment shader */
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fragmentShader) {
      gl.shaderSource(fragmentShader, PinShaders.fragment);
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
    const bufferLoc = gl.getAttribLocation(this.program, "a_iconMap");

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

  createPinData = (gl: WebGLRenderingContext, pins: PinCluster[]) => {
    /* creates pin data and copies needed information to GPU buffers */
    return pins.reduce((acc: PinData[], cluster) => {
      if (!this.program) {
        return acc;
      }
      const posBufferLoc = gl.getAttribLocation(this.program, "a_pinLoc");

      const vertices = this.getPinVertices(cluster);

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

  getPinVertices = (cluster: PinCluster) => {
    const r = 0.000009;
    const loc = mapboxgl.MercatorCoordinate.fromLngLat(
      cluster.pins[0].location
    );

    const c = [loc.x, loc.y - r];

    const vertices = pinObjectData.groupedVertices.map(v => [
      c[0] + r * v[0],
      c[1] + r * v[1]
    ]);

    return vertices;
  };

  render = (gl: WebGLRenderingContext, matrix: number[]) => {
    /* called every frame */
    gl.useProgram(this.program);
    if (!this.program) {
      return;
    }
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.program, "u_matrix"),
      false,
      matrix
    );

    this.pinData.forEach(pd => {
      if (!this.program) {
        return false;
      }
      /* bind and use vertex buffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, pd.posBuffer);

      gl.vertexAttribPointer(pd.posBufferLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(pd.posBufferLoc);

      /* icon texture map */
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
    const gl = this.map?.getCanvas().getContext("webgl");
    if (!gl) {
      return;
    }

    this.pinData = this.createPinData(gl, pins);
    this.map?.triggerRepaint();
  };
}
