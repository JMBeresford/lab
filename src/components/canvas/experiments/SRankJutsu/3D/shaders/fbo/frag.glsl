uniform float uTime;
uniform float uDelta;
uniform sampler2D uStartTexture;
uniform sampler2D uTexture;

uniform float uNoiseAmplitude;
uniform float uNoiseMultiplier;
uniform float uTimeFrequency;

varying vec2 vUv;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
  vec4 color = texture2D(uTexture, vUv);
  color.a -= 0.1 * uDelta;

  if (color.a <= 0.0) {
    color = texture2D(uStartTexture, vUv);
    // color.a = 1.0;
  } else {
    float amp = uNoiseAmplitude;
    float mult = uNoiseMultiplier * 0.01;

    color.r += snoise3(vec3(color.gb * amp, uTime * uTimeFrequency)) * mult;
    color.g += snoise3(vec3(color.rb * amp, uTime * uTimeFrequency)) * mult;
    color.b += snoise3(vec3(color.rg * amp, uTime * uTimeFrequency)) * mult;
  }

  gl_FragColor = color;
}