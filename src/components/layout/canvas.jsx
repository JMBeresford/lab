import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

const LCanvas = ({ children }) => {
  return (
    <Canvas mode="concurrent" dpr={[1, 2]} camera={null}>
      <Preload all />
      {children}
    </Canvas>
  );
};

export default LCanvas;
