#define SUN_POS vec3(0.0, 4.357787137, -49.8097349)

precision mediump float;
varying vec3 vNormal;
varying float vWaveHeight;
varying vec3 vPos;

void main() {
  vec3 norm = normalize(vNormal);

  vec3 color = vec3(0.15, 0.35, 0.75); // bluish color

  color = mix(color, vec3(1.0), smoothstep(0.35, 1.0, vWaveHeight));

  vec3 lightVector = vPos - SUN_POS;
  vec3 L = normalize(lightVector);
  vec3 N = normalize(vNormal);

  vec3 R = reflect(-L,N);
  vec3 E = normalize(cameraPosition - vPos);

  float specular = pow(max(dot(E,R), 0.0), 15.0) * 0.7;

  color += specular * vec3(0.8, 0.8, 0.8);
  // color = mix(color, vec3(0.55, 0.55, 0.56), specular);
  
  gl_FragColor = vec4(color, 1.0);
}