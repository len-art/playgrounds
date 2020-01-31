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

export interface GlData {
  program: WebGLProgram | null;
  matrixBufferLocation: WebGLUniformLocation | null;
  eyeHighBufferLocation: WebGLUniformLocation | null;
  eyeLowBufferLocation: WebGLUniformLocation | null;
  backgroundBufferLocation: WebGLUniformLocation | null;
}

export interface PinData {
  posBufferLoc: number;
  posBuffer: WebGLBuffer | null;
  veticesCount: number;
  possessionKey: string;
  actionKey: string;
}

export interface ClusterData extends PinData {
  texture: Texture;
}

export interface Possessions {
  [key: string]: {
    name: string;
    fColor: number[];
    rgbColor: number[];
  };
}
