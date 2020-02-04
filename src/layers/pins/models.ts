import { PinCluster } from "../../staticData/pins";

export interface Args {
  map?: mapboxgl.Map;
  clusters: PinCluster[];
  handleClick?(vehicleId?: string): void;
}

export interface Texture {
  bufferLoc: WebGLUniformLocation | null;
  buffer: WebGLTexture | null;
}

export interface Buffer {
  bufferLoc: number;
  buffer: WebGLBuffer | null;
}

export type PinBackgroundTextures = Record<string, Texture>;
export type PinIconTextures = Record<string, Texture>;

export interface PinData {
  posBufferLoc: number;
  posBuffer: WebGLBuffer | null;
  verticesCount: number;
  possessionKey: string;
  actionKey: string;
}

export interface RenderablePins {
  [possession: string]: {
    texture: Texture;
    data: {
      [action: string]: {
        texture: Texture;
        data: PinData[];
      };
    };
  };
}

export interface RenderableClusters {
  [possession: string]: {
    texture: Texture;
    data: {
      [size: number]: {
        texture: Texture;
        data: PinData[];
      };
    };
  };
}

export interface Possessions {
  [key: string]: {
    name: string;
    fColor: number[];
    rgbColor: number[];
  };
}
