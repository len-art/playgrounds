
uniform mat4 u_matrix;
attribute vec2 a_pos;
void main (){
  gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
}
