import { shaderMaterial, Points } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { BufferAttribute, Vector2 } from "three";
import { vertexShader, fragmentShader } from "./shaders";

const VortexMaterial = shaderMaterial(
  {
    uTime: { value: 0 },
    uDpr: { value: 1 },
    uViewport: { value: [1, 1] },
    uMouse: { value: [0, 0] },
  },
  vertexShader,
  fragmentShader,
  (m) => {
    m.depthTest = false;
  }
);

extend({ VortexMaterial });
const tempV2 = new Vector2();

const PointVortex = ({ count = 1000 }) => {
  const ref = useRef();

  const viewport = useThree((state) => state.viewport);

  const points = useMemo(() => {
    let p = [];

    for (let i = 0; i < count; i++) {
      let x = Math.random() - 0.5;
      let y = Math.random() - 0.5;
      let z = -5;

      p.push(x, y, z);
    }

    return new Float32Array(p);
  }, [count]);

  const speed = useMemo(() => {
    let s = [];

    for (let i = 0; i < count; i++) {
      s.push(Math.random());
    }

    return new Float32Array(s);
  }, [count]);

  useEffect(() => {
    ref.current.geometry.setAttribute("speed", new BufferAttribute(speed, 1));
  }, [speed]);

  useEffect(() => {
    ref.current.material.uniforms.uViewport.value = [
      viewport.width,
      viewport.height,
    ];

    ref.current.material.uniforms.uDpr.value = viewport.dpr;
  }, [viewport]);

  useFrame(({ clock, mouse }) => {
    tempV2.lerp(mouse, 0.1);
    if (ref.current && ref.current.material) {
      ref.current.material.uTime = clock.elapsedTime * 0.2 + 100;

      ref.current.material.uMouse = tempV2;
    }
  });

  return (
    <Points ref={ref} positions={points}>
      <vortexMaterial uDpr={viewport.dpr} />
    </Points>
  );
};

export default PointVortex;
