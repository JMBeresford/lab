import useStore from '@/helpers/store';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useEffect, useMemo, useRef } from 'react';
import { Color } from 'three';
import Floor from './3D/Floor';
import Rasengan from './3D/Rasengan';

const Experiment = () => {
  const ref = useRef();

  const { camera, gl, viewport } = useThree();

  const { fogColor } = useControls('Scene', {
    fogColor: { value: '#333338' },
  });

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

      <group ref={ref}>
        <Rasengan />
        <Floor />
        <OrbitControls enablePan={false} enableZoom={false} />
      </group>
    </>
  );
};

export default Experiment;
