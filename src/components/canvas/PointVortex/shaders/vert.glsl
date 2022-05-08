uniform float uTime;
uniform float uDpr;
uniform vec2 uViewport;
uniform vec2 uMouse;

attribute float speed;

varying float vProgress;
varying float vMouseDist;

#define TIME_MOD 20.0
#define VORTEX_STRENGTH 2.0

void main() {

  vProgress = mod(uTime * speed, TIME_MOD) / TIME_MOD;

  vec3 pos = position;

  float radius = max(uViewport.x, uViewport.y) / 2.0;

  pos.x += cos(uTime * speed * VORTEX_STRENGTH);
  pos.y += sin(uTime * speed * VORTEX_STRENGTH);
  pos.z = mix(pos.z, cameraPosition.z, vProgress);

  pos.xy += uMouse * 0.1;

  vMouseDist = distance(uMouse, pos.xy);

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);
  gl_PointSize = 15.0 * pow(vProgress, 3.0) * uDpr;
  gl_Position = projectionMatrix * viewMatrix * modelPos;
}