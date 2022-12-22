import { OrbitControlsProps, useCursor } from "@react-three/drei";
import { Color, ThreeEvent, useThree, Vector3 } from "@react-three/fiber";
import { useState, useMemo, useCallback } from "react";
import Label from "./Label";
import Text from "./Text";

export type TextParamsTypes = {
  fontSize?: number;
  color?: Color;
  font?: string;
  type?: "text" | "password";
};

export type LabelParamsTypes = {
  fontSize?: number;
  font?: string;
  label?: string;
  color?: Color;
};

type PropTypes = {
  textParams?: TextParamsTypes;
  labelParams?: LabelParamsTypes;
  width?: number;
  position?: Vector3;

  // [left/right , top/bottom] in % of width and height, respectively
  padding?: [number, number];
};

const Input = (props: PropTypes) => {
  const {
    textParams = { fontSize: 0.1, color: "black", type: "text" },
    labelParams = { fontSize: 0.1 },
    width,
    padding = [0.025, 0.1],
    position = [0, 0, 0],
  } = props;
  const controls: OrbitControlsProps = useThree((s) => s.controls);

  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered, "text");

  const height = useMemo(
    () => textParams.fontSize + padding[1] * textParams.fontSize * 2,
    [textParams.fontSize, padding]
  );

  // EVENTS
  const handlePointerOver = useCallback(() => {
    if (controls) {
      controls.enabled = false;
    }
    setHovered(true);
  }, [controls]);

  const handlePointerLeave = useCallback(() => {
    if (controls) {
      controls.enabled = true;
    }
    setHovered(false);
  }, [controls]);

  return (
    <group position={position}>
      <Label {...labelParams} position={[-width / 2, height / 1.8, 0]} />
      <Text
        {...textParams}
        active={active}
        width={width}
        padding={padding}
        height={height}
      />

      <mesh
        onPointerOver={handlePointerOver}
        onPointerLeave={handlePointerLeave}
        onPointerMissed={() => setActive(false)}
        onPointerDown={() => setActive(true)}
      >
        <boxGeometry args={[width, height, 0.01]} />
        <meshBasicMaterial
          color={"black"}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default Input;
