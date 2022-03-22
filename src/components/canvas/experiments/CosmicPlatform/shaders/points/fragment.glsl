
uniform float uTime;
uniform vec2 uResolution;

varying float vColor;
varying float height;

void main() {
  float d = min(distance(gl_PointCoord, vec2(0.5)) * 2.0, 1.0);
  
  float strength = 1.0 - d;
  strength = pow(strength, 5.0);

  // Final color
  vec3 color = mix(vec3(0.8, 0.8, 1.0), vec3(1.0, 0.62, 0.62), vColor);


  float opacity = smoothstep(0.35, 0.7, strength);
  float fade = smoothstep(0.05, 0.2, 1.0 - height);

  gl_FragColor = vec4(color, opacity * fade);
}