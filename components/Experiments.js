import { Canvas } from '@react-three/fiber';
import PointVortex from './3D/PointVortex';

const Experiments = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 0], near: 0.0001 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#fafaff');
      }}
    >
      <PointVortex count={500} />
    </Canvas>
  );
};

export default Experiments;
