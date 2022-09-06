import { useEffect, useRef } from "react";
import useStore from "@/helpers/store";
import { OrbitControls, PerspectiveCamera, useCursor } from "@react-three/drei";
import Sphere from "./3D/Sphere";
import Sky from "./3D/Sky";
import { useThree } from "@react-three/fiber";

const ChaosSphere = () => {
  const camRef = useRef();
  const { viewport } = useThree();

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  useEffect(() => {
    if (viewport.width < 5) {
      camRef.current.position.z = 15;
    }
  }, [viewport]);

  return (
    <>
      <group>
        <Sphere />
        <Sky />
      </group>

      <PerspectiveCamera
        ref={camRef}
        makeDefault={true}
        position={[1.65, -2.3, 10.1]}
      />
      <OrbitControls
        enablePan={false}
        maxDistance={20}
        minDistance={6}
        enableDamping={true}
        dampingFactor={0.025}
      />
    </>
  );
};

export default ChaosSphere;
