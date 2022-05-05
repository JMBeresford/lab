import useStore from '@/helpers/store';
import { Environment, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Floor from './3D/Floor';
import Rasengan from './3D/Rasengan';

const Experiment = () => {
  const ref = useRef();

  const { camera, gl, viewport, scene } = useThree();

  const { fogColor } = useControls(
    'Scene',
    {
      fogColor: { value: '#131317' },
    },
    { collapsed: true }
  );

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  useLayoutEffect(() => {
    useStore.setState({ collapseLeva: true });

    return () => {
      useStore.setState({ collapseLeva: false });
    };
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
        <Environment preset='night' />

        <OrbitControls
          enablePan={false}
          maxDistance={4}
          minDistance={2}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </group>
    </>
  );
};

export default Experiment;
