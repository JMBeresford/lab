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

varying vec3 vWorldPos;
varying vec3 vWorldNormal;

void main() {
  vec2 screenPos = ((gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0) * uAspect;
  float str = (uCoreSize + sin(TIME_FACTOR) * 0.025) / length(screenPos);

  str = pow(str, 2.0);

  vec3 color = uCoreColor * str;

  vec3 norm = normalize(vWorldNormal);
  vec3 viewDir = normalize(vWorldPos - cameraPosition);
  float fresnel = (uFresnelOffset - abs(dot(viewDir, norm))) * uFresnelMultiplier;
  fresnel = pow(max(0.0, fresnel), uFresnelExponent);

  color += uFresnelColor * fresnel;

  float alpha = clamp(str + fresnel, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}