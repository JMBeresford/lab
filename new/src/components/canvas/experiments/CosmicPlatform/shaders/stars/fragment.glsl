uniform float uTime;
uniform vec3 uColor;
uniform vec3 uColor2;
uniform vec2 uResolution;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

#define PI 3.14159
#define NUM_LAYERS 6.

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

  float brightness = 0.01/d;
  float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  brightness += rays*flare;

  uv *= rot(PI * 0.25);

  rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  brightness += rays*0.3*flare;

  brightness *= smoothstep(1.0, 0.3, d);
  
  return brightness;
}

vec3 starLayer(vec2 uv) {
  vec3 outputColor = vec3(0.0);

  vec2 grid = fract(uv) - 0.5;
  vec2 id = floor(uv);


  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      vec2 offset = vec2(x,y);
      float n = hash2_1(id + offset);

      float size = fract(n*69.0);
      float flare = max(0.0, smoothstep(0.9, 1.0, size) - 0.5);
      float star = star(grid - offset - vec2(n, fract(n*8008.5)) + 0.5, flare);

      vec3 white = vec3(1.);

      // vec3 color = mix(uColor, white, sin(uTime * 0.1) * 0.5 + 0.85);
      vec3 color = uColor;

      outputColor += star * size * color;
    }
  }

  return outputColor;
}

void main() {
  vec2 uvCentered = (gl_FragCoord.xy-0.5*uResolution)/uResolution.y;

  //uvCentered *= 10.0;

  vec3 color = vec3(0.0);
  float t = uTime * 0.01;
  vec2 uv = uvCentered * rot(t);

  for (float i = 0.0; i < 1.0; i += 1.0/NUM_LAYERS) {
    float depth = fract(i+t);
    float scale = mix(20.,0.5,depth);

    float fade = max(0.0, depth * smoothstep(1.0, 0.9, depth) - 0.4);
    color += starLayer(uv * scale + i * 10.0) * fade;
  }


  gl_FragColor = vec4(color,1.0);
}