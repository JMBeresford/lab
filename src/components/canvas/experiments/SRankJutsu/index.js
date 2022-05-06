import useStore from '@/helpers/store';
import { useThree } from '@react-three/fiber';
import { OrbitControls, useDetectGPU } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useEffect, useRef } from 'react';
import Floor from './3D/Floor';
import Rasengan from './3D/Rasengan';
// import Post from './Post';

const Experiment = () => {
  const { camera, gl, viewport } = useThree();

  const { fogColor } = useControls(
    'Scene',
    {
      fogColor: { value: '#131317' },
    },
    { collapsed: true }
  );

  const GPU = useDetectGPU();

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  useEffect(() => {
    if (viewport.width > 5) {
      camera.position.set(0, 0, 2.5);
    } else {
      camera.position.set(0, 0, 3.5);
    }
  }, [camera, viewport]);

  useEffect(() => {
    gl.setClearColor(fogColor, 1);
  }, [gl, fogColor]);

  return (
    <>
      <fog attach='fog' args={[fogColor, 0.1, 10]} />

      {/* {GPU.tier >= 1 && <Post />} */}

      <Rasengan />
      <Floor />
      <ambientLight intensity={0.25} />

      <OrbitControls
        enablePan={false}
        maxDistance={4}
        minDistance={2}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
};

export default Experiment;
