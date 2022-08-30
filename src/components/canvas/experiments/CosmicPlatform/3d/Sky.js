import React, { useRef } from "react";
import {
  Environment,
  GradientTexture,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useThree, useFrame } from "@react-three/fiber";
import skyVertexShader from "../shaders/sky/vertex.glsl";
import skyFragmentShader from "../shaders/sky/fragment.glsl";
import { Vector2, Color, BackSide } from "three";
import envMap from "../img/env.hdr";

// const SkyMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uResolution: new Vector2(0, 0),
//     uColor: new Color(1, 0, 0),
//     uColor2: new Color(1, 0, 0),
//     uColor3: new Color(1, 0, 0),
//     uColor4: new Color(1, 0, 0),
//   },
//   skyVertexShader,
//   skyFragmentShader
// );

// extend({ SkyMaterial });

const Sky = (props) => {
  const { size } = useThree();
  const ref = useRef();

  // useFrame(({ clock }) => {
  //   ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  // });

  return (
    <>
      <mesh ref={ref} {...props} rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
        <sphereGeometry args={[200, 20, 20]} />
        <meshBasicMaterial side={BackSide}>
          <GradientTexture stops={[0, 1]} colors={["#3d1538", "#15153d"]} />
        </meshBasicMaterial>
      </mesh>
    </>
  );
};

export default Sky;
