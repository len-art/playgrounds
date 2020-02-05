/* GLSL source for vertex shader */
export default `
uniform mat4 u_matrix;
uniform vec4 u_eyeHigh;
uniform vec4 u_eyeLow;
      
attribute vec2 a_pinShapeIconMap;
attribute vec2 a_pinIconMap;
attribute vec4 a_pinLoc;

varying vec2 v_iconShapeCoord;
varying vec2 v_iconCoord;

void main() {
  gl_Position = vec4(vec3(a_pinLoc.xy, 0.0) - u_eyeHigh.xyz, 0.0); //subtract vertex pos from camera pos 
  gl_Position += vec4(vec3(a_pinLoc.zw, 0.0) - u_eyeLow.xyz, 0.0);
  gl_Position = u_matrix * gl_Position; //apply view-projection matrix
  gl_Position.w += u_eyeHigh.w; //fix w_clip coordinates

  v_iconShapeCoord = a_pinShapeIconMap;
  v_iconCoord = a_pinIconMap;
}`;
