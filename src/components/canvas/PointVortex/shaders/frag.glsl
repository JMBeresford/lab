precision mediump float;
varying float vProgress;
varying float vMouseDist;

void main() {
  // float mask = smoothstep(0.7, 0.35, distance(gl_PointCoord.xy * 2.0, vec2(0.5)));

  float opacity = min(smoothstep(0.1, 1.0, vProgress), 0.75);

  vec3 color = mix(vec3(0.0), vec3(0.902, 0.0, 0.4196), smoothstep(0.0, 1.0, vMouseDist * 0.35));

  gl_FragColor = vec4(color, opacity);
}