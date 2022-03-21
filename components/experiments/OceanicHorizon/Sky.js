import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { vertexShader, fragmentShader } from './shaders/Sky';
import { BackSide } from 'three';

const SkyMaterial = shaderMaterial(
  { uTime: { value: 0 } },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.side = BackSide;
  }
);

extend({ SkyMaterial });

const Sky = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uTime = clock.elapsedTime * 0.75;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[50, 20, 20]} />
      <skyMaterial />
    </mesh>
  );
};

export default Sky;
