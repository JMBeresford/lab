import { Text } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import React from "react";
import { LabelParamsTypes } from ".";

type PropsTypes = LabelParamsTypes & {
  position?: Vector3;
};

const Label = (props: PropsTypes) => {
  const {
    font,
    fontSize = 0.08,
    color = "black",
    label,
    position = [0, 0, 0],
  } = props;
  return (
    <group position={position}>
      <Text
        font={font}
        fontSize={fontSize}
        anchorX="left"
        anchorY="bottom"
        color={color}
      >
        {label}
      </Text>
    </group>
  );
};

export default Label;
