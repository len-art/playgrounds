import mapboxgl from "mapbox-gl";

import textureMappedSquare from "../../obj/textureMappedSquare";

import { PinBackgroundTextures, Possessions } from "./models";
import { PinCluster } from "../../staticData/pins";

import { create1x1Texture } from "../commonHelpers";

export const getDefaultImageSettings = (gl: WebGLRenderingContext) => ({
  level: 0,
  internalFormat: gl.RGBA,
  srcFormat: gl.RGBA,
  srcType: gl.UNSIGNED_BYTE
});

/* creates background textures for every possession */
export const createBackgroundTextures = (
  gl: WebGLRenderingContext,
  bufferLoc: WebGLUniformLocation | null,
  possessions: Possessions
) => {
  // const def = getDefaultImageSettings(gl);
  return Object.keys(possessions).reduce(
    (acc: PinBackgroundTextures, possessionKey) => {
      const colorValues = possessions[possessionKey].rgbColor;
      // const svg = possessions[possessionKey].svg;

      const buffer = create1x1Texture(gl, [...colorValues, 255]);
      acc[possessionKey] = { bufferLoc, buffer };

      return acc;
    },
    {}
  );
};

/* creates background textures for clusters for every possession */
export const createClusterBackgroundTextures = (
  gl: WebGLRenderingContext,
  bufferLoc: WebGLUniformLocation | null,
  possessions: Possessions
) => {
  const def = getDefaultImageSettings(gl);
  return Object.keys(possessions).reduce(
    (acc: PinBackgroundTextures, possessionKey) => {
      const colorValues = possessions[possessionKey].rgbColor;
      const svg = possessions[possessionKey].svg;

      const buffer = create1x1Texture(gl, [...colorValues, 255]);

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
      };
      image.onerror = console.error;
      image.src = svg;

      acc[possessionKey] = { bufferLoc, buffer };

      return acc;
    },
    {}
  );
};

const getClusterSizeOffset = (size: number) => {
  const squared = size ** 2;
  return ~~((squared / (squared + 300)) * 12);
};

export const getPinVertices = (cluster: PinCluster, baseSize: number) => {
  const offsetPx = getClusterSizeOffset(cluster.pins.length);
  const offset = (baseSize / 10) * offsetPx;
  const r = baseSize + offset;

  const loc = mapboxgl.MercatorCoordinate.fromLngLat(cluster.pins[0].location);

  const c = [loc.x, loc.y - r];

  const vertices = textureMappedSquare.groupedVertices.map(v => {
    const x = c[0] + r * v[0];
    const y = c[1] + r * v[1];
    return [x, y, x - Math.fround(x), y - Math.fround(y)];
  });

  return vertices;
};

export const createShapeTextureMap = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  attributeName: string,
  mesh: any
) => {
  /* creates a texture map with provided attribute variable name and mesh */
  const bufferLoc = gl.getAttribLocation(program, attributeName);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(mesh.textures),
    gl.STATIC_DRAW
  );
  return {
    bufferLoc,
    buffer
  };
};
