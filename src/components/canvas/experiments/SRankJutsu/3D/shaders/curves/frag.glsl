#define S smoothstep
#define TIME_FACTOR uTime * 180.0
#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uNoiseScale;
uniform float uNoiseSize;
uniform vec3 uCurveColor;

varying vec3 vWorldPos;

#pragma glslify: noise = require(../partials/cellular);

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
  vec3 p1 = rotateY(TIME_FACTOR * 0.8) * (vWorldPos * uNoiseScale);
  vec3 p2 =  rotateZ(TIME_FACTOR) * (vWorldPos * uNoiseScale);
  vec3 p3 =  rotateX(TIME_FACTOR * 0.6) * (vWorldPos * uNoiseScale);

  // magic numbers to find noise samples with no artifacts
  p1 += 10.0;
  p2 += 10.0;
  p3 += 10.0;

  float lines = S(uNoiseSize, 1.0, noise(p1).x);
  lines += S(uNoiseSize, 1.0, noise(p2).x);
  lines += S(uNoiseSize, 1.0, noise(p3).x);

  lines = clamp(lines, 0.0, 1.0);

  vec3 color = lines * uCurveColor;

  float alpha = clamp(lines, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}