varying vec3 vPos;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPosition;
  vPos = modelPosition.xyz;
}