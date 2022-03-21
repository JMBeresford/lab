import { Canvas } from '@react-three/fiber';
import Sky from './Sky';
import Ocean from './Ocean';
import { OrbitControls } from '@react-three/drei';

const Experiment = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 2.5, 0], rotation: [0, 0, 0], fov: 50 }}
    >
      <Sky />
      <Ocean />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        dampingFactor={0.1}
        rotateSpeed={0.25}
        target={[0.0, 2.5, 0]}
      />
    </Canvas>
  );
};

export default Experiment;
