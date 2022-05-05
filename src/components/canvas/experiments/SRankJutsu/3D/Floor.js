import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import albedoImg from '../img/floor/albedo.jpeg';
import normalImg from '../img/floor/normal.jpeg';
import roughnessImg from '../img/floor/roughness.jpeg';
import metalnessImg from '../img/floor/metallic.jpeg';
import heightImg from '../img/floor/height.jpeg';
import aoImg from '../img/floor/ao.jpeg';
import { useEffect, useLayoutEffect } from 'react';
import { RepeatWrapping } from 'three';

const Floor = () => {
  const textures = useTexture({
    map: albedoImg.src,
    normalMap: normalImg.src,
    roughnessMap: roughnessImg.src,
    // metalnessMap: metalnessImg.src,
    // displacementMap: heightImg.src,
    aoMap: aoImg.src,
  });

  useLayoutEffect(() => {
    for (let tex of Object.values(textures)) {
      tex.wrapS = RepeatWrapping;
      tex.wrapT = RepeatWrapping;
      tex.repeat.set(6, 6);

      tex.needsUpdate = true;
    }
  }, [textures]);

  return (
    <mesh
      rotation={[-Math.PI / 2.0, 0, 0]}
      position={[0, -1.5, 0]}
      renderOrder={1}
    >
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial
        transparent={true}
        {...textures}
        metalness={0}
        // displacementScale={0.5}
      />
    </mesh>
  );
};

export default Floor;
