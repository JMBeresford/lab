uniform float uTime;

varying vec3 vWorldPos;
varying vec2 vUv;

#pragma glslify: snoise = require(glsl-noise/simplex/3d)

void main() {

  vec3 pos = position + (snoise(position + uTime) * 0.05) * normalize(position);

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;

  vWorldPos = modelPos.xyz;
  vUv = uv;
}