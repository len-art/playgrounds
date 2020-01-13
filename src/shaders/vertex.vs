precision mediump float;
varying vec4 color;
void main() {
  gl_FragColor = color;
}


uniform mat4 u_matrix;
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec4 color;

void main() {
  gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
  gl_PointSize = 20.0;
  color = vec4(a_Color, 1.0);
  // color = vec4(1.0,0.0,0.0,0.8);
}