/* GLSL source: vertex shader */
export default `
uniform mat4 u_matrix;
      
attribute vec2 a_iconMap;
attribute vec2 a_pos;

varying vec2 v_iconCoord;

void main() {
  gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
  v_iconCoord = a_iconMap;
}`;
