import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HeroModel from './3d/HeroModel';
import Sky from './3d/Sky';
import { Suspense, useEffect } from 'react';
import useStore from '@/helpers/store';

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

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <HeroModel />
      </Suspense>
      <OrbitControls
        maxDistance={50}
        minDistance={10}
        enablePan={false}
        enableDamping={true}
      />
      <Sky position={[0, 0, -20]} />
    </>
  );
};

export default Experiment;
