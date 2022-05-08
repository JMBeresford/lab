import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { vertexShader, fragmentShader } from './shaders/Ocean';

const OceanMaterial = shaderMaterial(
  { uTime: { value: 0 } },
  vertexShader,
  fragmentShader
);

extend({ OceanMaterial });

const Ocean = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uTime = clock.elapsedTime;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100, 30, 30]} scale={[1.1, 1.1, 1.1]} />
      <oceanMaterial />
    </mesh>
  );
};

export default Ocean;
