import React from "react";

const vertexShaderSource = `
attribute vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`;

// Fragment shader program

const fragmentShaderSource = `
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

export default () => {
  const ref = React.createRef<HTMLCanvasElement>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => init(), []);

  const init = () => {
    if (!ref.current) {
      return;
    }
    const gl = ref.current.getContext("webgl");
    if (!gl) {
      return;
    }
    console.log(gl);

    const program = initShaderProgram(
      gl,
      vertexShaderSource,
      fragmentShaderSource
    );
  };

  const initShaderProgram = (
    gl: WebGLRenderingContext,
    vsSource: string,
    fsSource: string
  ) => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    // Create the shader program

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
      console.error("no shader program");
      return;
    }
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    return shaderProgram;
  };

  function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);

    if (!shader) {
      return null;
    }

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  return <canvas ref={ref} style={{ width: "500px", height: "500px" }} />;
};
