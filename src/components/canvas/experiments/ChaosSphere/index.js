import { Suspense, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import useStore from '@/helpers/store';
import { OrbitControls } from '@react-three/drei';
import Sphere from './3D/Sphere';
import Sky from './3D/Sky';

const ChaosSphere = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(1.65, -2.3, 7.1);
    camera.rotation.reorder('YXZ');
  }, [camera.position, camera.rotation]);

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  useEffect(() => {
    gl.setClearColor(0x111122, 1);
  }, [gl]);

  return (
    <>
      <Sphere />
      <Sky />

      <OrbitControls
        enablePan={false}
        maxDistance={13}
        minDistance={6}
        enableDamping={true}
      />
    </>
  );
};

export default ChaosSphere;
