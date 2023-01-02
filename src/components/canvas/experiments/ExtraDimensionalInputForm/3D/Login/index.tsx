import { Text, useCursor } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/three";

/**
 * EXPERIMENT IS NOW A STANDALONE PACKAGE FOUND HERE:
 * https://github.com/JMBeresford/r3f-input
 */
import { Input } from "@jberesford/r3f-input";
import { useControls } from "leva";

type PropsTypes = {
  position?: Vector3;
  rotation?: Euler;
  width?: number;
};

const Login = (props: PropsTypes) => {
  const { width = 1.5, position, rotation } = props;
  const [hovered, setHovered] = useState(false);

  const { buttonSize } = useSpring({
    buttonSize: hovered ? 1.025 : 1,
  });

  const { fontSize } = useControls("text", {
    fontSize: { value: 0.0825, min: 0.01, max: 0.6, step: 0.01 },
  });

  useCursor(hovered);

  return (
    <group position={position} rotation={rotation}>
      <Input
        width={width}
        type="text"
        label="Username"
        textProps={{ fontSize }}
      />

      <Input
        width={width}
        position={[0, -0.3, 0]}
        type="password"
        label="Password"
        textProps={{ fontSize }}
      />

      <group
        position-y={-0.6}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <animated.mesh scale={buttonSize} renderOrder={1}>
          <boxGeometry args={[width, 0.15, 0.01]} />
          <meshBasicMaterial color={"#7777ff"} transparent depthWrite={false} />
        </animated.mesh>

        <Text
          position={[0, -0.03, 0.0]}
          depthOffset={0.2}
          fontSize={0.0825}
          anchorY="bottom-baseline"
          renderOrder={2}
        >
          Login
          <meshBasicMaterial color="black" transparent />
        </Text>
      </group>
    </group>
  );
};

export default Login;
