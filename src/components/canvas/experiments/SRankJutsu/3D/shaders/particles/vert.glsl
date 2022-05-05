#define TIME_FACTOR uTime * 5.5 * aOffset * uSpeed
#define PERIOD 1.5
#define S smoothstep

uniform float uTime;
uniform float uPower;
uniform float uSpeed;
uniform float uDpr;
uniform float uSize;

attribute float aOffset;

varying float vProgress;

mat3 rotateY(float a) {
  float s = sin(a), c = cos(a);

  return mat3(
    c, 0, s,
    0, 1, 0,
    -s, 0, c
  );
}

mat3 rotateX(float a) {
  float s = sin(a), c = cos(a);

  return mat3(
    1, 0, 0,
    0, c, -s,
    0, s, c
  );
}

mat3 rotateZ(float a) {
  float s = sin(a), c = cos(a);

  return mat3(
    c, -s, 0,
    s, c, 0,
    0, 0, 1
  );
}

void main() {
  vec3 pos = position;

  pos = rotateY(TIME_FACTOR * -2.5) * rotateX(TIME_FACTOR) * rotateZ(TIME_FACTOR * 1.2) * pos;

  pos *= (sin(TIME_FACTOR * 0.5) + 1.0) * 0.5 * uPower;

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);

  vec4 viewPos = viewMatrix * modelPos;

  float progress = S(0.0, 0.8, 1.2 - length(pos));

  gl_Position = projectionMatrix * viewPos;
  gl_PointSize = uDpr * uSize * (1.0 / -viewPos.z) * progress;

  vProgress = progress;
}