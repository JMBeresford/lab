import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import useStore from "@/helpers/store";
import { OrbitControls } from "@react-three/drei";
import Sphere from "./3D/Sphere";
import Sky from "./3D/Sky";

const ChaosSphere = () => {
  const { camera, gl } = useThree();

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    camera.position.set(1.65, -2.3, 7.1);
    camera.rotation.reorder("YXZ");
  }, [camera.position, camera.rotation]);

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  useEffect(() => {
    document.body.style.cursor = dragging ? "grabbing" : "grab";

    return () => {
      document.body.style.cursor = "";
    };
  }, [dragging]);

  return (
    <>
      <group
        onPointerDown={() => setDragging(true)}
        onPointerUp={() => setDragging(false)}
      >
        <Sphere />
        <Sky />
      </group>
      <OrbitControls
        enablePan={false}
        maxDistance={13}
        minDistance={6}
        enableDamping={true}
        dampingFactor={0.025}
      />
    </>
  );
};

export default ChaosSphere;
