import { Text, useCursor } from "@react-three/drei";
import { Euler, Vector3, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { animated, useSpring } from "@react-spring/three";

/**
 * EXPERIMENT IS NOW A STANDALONE PACKAGE FOUND HERE:
 * https://github.com/JMBeresford/r3f-input
 */
import { Input } from "@jberesford/r3f-input";
import { useControls } from "leva";
import { clamp } from "three/src/math/MathUtils";

type PropsTypes = {
  position?: Vector3;
  rotation?: Euler;
  width?: number;
};

const Login = (props: PropsTypes) => {
  const { width = 1.5, position, rotation } = props;
  const [hovered, setHovered] = useState(false);
  const viewport = useThree((s) => s.viewport);

  const { buttonSize } = useSpring({
    buttonSize: hovered ? 1.025 : 1,
  });

  const { fontSize } = useControls("text", {
    fontSize: { value: 0.0825, min: 0.01, max: 0.6, step: 0.01 },
  });

  const w = useMemo(
    () => clamp(width, 0.55, (viewport.width / viewport.distance) * 0.9),
    [viewport, width]
  );

  useCursor(hovered);

  return (
    <group position={position} rotation={rotation}>
      <Input
        width={w}
        type="text"
        label="Username"
        textProps={{ fontSize: fontSize * (w < 1.2 ? 0.55 : 1) }}
        labelProps={{ fontSize: fontSize * (w < 1.2 ? 0.5 : 0.85) }}
      />

      <Input
        width={w}
        position={[0, -0.3, 0]}
        type="password"
        label="Password"
        textProps={{ fontSize: fontSize * (w < 1.2 ? 0.55 : 1) }}
        labelProps={{ fontSize: fontSize * (w < 1.2 ? 0.5 : 0.85) }}
      />

      <group
        position-y={-0.6}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <animated.mesh scale={buttonSize} renderOrder={1}>
          <boxGeometry args={[w, 0.15, 0.01]} />
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
