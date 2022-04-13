import { shaderMaterial, useDetectGPU } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { vertexShader, fragmentShader } from './shaders/Sky';
import { BackSide } from 'three';

const SkyMaterial = shaderMaterial(
  { uTime: 0, uFbmOctaves: 0 },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.side = BackSide;
  }
);

extend({ SkyMaterial });

const Sky = () => {
  const ref = useRef();

  const { gl } = useThree();

  const GPU = useDetectGPU({ glContext: gl.getContext() });

  useEffect(() => {
    switch (GPU.tier) {
      case 3: {
        ref.current.material.uniforms.uFbmOctaves.value = 6;
        break;
      }
      case 2: {
        ref.current.material.uniforms.uFbmOctaves.value = 3;
        break;
      }
      case 1: {
        ref.current.material.uniforms.uFbmOctaves.value = 2;
        break;
      }
      default: {
        ref.current.material.uniforms.uFbmOctaves.value = 1;
        break;
      }
    }
  }, [GPU]);

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
