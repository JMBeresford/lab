varying float vProgress;

void main() {
  float mask = smoothstep(0.7, 0.35, distance(gl_PointCoord.xy * 2.0, vec2(0.5)));

  float opacity = mask * smoothstep(0.35, 1.0, vProgress);

  gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
}