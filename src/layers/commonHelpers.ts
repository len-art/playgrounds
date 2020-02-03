/* creates a 1x1 texture with provided color in RGBA */
export const create1x1Texture = (
  gl: WebGLRenderingContext,
  color: number[]
) => {
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