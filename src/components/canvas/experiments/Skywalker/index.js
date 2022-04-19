import useStore from '@/helpers/store';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Selection } from '@react-three/postprocessing';
import { useControls } from 'leva';
import React, { useEffect, useRef, useState } from 'react';
import Lightsaber from './3D/Lightsaber';
import Sky from './3D/Sky';
import Text from './3D/Text';
import Post from './Post';

const Experiment = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, size.width > 1000 ? 6 : 10);
    camera.lookAt(0, 0, 0);
  }, [camera, size]);

  const { color } = useControls('Saber', {
    color: { value: '#00ff00' },
  });

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  return (
    <>
      <Sky />
      <Text />

      <Selection>
        <Post color={color} />
        <Lightsaber color={color} />
      </Selection>

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
