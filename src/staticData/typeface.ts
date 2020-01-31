export interface GlyphInfos {
  x: number;
  y: number;
  w: number;
  nx: number;
  ny: number;
}

export interface GlyphInfosObject {
  [key: string]: GlyphInfos;
}

const createGlyphAtlas = () => {
  /* creates font glyph atlas by rendering text to canvas and converting it to image */
  // this is preferable to having separate textures for every cluster
  const canvas = document.createElement("canvas");
  // const canvas = document.getElementById("cnvs") as HTMLCanvasElement | null;
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  const letterWidth = 32;
  const fontSize = 32;
  const pixelRatio = window.devicePixelRatio || 1;
  const numbersPerRow = 4;
  const imageWidth = letterWidth * numbersPerRow;
  const imageHeight = imageWidth;

  canvas.style.width = `${imageWidth}px`;
  canvas.style.height = `${imageHeight}px`;
  canvas.width = imageWidth * pixelRatio;
  canvas.height = imageHeight * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);

  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#fff";
  const glyphInfos = Array.from(new Array(10), (_, i) => {
    const x = (i % numbersPerRow) * letterWidth, //- letterWidth * Math.floor(i / 3),
      y = Math.floor(i / numbersPerRow) * fontSize;

    ctx.fillText(i.toString(), x, y, letterWidth);
    return { value: i.toString(), x, y, w: letterWidth };
  }).reduce((acc: GlyphInfosObject, { value, x, y, w }) => {
    acc[value] = { x, y, w, nx: x / (128 / 2) - 1, ny: 1 - y / (128 / 2) };
    return acc;
  }, {});

  const img = document.createElement("img");
  // const img = document.getElementById("imgtest") as HTMLImageElement | null;

  if (!img) {
    return;
  }
  img.src = canvas.toDataURL();
  img.onload = () => {
    img.width = imageWidth;
    img.height = imageHeight;
  };
  return {
    atlasSrc: canvas.toDataURL(),
    img,
    letterHeight: fontSize,
    textureWidth: imageWidth,
    textureHeight: fontSize,
    glyphInfos
  };
};

const glyphAtals = createGlyphAtlas();

const getNextPowerOfTwo = (n: number) => {
  let value = 1;
  while (value < n) {
    value *= 2;
  }
  return value;
};

const canvas = document.createElement("canvas");
const createTextTexture = (text: string) => {
  /* creates font glyph atlas by rendering text to canvas and converting it to image */
  // const canvas = document.getElementById("cnvs") as HTMLCanvasElement | null;
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  const fontSize = 80;

  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textDimensions = ctx.measureText(text);

  const canvasSize = getNextPowerOfTwo(textDimensions.width);

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  ctx.font = `${fontSize - 5}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText(text, canvasSize / 2, canvasSize / 2);

  return canvas.toDataURL();
};

export default { createGlyphAtlas, glyphAtals, createTextTexture };
