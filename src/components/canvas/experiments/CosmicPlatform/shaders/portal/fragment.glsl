uniform float uTime;
uniform vec3 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying float noise;
varying vec2 xz;

void main() {

  float trueNoise = noise * 5.0;

  vec3 color = trueNoise * uColor1 + (1.0 - trueNoise) * uColor2;

  gl_FragColor = vec4(color, 1.0);
}