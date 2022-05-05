uniform float uTime;

varying vec3 vWorldPos;
varying vec3 vWorldNormal;

// #pragma glslify: snoise = require(glsl-noise/simplex/2d)

void main() {

  // vec3 pos = position + (abs(snoise(vec2(position.y, uTime))) * 0.015) * normalize(position);

  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;

  vWorldPos = modelPos.xyz;
  vWorldNormal = normal;
}