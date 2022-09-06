import Sky from "./Sky";
import Ocean from "./Ocean";
import { useEffect } from "react";
import useStore from "@/helpers/store";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const Experiment = () => {
  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  return (
    <>
      <Sky />
      <Ocean />

      <PerspectiveCamera makeDefault={true} />

      <OrbitControls
        position={[0, 2.5, 0]}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.025}
        target={[0, 2.5, 0]}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

export default Experiment;
