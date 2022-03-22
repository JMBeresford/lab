import { Suspense, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import PointVortex from './PointVortex';
import ExperimentList from './ExperimentList';
import { Text } from '@react-three/drei';
import fontPath from '@/fonts/MajorMonoDisplay.ttf';

const HeaderText = () => {
  return (
    <Text
      text='experiments'
      font={fontPath}
      position={[0, 3.25, -0.5]}
      color='black'
      fontSize={0.75}
    />
  );
};

const Experiments = () => {
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    gl.setClearColor('#fafaff');
  }, [gl]);

  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  return (
    <>
      <PointVortex count={500} />
      <Suspense fallback={null}>
        <HeaderText />
        <ExperimentList />
      </Suspense>
    </>
  );
};

export default Experiments;
