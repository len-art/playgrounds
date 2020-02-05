/* GLSL source for fragment shader */
export default `
precision mediump float;

uniform sampler2D u_bgTexture;
uniform sampler2D u_iconTexture;
uniform sampler2D u_pinShapeTexture;

varying vec2 v_iconCoord;

void main() {
  vec4 bgColor = texture2D(u_bgTexture, vec2(0.0, 0.0));
  vec4 iconColor = texture2D(u_pinShapeTexture, v_iconCoord);

  if ( v_iconCoord.x < 0.0 ||
    v_iconCoord.y < 0.0 ||
    v_iconCoord.x > 1.0 ||
    v_iconCoord.y > 1.0) {
    gl_FragColor = bgColor;
  } else {
    gl_FragColor = iconColor;
  }
}`;
