#define DIR vec3(0.0, -1.0, 0.0)
#define HEIGHT 12.0
#define RADIUS 0.65

uniform float uGlowCenterFalloff;
uniform float uGlowFalloff;
uniform float uGlowMax;

varying float vGlow;

// #pragma glslify: inverseMat = require(glsl-inverse)

void main() {
  vec3 objSpaceCam = vec3(inverse(modelMatrix) * vec4(cameraPosition, 1.0));

  vec3 objectViewDir = normalize(position - objSpaceCam);

  // SHORTEST DIST BETWEEN TWO LINES
  // https://math.stackexchange.com/a/2217845
  vec3 n = normalize(cross(DIR, objectViewDir));

  float d = abs(dot(n, position - DIR) / length(n));

  // check if in sphere part of capsule
  // vec3 top = vec3(0.0, HEIGHT * 0.5 - RADIUS, 0.0);

  // float distFromTop = distance(position, top) * 0.98;

  // d = mix(d, distFromTop, step(0.0, RADIUS - distFromTop));

  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;

  vGlow = 1.0 - d * uGlowFalloff;
}