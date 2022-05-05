#define S smoothstep

uniform float uTime;
uniform float uOuterRadius;
uniform float uInnerRadius;

varying vec3 vWorldPos;
varying float vFade;

#pragma glslify: snoise = require(glsl-noise/simplex/3d)

void main() {
  vec3 pos = position;

  float distFromCenter = length(pos.xy);

  float radiiDiff = uOuterRadius - uInnerRadius;
  float midPoint = uInnerRadius + (radiiDiff * 0.5);
  float distFromEdges = abs(distFromCenter - midPoint);

  pos.z += max(0.0, (uOuterRadius - distFromCenter) * 0.75);
  //pos = position + (abs(snoise(position + uTime)) * 0.05) * normalize(position);

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;

  vWorldPos = modelPos.xyz;
  vFade = S(0.0, 0.5 * (radiiDiff * 0.5), distFromEdges);
}