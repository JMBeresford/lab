import {
  AccumulativeShadows,
  Center,
  Environment,
  RandomizedLight,
  Text3D,
} from "@react-three/drei";
import { useControls } from "leva";
import React, { Suspense } from "react";

const World = () => {
  const { textColor } = useControls("scene", {
    textColor: "#dbdbff",
  });

  return (
    <Suspense fallback={null}>
      <group>
        <AccumulativeShadows
          temporal
          frames={120}
          colorBlend={1}
          scale={30}
          color={"#ffffff"}
          toneMapped={false}
          position={[2.5, 0.02, -3.5]}
        >
          <RandomizedLight amount={12} frames={120} intensity={5} radius={20} />
        </AccumulativeShadows>
        <Environment preset="city" />

        <group rotation-y={-Math.PI / 6} position={[2.5, 0.0, -3.5]}>
          <Center top>
            <Text3D
              font="/fonts/montserrat_black_regular.json"
              rotation-x={-Math.PI / 48}
              castShadow={true}
              curveSegments={20}
            >
              LOGIN
              <meshStandardMaterial
                color={textColor}
                envMapIntensity={2}
                toneMapped={false}
              />
            </Text3D>
          </Center>
        </group>
      </group>
    </Suspense>
  );
};

export default World;
