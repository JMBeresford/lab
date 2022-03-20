uniform float uTime;
uniform vec2 uViewport;

attribute float speed;

varying float vProgress;

#define TIME_MOD 30.0
#define VORTEX_STRENGTH 30.0

void main() {

  vProgress = mod(uTime * speed, TIME_MOD) / TIME_MOD;

  vec3 pos = position;

  pos.x += cos(uTime * speed * VORTEX_STRENGTH) * uViewport.x;
  pos.y += sin(uTime * speed * VORTEX_STRENGTH) * uViewport.y;
  pos.z = mix(pos.z, 0.5, vProgress);

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);
  gl_PointSize = 12.0 * vProgress;
  gl_Position = projectionMatrix * viewMatrix * modelPos;
}