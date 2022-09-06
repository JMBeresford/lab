import { Suspense, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import PointVortex from "./PointVortex";
import ExperimentList from "./ExperimentList";
import { PerspectiveCamera, Text } from "@react-three/drei";
import fontPath from "@/fonts/MajorMonoDisplay.ttf";
import { Vector2 } from "three";
import useStore from "@/helpers/store";

const HeaderText = () => {
  const size = useThree((state) => state.size);

  return (
    <Text
      text="experiments"
      font={fontPath}
      position={[0, 2.75, -0.5]}
      color="black"
      fontSize={size.width >= 768 ? 0.75 : 0.375}
    />
  );
};

const tempV2 = new Vector2();

const Experiments = () => {
  const { gl, scene } = useThree();
  const group = useRef();

  useEffect(() => {
    useStore.setState({ currentExperiment: null, experimentLoaded: false });
  }, []);

  // reset bg color when coming back from experiments
  useEffect(() => {
    gl.setClearColor("#fafaff", 1);
  }, [gl]);

  // remove fog when coming back from experiments
  useEffect(() => {
    scene.fog = null;
  }, [scene]);

  useFrame(({ mouse }) => {
    tempV2.lerp(mouse, 0.1);
    if (group.current) {
      group.current.rotation.x = -tempV2.y * 0.1;
      group.current.rotation.y = tempV2.x * 0.1;
    }
  });

  return (
    <>
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault={true}
          position={[0, 0, 8]}
          rotation={[0, 0, 0]}
        />
        <PointVortex count={500} />
        <group ref={group}>
          <HeaderText />
          <ExperimentList />
        </group>
      </Suspense>
    </>
  );
};

export default Experiments;
