import { GradientTexture } from '@react-three/drei';
import React from 'react';
import { BackSide } from 'three';

const Sky = () => {
  return (
    <mesh>
      <sphereGeometry args={[30, 20, 20]} />
      <meshBasicMaterial side={BackSide}>
        <GradientTexture stops={[1, 0]} colors={['#333366', '#443333']} />
      </meshBasicMaterial>
    </mesh>
  );
};

export default Sky;
