#define PERIOD 10.0

uniform float uTime;
uniform sampler2D uFBO;

varying vec3 vWorldPos;
varying float vProgress;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
  vec4 fbo = texture2D(uFBO, uv);

  float progress = min((1.0 - fbo.w) * 10.0, fbo.w * 2.0);
  progress = clamp(progress, 0.0, 1.0);

  vec3 pos = fbo.xyz * 2.0 - 1.0;

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);
  vec4 viewPos = viewMatrix * modelPos;

  gl_Position = projectionMatrix * viewPos;
  gl_PointSize = 20.0 * progress + 2.0;
  gl_PointSize *= (1.0 / -viewPos.z);

  vWorldPos = modelPos.xyz;
  vProgress = 1.0 - progress;
}