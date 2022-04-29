#define S smoothstep

uniform vec3 uPointColor1;
uniform vec3 uPointColor2;
uniform sampler2D uMask;

varying float vProgress;

void main() {
  float distToCenter = distance(gl_PointCoord, vec2(0.5)) * 2.0;
  float mask = texture2D(uMask, gl_PointCoord).r;

  vec3 color = mix(uPointColor1, uPointColor2, S(0.6, 0.8, distToCenter));
  color = mix(color, uPointColor2, vProgress);

  gl_FragColor = vec4(color, mask);
}