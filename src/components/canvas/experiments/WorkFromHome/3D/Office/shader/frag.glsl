uniform sampler2D uMap;
uniform sampler2D uLightMap;
uniform sampler2D uLightMap2;
uniform float uEmailIntensity;
uniform float uInstaIntensity;
uniform float uLinkedinIntensity;
uniform float uGithubIntensity;
uniform float uMacIntensity;
uniform float uTableIntensity;
uniform vec3 uTableColor;
uniform vec3 uMacColor;

varying vec2 vUv;

#pragma glslify: blendAdd = require(glsl-blend/add)
#pragma glslify: blendLighten = require(glsl-blend/lighten)

#define S smoothstep

void main() {
  vec3 color = texture2D(uMap, vUv).rgb;
  vec3 lightmap = texture2D(uLightMap, vUv).rgb;
  vec3 lightmap2 = texture2D(uLightMap2, vUv).rgb;

  float emailStr = lightmap.r * uEmailIntensity;
  float githubStr = lightmap.g * uGithubIntensity;
  float instaStr = lightmap.b * uInstaIntensity;

  float linkedinStr = lightmap2.r * uLinkedinIntensity;
  float macStr = lightmap2.g * uMacIntensity;
  float tableStr = lightmap2.b * uTableIntensity;

  // email box
  color = blendLighten(color, vec3(0.1373, 0.3647, 1.0), emailStr);

  // instagram box
  color = blendLighten(color, vec3(0.370, 0.502, 0.697), instaStr);

  // linkedIn box
  color = blendLighten(color, vec3(1.0, 0.3373, 0.7216), linkedinStr);

  // github box
  color = blendLighten(color, vec3(1.0, 0.1176, 0.4863), githubStr);

  // mac pro lighting
  color = blendLighten(color, uMacColor, macStr);

  // table leds
  color = blendLighten(color, uTableColor, tableStr);

  gl_FragColor = vec4(color, 1.0);

  #include <encodings_fragment>
  // #include <tonemapping_fragment>
}