varying vec3 vWorldPos;
varying vec3 vWorldNormal;

void main() {

  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;

  vWorldPos = modelPos.xyz;
  vWorldNormal = normal;
}