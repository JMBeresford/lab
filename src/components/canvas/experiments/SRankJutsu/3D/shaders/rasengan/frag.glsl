#define S smoothstep
#define TIME_FACTOR uTime * 15.0

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

varying vec3 vWorldPos;
varying vec3 vWorldNormal;

void main() {
  vec2 screenPos = ((gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0) * uAspect;
  float str = (uCoreSize + sin(TIME_FACTOR) * 0.025) / length(screenPos);

  str = 1.0;

  vec3 color = vec3(0.0);

  vec3 norm = normalize(vWorldNormal);
  vec3 viewDir = normalize(vWorldPos - cameraPosition);
  
  float outerFresnel = (uFresnelOffset - abs(dot(viewDir, norm))) * uFresnelMultiplier;
  outerFresnel = pow(max(0.0, outerFresnel), uFresnelExponent);

  color += uFresnelColor * outerFresnel;

  float coreOffset = uInnerFresnelOffset + sin(uTime * 30.0) * 0.01;

  float innerFresnel = (coreOffset - abs(dot(viewDir, norm))) * uCoreSize;
  innerFresnel = pow(max(0.0, 1.0 - innerFresnel), uInnerFresnelExponent);

  color += uCoreColor * innerFresnel;

  float alpha = clamp(str + outerFresnel, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}