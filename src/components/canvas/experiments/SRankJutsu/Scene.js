import useStore from "@/helpers/store";
import { useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import React, { useEffect } from "react";
import Floor from "./3D/Floor";
import Rasengan from "./3D/Rasengan";

const Scene = () => {
  const { gl, viewport } = useThree();

  const { fogColor } = useControls(
    "Scene",
    {
      fogColor: { value: "#131317" },
    },
    { collapsed: true }
  );

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  // useEffect(() => {
  //   if (viewport.width > 5) {
  //     camera.position.set(0, 0, 2.5);
  //   } else {
  //     camera.position.set(0, 0, 3.5);
  //   }
  // }, [camera, viewport]);

  useEffect(() => {
    gl.setClearColor(fogColor, 1);
  }, [gl, fogColor]);

  return (
    <>
      <fog attach="fog" args={[fogColor, 1, 17]} />

      <Rasengan />
      <Floor />
      <ambientLight intensity={0.25} />

      <PerspectiveCamera makeDefault={true} position={[0, 0, 4.5]} />

      <OrbitControls
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.075}
        maxDistance={5}
        minDistance={2}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
};

export default Scene;
