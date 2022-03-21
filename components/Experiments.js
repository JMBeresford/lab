import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import PointVortex from './3D/PointVortex';
import HeaderText from './3D/HeaderText';
import ExperimentList from './3D/ExperimentList';

const Experiments = () => {
  return (
    <div id='experiments'>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], near: 0.0001 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#fafaff');
        }}
      >
        <PointVortex count={500} />
        <Suspense fallback={null}>
          <HeaderText />
          <ExperimentList />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Experiments;
