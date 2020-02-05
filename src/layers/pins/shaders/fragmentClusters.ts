/* GLSL source for fragment shader */
export default `
precision mediump float;

uniform sampler2D u_bgTexture;
// uniform sampler2D u_clusterShapeTexture;
uniform sampler2D a_clusterTexture;

varying vec2 v_iconShapeCoord;
varying vec2 v_iconCoord;

void main() {
  vec4 clusterShapeColor = texture2D(u_bgTexture, v_iconShapeCoord);
  

  if (clusterShapeColor.a < 0.1 ||
    v_iconShapeCoord.x < 0.0 ||
    v_iconShapeCoord.y < 0.0 ||
    v_iconShapeCoord.x > 1.0 ||
    v_iconShapeCoord.y > 1.0) {
    discard;
  }

  vec4 iconColor = texture2D(a_clusterTexture, v_iconCoord);

  if (iconColor.a > 0.1 && 
    v_iconCoord.x > 0.0 &&
    v_iconCoord.y > 0.0 &&
    v_iconCoord.x < 1.0 &&
    v_iconCoord.y < 1.0
  ) {
    gl_FragColor = iconColor;
    return;
  }

  gl_FragColor = clusterShapeColor;
}`;
