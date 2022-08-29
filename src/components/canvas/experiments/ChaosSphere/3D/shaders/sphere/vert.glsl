// precision highp float;
uniform float uTime;
uniform float uAmp;
uniform float uDetail;
uniform int uFbmOctaves;
uniform vec2 uResolution;
uniform vec2 uLightIntensity;
uniform vec3 uLight1Color;
uniform vec3 uLight2Color;
uniform vec3 uFresnelColor;
uniform vec3 uColor;

varying vec3 vColor;

#define PI 3.1415926535897932384626433832795
#define FBM_INIT_AMP 0.5
#define FBM_INIT_FREQ 1.0
#define FBM_GAIN 0.675
#define FBM_LACUNARITY 4.0

#define LIGHT1POS1 (vec3(-4.3, 5.0, 4.2) * 1.65)
#define LIGHT1POS2 (vec3(-2.85, 3.2, -2.9) * 1.35)
#define LIGHT1POS3 vec3(-3.0, 5.0, 0.0)

#define LIGHT2POS1 (vec3(3.2, -4.2, -4.12) * 1.35)
#define LIGHT2POS2 (vec3(1.9, -6.0, 2.8) * 1.65)
#define LIGHT2POS3 vec3(3.0, -5.0, 0.0)

#pragma glslify: cnoise = require(glsl-noise/classic/4d)
#pragma glslify: blendLighten = require(glsl-blend/lighten)

float fbm(vec4 p) {
  float f = 0.0;

  float a = FBM_INIT_AMP;
  float fq = FBM_INIT_FREQ;
  for(int i = 0; i < uFbmOctaves; i++) {
    f += a * cnoise(p * fq);
    a *= FBM_GAIN;
    fq *= FBM_LACUNARITY;
  }
  return f;
}

float domainDistort(vec4 p) {
  float f = fbm(p);

  return fbm(p + f);
}

void main() {
  vec3 pos = position;

  float displacement = domainDistort(vec4(pos * uDetail, uTime)) * uAmp;

  pos += displacement * position;

  //
  // --- recalculate normals ---
  //
  float d1 = (2.0 * PI) / uResolution.x;
  float d2 = PI / uResolution.x;

  vec3 biTangent = cross(normal, tangent.xyz);

  // get the displaced positions of nearby vertices
  vec3 p1 = position + tangent.xyz * d1;
  float displacement1 = domainDistort(vec4(p1 * uDetail, uTime)) * uAmp;
  vec3 newp1 = p1 + displacement1 * p1;

  vec3 p2 = position + biTangent.xyz * d2;
  float displacement2 = domainDistort(vec4(p2 * uDetail, uTime)) * uAmp;
  vec3 newp2 = p2 + displacement2 * p2;

  vec3 newNormal = normalize(cross(newp1 - pos, newp2 - pos));

  // calculate fresnel
  vec3 viewDir = normalize(pos - cameraPosition);
  float fresnel = (1.05 + dot(viewDir, newNormal)) * 1.3;
  fresnel = pow(abs(fresnel), 7.0);

  // compose lighting
  vec3 col = uColor;

  float light1 = max(dot(newNormal, normalize(LIGHT1POS1)), 0.0) * uLightIntensity.x;
  light1 += max(dot(newNormal, normalize(LIGHT1POS2)), 0.0) * uLightIntensity.x;
  light1 += max(dot(newNormal, normalize(LIGHT1POS3)), 0.0) * uLightIntensity.x;

  float light2 = max(dot(newNormal, normalize(LIGHT2POS1)), 0.0) * uLightIntensity.y;
  light2 += max(dot(newNormal, normalize(LIGHT2POS2)), 0.0) * uLightIntensity.y;
  light2 += max(dot(newNormal, normalize(LIGHT2POS3)), 0.0) * uLightIntensity.y;

  col += light1 * uLight1Color;
  col += light2 * uLight2Color;
  col += fresnel * uFresnelColor;

  // col = blendLighten(col, uLight1Color, light1);
  // col = blendLighten(col, uLight2Color, light2);
  // col = blendLighten(col, uFresnelColor, fresnel);

  vColor = col;

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;
}