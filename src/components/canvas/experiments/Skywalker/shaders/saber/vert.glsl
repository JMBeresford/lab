uniform vec3 uColor;

varying vec3 vColor;

void main() {
  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  vec3 color = mix(uColor, vec3(1.0), 0.85);

  gl_Position = projectionMatrix * viewMatrix * modelPos;
  vColor = color;
}