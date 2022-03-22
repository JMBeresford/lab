uniform float uTime;
uniform vec3 uMouse;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

varying float noise;
varying vec2 xz;

void main() {
  float r = (sin(uTime * position.y) + 1.0);

  vec3 newPos = position;

  noise = clamp(cnoise3(vec3(position.xy * 0.5, uTime * 0.2)), 0.0, 1.0);
  noise = smoothstep(0.0, 1.0, noise * 0.5);

  newPos.z += noise;

  xz = position.xy;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}