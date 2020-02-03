export interface GlData {
  program: WebGLProgram | null;
  matrixBufferLocation: WebGLUniformLocation | null;
  eyeHighBufferLocation: WebGLUniformLocation | null;
  eyeLowBufferLocation: WebGLUniformLocation | null;
  backgroundBufferLocation: WebGLUniformLocation | null;
}
