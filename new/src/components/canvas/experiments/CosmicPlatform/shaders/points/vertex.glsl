uniform float uTime;
uniform vec3 uMouse;

attribute float aOffset;

varying float vColor;
varying float height;

#define PI 3.14159

void main() {
  // for repeating animation
  float timeMod = mod(uTime * (1.0 - aOffset) * 0.75, 8.0) + 0.6;

  float radius = 15.0 * exp(-0.85 * timeMod) * sin(PI * 0.1 * timeMod);

  radius *= 2.5;

  vec3 newPosition = position;

  newPosition.x = sin(uTime * position.x) * radius;
  newPosition.y = (timeMod - 0.6) * 5.0;
  newPosition.z = sin(uTime * position.z) * radius;

  height = newPosition.y / 18.0;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  
  gl_Position = projectedPosition;

  vColor = step(0.5, fract(dot(position * 34354.2, position.zyx * -233.5)));

  gl_PointSize = max(300.0 * aOffset, 100.0);

  // size attenuation
  gl_PointSize *= (5.0 / - viewPosition.z);
}