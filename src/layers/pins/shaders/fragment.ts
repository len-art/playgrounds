/* GLSL source for fragment shader */
export default `
precision mediump float;

uniform sampler2D u_bgTexture;
uniform sampler2D u_pinShapeTexture;
uniform sampler2D u_iconTexture;

varying vec2 v_iconShapeCoord;
varying vec2 v_iconCoord;

void main() {
  vec4 pinShapeColor = texture2D(u_pinShapeTexture, v_iconShapeCoord);

  if (pinShapeColor.a < 0.1 ||
    v_iconShapeCoord.x < 0.0 ||
    v_iconShapeCoord.y < 0.0 ||
    v_iconShapeCoord.x > 1.0 ||
    v_iconShapeCoord.y > 1.0) {
    discard;
  }
  
  vec4 iconColor = texture2D(u_iconTexture, v_iconCoord);
  if (iconColor.a > 0.1 && 
    v_iconCoord.x > 0.0 &&
    v_iconCoord.y > 0.0 &&
    v_iconCoord.x < 1.0 &&
    v_iconCoord.y < 1.0
  ) {
    gl_FragColor = iconColor;
    return;
  }

  vec4 bgColor = texture2D(u_bgTexture, vec2(0.0, 0.0));

  gl_FragColor = bgColor;
}`;
