import { Suspense, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import PointVortex from './PointVortex';
import ExperimentList from './ExperimentList';
import { Text } from '@react-three/drei';
import fontPath from '@/fonts/MajorMonoDisplay.ttf';
import { Vector2 } from 'three';

const HeaderText = () => {
  const size = useThree((state) => state.size);

  return (
    <Text
      text='experiments'
      font={fontPath}
      position={[0, 3.25, -0.5]}
      color='black'
      fontSize={size.width >= 768 ? 0.75 : 0.375}
    />
  );
};

const tempV2 = new Vector2();

const Experiments = () => {
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);

  const group = useRef();

  useEffect(() => {
    gl.setClearColor('#fafaff');
  }, [gl]);

  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  useFrame(({ mouse }) => {
    tempV2.lerp(mouse, 0.1);
    if (group.current) {
      group.current.rotation.x = -tempV2.y * 0.1;
      group.current.rotation.y = tempV2.x * 0.1;
    }
  });

  return (
    <>
      <Suspense fallback={null}>
        <PointVortex count={500} />
        <group ref={group}>
          <HeaderText />
          <ExperimentList />
        </group>
      </Suspense>
    </>
  );
};

export default Experiments;
