import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";

const LCanvas = ({ children }) => {
  return (
    <Canvas
      mode="concurrent"
      dpr={[1, 2]}
      camera={null}
      shadows
      gl={{ toneMapping: ACESFilmicToneMapping }}
    >
      <Preload all />
      {children}
    </Canvas>
  );
};

export default LCanvas;
