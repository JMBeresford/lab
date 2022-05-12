import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import { Color } from "three";
import { fragmentShader, vertexShader } from "../shaders/glow";

const GlowMaterial = shaderMaterial(
  {
    uColor: new Color(),
    uTime: 0,
    uPointHeight: 0,
    uGlowCenterFalloff: 0.5,
    uGlowFalloff: 0.5,
    uGlowMax: 1.0,
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.depthWrite = false;
    mat.transparent = true;
  }
);

extend({ GlowMaterial });

const Glow = ({ height = 12 }) => {
  const ref = useRef();

  const { color } = useControls("Saber", {
    color: { value: "#43ff64" },
  });

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh
      ref={ref}
      rotation={[0, 0, -Math.PI / 2]}
      position={[height / 2 + 0.5, 0, 0]}
    >
      <capsuleGeometry args={[0.65, height, 20, 20]} />
      <glowMaterial uColor={color} uGlowFalloff={1.75} />
    </mesh>
  );
};

export default Glow;
