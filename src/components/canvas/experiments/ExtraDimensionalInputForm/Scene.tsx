import useStore from "@/helpers/store";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Camera, useFrame } from "@react-three/fiber";
import gsap, { Power0 } from "gsap";

import { Ref, useEffect, useRef, useState } from "react";
import { damp } from "three/src/math/MathUtils";
import Login from "./3D/Login";
import World from "./3D/World";

const Scene = () => {
  const camRef: Ref<Camera> = useRef();

  useEffect(() => {
    useStore.setState({
      experimentLoaded: true,
      hideLeva: !useStore.getState().debug,
    });
  }, []);

  useFrame(({ mouse }, delta) => {
    let mx = mouse.x * 0.1;
    let my = -mouse.y * 0.1;

    camRef.current.position.x = damp(
      camRef.current.position.x,
      0 + mx,
      2,
      delta
    );
    camRef.current.position.y = damp(
      camRef.current.position.y,
      0.9 + my,
      2,
      delta
    );
    camRef.current.position.z = damp(camRef.current.position.z, 1.5, 2, delta);
    camRef.current.lookAt(0, 0.75, 0);
  });

  return (
    <>
      <Login position={[0, 0.9, 0]} rotation={[0, 0, 0]} />

      <World />

      <PerspectiveCamera
        ref={camRef}
        makeDefault
        position={[0.95, 1.95, 2.5]}
        far={100}
      />
    </>
  );
};

export default Scene;
