varying vec3 vPos;
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vPos.x *= 10.0;
  vPos.y *= 10.0;
  vUv = vec2(uv.x, 1.0 - uv.y) * 2.0 - 1.0;
  vUv.y -= 1.0;
}