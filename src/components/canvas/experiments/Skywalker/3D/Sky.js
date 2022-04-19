import {
  Environment,
  GradientTexture,
  MeshReflectorMaterial,
  ScreenQuad,
} from '@react-three/drei';
import React from 'react';
import { BackSide } from 'three';
import envMap from '../img/env.hdr';

const Sky = () => {
  return (
    <>
      <mesh>
        <sphereGeometry args={[30, 20, 20]} />
        <meshStandardMaterial
          side={BackSide}
          color='#666666'
          envMapIntensity={0.5}
        >
          {/* <GradientTexture stops={[1, 0]} colors={['#333366', '#443333']} /> */}
        </meshStandardMaterial>
      </mesh>
      {/* <ScreenQuad>
        <MeshReflectorMaterial side={BackSide} resolution={1024} />
      </ScreenQuad> */}
      <Environment files={envMap} />
    </>
  );
};

export default Sky;
