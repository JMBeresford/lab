import { useThree } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import HeroModel from './3d/HeroModel';
import Sky from './3d/Sky';
import { Suspense, useEffect } from 'react';

const Experiment = () => {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    camera.position.set(0, 5, 22.5);
    camera.rotation.reorder('YXZ');
    camera.rotation.set(0, 0, 0);

    camera.fov = 50;
  }, [camera]);

  useEffect(() => {
    gl.setClearColor('#000000', 0);
  }, [gl]);

  return (
    <>
      <Suspense fallback={null}>
        <HeroModel />
      </Suspense>
      <Sky position={[0, 0, -20]} />
      <Stats />
    </>
  );
};

export default Experiment;
