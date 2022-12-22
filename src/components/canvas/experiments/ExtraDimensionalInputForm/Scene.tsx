import useStore from "@/helpers/store";
import { OrbitControls, PerspectiveCamera, Shadow } from "@react-three/drei";
import { useEffect } from "react";
import Login from "./3D/Login";
import World from "./3D/World";

const Scene = () => {
  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  return (
    <>
      <Login position={[0, 0.9, 0]} rotation={[0, 0, 0]} />

      <World />

      <PerspectiveCamera makeDefault position={[0.65, 1.5, 1.5]} far={70} />
      <OrbitControls makeDefault enablePan={false} target={[0, 0.75, 0]} />
      <fog attach="fog" args={["#ffffff", 1, 8]} />
    </>
  );
};

export default Scene;
