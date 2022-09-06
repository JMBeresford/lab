import { extend, useThree } from "@react-three/fiber";
import { Effects, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import HeroModel from "./3d/HeroModel";
import Sky from "./3d/Sky";
import { Suspense, useEffect } from "react";
import useStore from "@/helpers/store";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { BloomPass } from "three-stdlib";

extend({ BloomPass });

const Experiment = () => {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor("#000000", 0);
  }, [gl]);

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  const { threshold, smoothing, intensity } = useControls("Bloom", {
    intensity: { value: 0.85, min: 0, max: 1, step: 0.05 },
    smoothing: { value: 0.9, min: 0, max: 1, step: 0.05 },
    threshold: { value: 0.3, min: 0, max: 1, step: 0.05 },
  });

  return (
    <>
      <HeroModel />

      <PerspectiveCamera makeDefault={true} position={[0, 5, 30.5]} />

      <OrbitControls
        target={[0, 3, 0]}
        maxDistance={50}
        minDistance={10}
        enablePan={false}
        enableDamping={true}
      />
      <Sky position={[0, 0, -20]} />

      <EffectComposer antialias={8}>
        <Bloom
          intensity={intensity}
          luminanceSmoothing={smoothing}
          luminanceThreshold={threshold}
          width={200}
          height={200}
        />
      </EffectComposer>
    </>
  );
};

export default Experiment;
