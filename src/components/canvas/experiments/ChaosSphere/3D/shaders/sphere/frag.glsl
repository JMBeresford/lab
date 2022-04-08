uniform vec3 uLight1Color;
uniform vec3 uLight2Color;
uniform vec3 uColor;

varying vec3 vNormal;

#define LIGHT1POS vec3(-3.0, 5.0, 2.0)
#define LIGHT2POS vec3(3.0, -5.0, -2.0)

#pragma glslify: blendSoftLight = require(glsl-blend/soft-light)
#pragma glslify: blendLighten = require(glsl-blend/lighten)

void main() {
  vec3 col = uColor;

  float light1 = max(dot(vNormal, normalize(LIGHT1POS)), 0.0);
  float light2 = max(dot(vNormal, normalize(LIGHT2POS)), 0.0);

  col += light1 * uLight1Color;
  col += light2 * uLight2Color;

  // col = blendLighten(col, uLight1Color, light1);
  // col = blendLighten(col, uLight2Color, light2);

  gl_FragColor = vec4(col, 1.0);
}