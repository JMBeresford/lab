import useStore from '@/helpers/store';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import Rasengan from './3D/Rasengan';

const Experiment = () => {
  const ref = useRef();

  const { camera, gl } = useThree();

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  useEffect(() => {
    camera.position.set(0, 0, 2.5);
  }, [camera]);

  useEffect(() => {
    gl.setClearColor(0x333338, 1);
  }, [gl]);

  return (
    <group ref={ref}>
      <Rasengan />
      <OrbitControls enablePan={true} enableZoom={true} />
    </group>
  );
};

export default Experiment;
