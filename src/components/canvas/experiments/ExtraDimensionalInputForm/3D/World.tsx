import { ContactShadows, Environment, Sphere, Text3D } from "@react-three/drei";
import { useControls } from "leva";
import React from "react";
import { BackSide } from "three";

const World = () => {
  const { textColor } = useControls("scene", {
    textColor: "#bbbbff",
  });

  return (
    <group>
      <ContactShadows opacity={0.75} far={50} frames={1} />
      <Environment preset="city" />

      <Text3D
        font="/fonts/montserrat_black_regular.json"
        position={[-3, 0.02, -2]}
        rotation-y={Math.PI / 6}
      >
        LOGIN
        <meshStandardMaterial color={textColor} envMapIntensity={1.5} />
      </Text3D>

      <mesh>
        <sphereGeometry args={[50, 10]} />
        <meshBasicMaterial
          color={"#ffffff"}
          side={BackSide}
          toneMapped={true}
        />
      </mesh>
    </group>
  );
};

export default World;
