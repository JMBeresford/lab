import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

const LCanvas = ({ children }) => {
  return (
    <Canvas
      mode='concurrent'
      gl={{ alpha: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], rotation: [0, 0, 0] }}
    >
      {/* <Preload all /> */}
      {children}
    </Canvas>
  );
};

export default LCanvas;
