#define S smoothstep

uniform vec3 uInnerColor;
uniform vec3 uOuterColor;
uniform float uSize;
uniform float uPower;
uniform sampler2D uMask;

varying float vProgress;

void main() {
  float mask = texture2D(uMask, gl_PointCoord.xy).r;

  float distFromCenter = distance(gl_PointCoord.xy, vec2(0.5, 0.5));

  vec3 color = mix(uInnerColor, uOuterColor, S(0.3, 0.6, distFromCenter));
  color = mix(uInnerColor, uOuterColor, S(0.4, 1.0, 1.0 - vProgress));

  float alpha = mask * S(0.0, 0.1, uPower);
  gl_FragColor = vec4(color, alpha);
}