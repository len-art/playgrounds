import mapboxgl from "mapbox-gl";

import pinTextureShape from "../../obj/pinTextureShape";
import pinTextureShapeIcon from "../../obj/pinTextureShapeIcon";
import clusterObjectData from "../../obj/cluster";

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
  return Object.keys(possessions).reduce(
    (acc: PinBackgroundTextures, possessionKey) => {
      const colorValues = possessions[possessionKey].rgbColor;

      const buffer = create1x1Texture(gl, [...colorValues, 255]);

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

  let model;
  if (cluster.pins.length === 1) {
    model = pinTextureShape.groupedVertices;
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

export const createPinShapeTextureMap = (
  gl: WebGLRenderingContext,
  program: WebGLProgram
) => {
  /* creates a texture map for pin icons */
  const bufferLoc = gl.getAttribLocation(program, "a_pinShapeIconMap");
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(pinTextureShape.mesh.textures),
    gl.STATIC_DRAW
  );
  return {
    bufferLoc,
    buffer
  };
};

export const createPinTextureMap = (
  gl: WebGLRenderingContext,
  program: WebGLProgram
) => {
  /* creates a texture map for pin icons */
  const bufferLoc = gl.getAttribLocation(program, "a_pinIconMap");
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(pinTextureShapeIcon.mesh.textures),
    gl.STATIC_DRAW
  );
  return {
    bufferLoc,
    buffer
  };
};

export const createClusterTextureMap = (
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
