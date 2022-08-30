import React, { useRef } from "react";
import { GradientTexture } from "@react-three/drei";
import { BackSide } from "three";

const Sky = (props) => {
  const ref = useRef();

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
