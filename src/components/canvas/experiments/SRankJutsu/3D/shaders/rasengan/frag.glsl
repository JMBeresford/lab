#define S smoothstep
#define TIME_FACTOR uTime * 15.0
#define TIME_FACTOR_WIND uTime * 6.0 * uNoiseSpeed

uniform vec2 uResolution;
uniform vec2 uAspect;
uniform float uTime;
uniform vec3 uCoreColor;
uniform float uCoreSize;
uniform vec3 uFresnelColor;
uniform float uFresnelMultiplier;
uniform float uFresnelOffset;
uniform float uFresnelExponent;

uniform float uInnerFresnelExponent;
uniform float uInnerFresnelOffset;

uniform float uNoiseScale;
uniform float uNoiseSize;
uniform float uNoiseSpeed;
uniform vec3 uCurveColor1;
uniform vec3 uCurveColor2;

varying vec3 vWorldPos;
varying vec3 vWorldNormal;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

mat3 rotateY(float a) {
  float s = sin(a), c = cos(a);

  return mat3(
    c, 0, s,
    0, 1, 0,
    -s, 0, c
  );
}

void main() {
  vec3 color = vec3(0.0);

  vec3 norm = normalize(vWorldNormal);
  vec3 viewDir = normalize(vWorldPos - cameraPosition);
  
  float outerFresnel = (uFresnelOffset - abs(dot(viewDir, norm))) * uFresnelMultiplier;
  outerFresnel = pow(max(0.0, outerFresnel), uFresnelExponent);

  color += uFresnelColor * outerFresnel;

  float coreOffset = uInnerFresnelOffset + sin(TIME_FACTOR) * 0.01;

  float innerFresnel = (coreOffset - abs(dot(viewDir, norm))) * uCoreSize;
  innerFresnel = pow(max(0.0, 1.0 - innerFresnel), uInnerFresnelExponent);

  color += uCoreColor * innerFresnel;

  // WIND
  vec3 stretch = vec3(0.8, 7.3, 0.8);

  vec3 noisePos = rotateY(TIME_FACTOR_WIND) * vWorldPos * stretch;
  noisePos.y -= TIME_FACTOR_WIND * 0.5;

  vec3 modulatedPos = noisePos + snoise3(noisePos + uTime);

  float wind = snoise3(modulatedPos * uNoiseScale);

  wind = S(uNoiseSize, 0.75, wind) * 0.75;

  // wind = clamp(wind, 0.0, 1.0);

  vec3 windColor = mix(uCurveColor1, uCurveColor2, wind);

  color = mix(color, windColor, max(wind - outerFresnel, 0.0));

  float alpha = clamp(innerFresnel + outerFresnel + wind, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}