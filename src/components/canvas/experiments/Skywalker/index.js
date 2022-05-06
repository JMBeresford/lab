import useStore from '@/helpers/store';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import Lightsaber from './3D/Lightsaber';
import Sky from './3D/Sky';
import Text from './3D/Text';

const Experiment = () => {
  const { camera, size } = useThree();
  const { debug } = useStore();

  useEffect(() => {
    camera.position.set(0, 0, size.width > 1000 ? 6 : 10);
    camera.lookAt(0, 0, 0);
  }, [camera, size]);

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  // useEffect(() => {
  //   if (!debug) useStore.setState({ hideLeva: true });

  //   return () => {
  //     useStore.setState({ hideLeva: false });
  //   };
  // }, [debug]);

  return (
    <>
      <Sky />
      <Text />

      <Lightsaber />

      <OrbitControls
        enableDamping={true}
        maxDistance={20}
        minDistance={3}
        enablePan={false}
      />
    </>
  );
};

export default Experiment;
