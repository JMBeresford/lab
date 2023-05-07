import { PerspectiveCamera } from "@react-three/drei";
import { VIEW, useExperimentStore } from "./store";
import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera as CameraType, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { damp } from "three/src/math/MathUtils";

export function Camera() {
  const ref = useRef<CameraType>();
  const phoneRotation = useRef<number>(undefined);
  const view = useExperimentStore((s) => s.view);
  const viewport = useThree((s) => s.viewport);

  useEffect(() => {
    ref.current.rotation.order = "YXZ";
  }, []);

  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      phoneRotation.current = e.alpha;
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  useFrame(({ mouse }, delta) => {
    let lambda = 1.2;
    let position = views[view].position;
    let rotation = views[view].rotation;

    let x = damp(ref.current.position.x, position[0], lambda, delta);
    let y = damp(ref.current.position.y, position[1], lambda, delta);
    let z = damp(ref.current.position.z, position[2], lambda, delta);

    let rx = damp(ref.current.rotation.x, rotation[0], lambda, delta);
    let ry = damp(ref.current.rotation.y, rotation[1], lambda, delta);
    let rz = damp(ref.current.rotation.z, rotation[2], lambda, delta);

    if (phoneRotation.current !== undefined) {
      ry += (phoneRotation.current * Math.PI) / 180;
    } else {
      rx += mouse.y * 0.001;
      ry -= mouse.x * 0.001;
    }

    ref.current.position.set(x, y, z);
    ref.current.rotation.set(rx, ry, rz);
  });

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={views["start"].position}
      rotation={[-0.1, 0, 0]}
      fov={viewport.aspect > 1 ? 50 : 75}
    />
  );
}

const views: Record<
  VIEW,
  { position: [number, number, number]; rotation: [number, number, number] }
> = {
  start: {
    position: [0.34019, 1.12988, -0.8],
    rotation: [0, 0, 0],
  },
  main: {
    position: [0, 1.22988, 1.44],
    rotation: [-0.15, 0, 0],
  },
  socials: {
    position: [-1.0508, 1.74999, -0.2],
    rotation: [0.0, 0.1, 0],
  },
  about: {
    position: [-1.1698, 1.52988, -0.3],
    rotation: [-0.3, 0, 0],
  },
  works: {
    position: [-1.1698, 1.12988, -0.3],
    rotation: [-0.15, 0, 0],
  },
  lab: {
    position: [-1.1698, 0.67988, -0.3],
    rotation: [-0.05, 0, 0],
  },
  desk: {
    position: [0.32019, 1.22988, -0.26],
    rotation: [-0.2, 0, 0],
  },
  // aboutEntered: {
  //   position: [-1.31981, 1.44488, -1.1],
  //   rotation: [-0.3, 0.1, 0],
  // },
  // worksEntered: {
  //   position: [-0.92981, 1.04488, -1.1],
  //   rotation: [-0.3, -0.1, 0],
  // },
  // labEntered: {
  //   position: [-1.31981, 0.64488, -1.1],
  //   rotation: [-0.3, 0.1, 0],
  // },
};
