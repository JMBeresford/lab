uniform float uTime;
uniform vec3 uColor;
uniform float uGlowMax;

varying float vGlow;

void main() {

  gl_FragColor = vec4(uColor, min(vGlow, uGlowMax));
}