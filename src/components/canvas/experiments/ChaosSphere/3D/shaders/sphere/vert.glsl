uniform float uTime;
uniform vec3 uAmp;
uniform vec3 uDetail;
uniform int uFbmOctaves;

varying vec3 vNormal;

#define FBM_INIT_AMP 0.5
#define FBM_INIT_FREQ 1.0
#define FBM_GAIN 0.5
#define FBM_LACUNARITY 2.0

#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)

float fbm(vec2 p) {
  float f = 0.0;
  float a = FBM_INIT_AMP;
  float fq = FBM_INIT_FREQ;
  for (int i = 0; i < uFbmOctaves; i++) {
    f += a * cnoise2(p * fq);
    a *= FBM_GAIN;
    fq *= FBM_LACUNARITY;
  }
  return f;
}

void main() {
  vec3 pos = position;

  vec3 displacement = vec3(
    fbm(vec2(pos.x * uDetail.x, uTime)) * uAmp.x,
    fbm(vec2(pos.y * uDetail.y, uTime)) * uAmp.y,
    fbm(vec2(pos.z * uDetail.z, uTime)) * uAmp.z
  );

  pos += displacement;

  vNormal = normalize(pos);

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;
}