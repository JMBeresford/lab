uniform float uTime;
uniform vec3 uColor;
uniform float uGlowMax;

varying float vGlow;
varying vec3 vPos;

#pragma glslify: snoise = require(glsl-noise/simplex/2d)

void main() {
  float flicker = snoise(vec2(uTime * 10.0, -uTime * 8.0)) * 0.05;

  gl_FragColor = vec4(uColor, min(vGlow + flicker, uGlowMax));
}