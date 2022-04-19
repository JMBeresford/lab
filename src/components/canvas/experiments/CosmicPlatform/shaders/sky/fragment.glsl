uniform float uTime;
uniform vec3 uColor;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec2 uResolution;

varying vec2 vUv;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

#define PI 3.14159

float cone(vec2 uv, float thinness){
  float strength = 1.0 - abs(uv.x * uv.y * thinness);
  return clamp(strength, 0.0, 1.0);
}

mat2 rot(float a) {
  float s=sin(a), c=cos(a);

  return mat2(c, -s, s, c);
}

float hash2_1(vec2 p) {
  p = fract(p * vec2(345.12, 684.14));
  p += dot(p, p + 69.0);

  return fract(p.x*p.y);
}

float star(vec2 uv, float flare) {
  float d = length(uv);

  float brightness = pow(0.1/d, 2.0);
  // float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  // brightness += rays*flare;

  // uv *= rot(PI * 0.25);

  // rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  // brightness += 0.3*flare;

  // brightness *= smoothstep(0.7, 0.8, 1.0 - d);
  
  return brightness;
}

vec3 starLayer(vec2 uv, vec3 _color) {
  vec3 outputColor = vec3(0.0);

  vec2 grid = fract(uv) - 0.5;
  vec2 id = floor(uv);


  for (float x = -1.0; x <= 1.0; x++) {
    for (float y = -1.0; y <= 1.0; y++) {
      vec2 offset = vec2(x,y);
      float n = hash2_1(id + offset);

      float size = fract(n*69.0);
      float flare = max(0.0, smoothstep(0.9, 1.0, size) - 0.5);
      float star = star(grid - offset - vec2(n, fract(n*8008.5)) + 0.5, 0.0);

      outputColor += star * size * _color;
    }
  }

  return outputColor;
}

void main() {
  vec2 uv = vUv * 2.0;

  float noise = clamp(snoise3(vec3(uv * 2.0, uTime * 0.04)), 0.0, 1.0);

  float antiNoise = 1.0 - abs(noise);
  antiNoise = smoothstep(0.0, 0.9,pow(antiNoise, 5.0));
  
  float distort = cnoise3(vec3(uv * 2.0, uTime * 0.05));

  float shadow = smoothstep(0.0, 0.3, uv.y);

  vec3 color = uColor * shadow;

  vec3 stars = starLayer(uv * 30.0 + sin(uTime * 0.01), uColor3) * smoothstep(.05,.5,noise) * shadow;
  stars += starLayer(uv * 20.0, uColor3) * smoothstep(0.5, 1.0, noise) * shadow;

  stars += starLayer(uv * 45.0 + cos(uTime * 0.01), vec3(0.7,0.65,1.0)) * smoothstep(0.05, 0.5, antiNoise) * shadow;
  
  vec3 clouds = uColor2 * smoothstep(0.0, 0.9, noise) * shadow;
  clouds += uColor4 * smoothstep(0.0, 0.9, antiNoise) * shadow;
  stars += clouds;

  color += abs(stars);

  gl_FragColor = vec4(color,1.0);
}