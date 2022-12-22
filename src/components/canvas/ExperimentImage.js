import {
  Image as ImageImpl,
  Text as TextImpl,
  useCursor,
} from "@react-three/drei";
import { useFlexSize } from "@react-three/flex";
import font from "@/fonts/MajorMonoDisplay.ttf";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils";
import { useSpring, animated } from "react-spring";
import useStore from "@/helpers/store";

const Text = animated(TextImpl);
const Image = animated(ImageImpl);

const ExperimentImage = ({ experiment, id }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const [w, h] = useFlexSize();
  useCursor(hovered);

  const { currentExperiment, router } = useStore();

  const { textOpacity } = useSpring({
    textOpacity: currentExperiment !== null ? 0 : hovered ? 1 : 0,
  });

  const imageProps = useSpring({
    zoom: hovered ? 1.25 : 1,
    scale: hovered ? 1.1 : 1,
    grayscale: hovered ? 0 : 0.75,
  });

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  useEffect(() => {
    ref.current.material.depthTest = false;
    ref.current.material.depthWrite = false;
    ref.current.material.transparent = true;
  }, []);

  const handleClick = useCallback(() => {
    useStore.setState({ currentExperiment: experiment.page });
    router.push(`/experiments/${experiment.page}`);
  }, [experiment, router]);

  return (
    <group scale={[w * 0.8, h * 0.8, 1]}>
      <Image
        ref={ref}
        url={experiment.image}
        alt={`${experiment.name} preview`}
        onPointerOver={() => {
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={() => handleClick()}
        opacity={opacity}
        toneMapped={false}
        {...imageProps}
      />
      <Text
        text={`-${id}-\n\n${experiment.name.toLowerCase()}`}
        font={font}
        color="black"
        textAlign="center"
        fontSize={0.135}
        maxWidth={0.9}
        fillOpacity={textOpacity}
        strokeOpacity={textOpacity}
        outlineWidth={"20%"}
        outlineColor="white"
        outlineBlur={"20%"}
        outlineOpacity={textOpacity}
        position={[0, 0, 0.1]}
      >
        <meshBasicMaterial toneMapped={false} />
      </Text>
    </group>
  );
};

export default ExperimentImage;
