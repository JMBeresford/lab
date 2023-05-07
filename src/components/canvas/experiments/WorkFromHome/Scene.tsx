import { PerspectiveCamera } from "@react-three/drei";
import { Office } from "./3D/Office";
import { Suspense, useEffect } from "react";
import useStore from "@/helpers/store";
import { useThree } from "@react-three/fiber";
import { Color } from "three";
import { Camera } from "./Camera";
import { useExperimentStore } from "./store";

export default function Scene() {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  useEffect(() => {
    const clearColor = new Color();
    const alpha = gl.getClearAlpha();
    gl.getClearColor(clearColor);

    gl.setClearColor("black", 1);
  }, [gl]);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[20, 5, 5]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <Suspense fallback={null}>
        <Office />
      </Suspense>

      <Camera />
    </group>
  );
}
