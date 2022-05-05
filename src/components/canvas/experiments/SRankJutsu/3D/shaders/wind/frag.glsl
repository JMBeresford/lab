#define S smoothstep
#define TIME_FACTOR uTime * 18.0
#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uNoiseScale;
uniform float uNoiseSize;
uniform vec3 uCurveColor1;
uniform vec3 uCurveColor2;
uniform vec3 uStretch;

varying vec3 vWorldPos;
varying float vFade;

#pragma glslify: noise = require(../partials/cellular);
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

mat3 rotateY(float a) {
  float s = sin(a), c = cos(a);

  return mat3(
    c, 0, s,
    0, 1, 0,
    -s, 0, c
  );
}

mat3 rotateX(float a) {
  float s = sin(a), c = cos(a);

  return mat3(
    1, 0, 0,
    0, c, -s,
    0, s, c
  );
}

mat3 rotateZ(float a) {
  float s = sin(a), c = cos(a);

  return mat3(
    c, -s, 0,
    s, c, 0,
    0, 0, 1
  );
}

mat3 scale(vec3 s) {
  return mat3(
    s.x, 0, 0,
    0, s.y, 0,
    0, 0, s.z
  );
}

void main() {
  vec3 stretch = uStretch;

  float time = TIME_FACTOR + length(vWorldPos);

  vec3 noisePos = rotateY(TIME_FACTOR) * vWorldPos * stretch;
  noisePos.y -= TIME_FACTOR * 0.5;

  vec3 modulatedPos = noisePos + snoise3(noisePos + uTime);

  float lines = snoise3(modulatedPos * uNoiseScale); // * (1.0 - (vWorldPos.y + 1.0) / 2.0);

  lines = S(uNoiseSize, 0.75, lines);

  lines = clamp(lines, 0.0, 1.0);

  vec3 color = mix(uCurveColor1, uCurveColor2, lines);

  float alpha = S(0.0, 0.8, lines * (1.0 - vFade));

  gl_FragColor = vec4(color, alpha);
}