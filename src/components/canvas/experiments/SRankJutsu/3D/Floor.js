import { MeshReflectorMaterial } from '@react-three/drei';
import React from 'react';

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2.0, 0, 0]} position={[0, -1.1, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshPhongMaterial color='#101010' fog={true} />
    </mesh>
  );
};

export default Floor;
