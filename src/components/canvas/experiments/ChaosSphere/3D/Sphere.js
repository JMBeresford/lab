import { shaderMaterial, useDetectGPU } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import { Color } from "three";
import { vertexShader, fragmentShader } from "./shaders/sphere";
import { animated, useSpring } from "@react-spring/three";

const SphereMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmp: 0.4,
    uLight1Color: new Color(),
    uLight2Color: new Color(),
    uFresnelColor: new Color(),
    uLightIntensity: [1, 1],
    uColor: new Color(),
    uDetail: 0.2,
    uFbmOctaves: 4,
    uResolution: [1, 1],
  },
  vertexShader,
  fragmentShader,
  (m) => {
    m.defines.USE_TANGENT = "";
  }
);

extend({ SphereMaterial });

const Sphere = () => {
  const ref = useRef();
  const GPU = useDetectGPU();

  const { amplitude, detail, speed, dimensionality } = useControls("Sphere", {
    amplitude: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.05,
    },
    detail: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.05,
    },
    speed: {
      value: 0.9,
      min: 0,
      max: 2,
      step: 0.1,
    },
    dimensionality: {
      value: 2,
      min: 0,
      max: 3,
      step: 1,
    },
  });

  const {
    light1Intensity,
    light2Intensity,
    light1Color,
    light2Color,
    highlightColor,
  } = useControls("Lighting", {
    light1Intensity: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.01,
    },
    light2Intensity: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.01,
    },
    light1Color: "#d600ff",
    light2Color: "#00f5ff",
    highlightColor: "#ffffff",
  });

  const resolution = useMemo(() => {
    switch (GPU.tier) {
      case 3: {
        return 600;
      }
      case 2: {
        return 512;
      }
      case 1: {
        return 256;
      }
      default: {
        return 128;
      }
    }
  }, [GPU]);

  const { scale } = useSpring({
    to: { scale: [1, 1, 1] },
    from: { scale: [0, 0, 0] },
  });

  useEffect(() => {
    ref.current.geometry.computeTangents();
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.uTime =
        (clock.elapsedTime * 0.25 * speed) / Math.max(dimensionality - 1, 1.0);
    }
  });

  return (
    <animated.mesh ref={ref} scale={scale}>
      <sphereBufferGeometry args={[3, resolution, resolution]} />
      <sphereMaterial
        uAmp={amplitude / Math.max(dimensionality - 1, 1.0)}
        uDetail={(detail * 0.25) / Math.max(dimensionality - 1, 1.0)}
        uResolution={[resolution, resolution]}
        uColor={"#656565"}
        uFresnelColor={highlightColor}
        uLight2Color={light2Color}
        uLight1Color={light1Color}
        uFbmOctaves={dimensionality}
        uLightIntensity={[light1Intensity, light2Intensity]}
      />
    </animated.mesh>
  );
};

export default Sphere;
