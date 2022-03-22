import { useThree } from '@react-three/fiber';
import Sky from './Sky';
import Ocean from './Ocean';
import { OrbitControls } from '@react-three/drei';
import { useEffect } from 'react';
import useStore from '@/helpers/store';

const Experiment = () => {
  const camera = useThree((state) => state.camera);
  const events = useThree((state) => state.events);

  const dom = useStore((state) => state.dom);

  useEffect(() => {
    camera.position.set(0, 2.5, 0);
  }, [camera]);

  useEffect(() => {
    console.log(events);
    // events.disconnect();
  }, [events, dom]);

  return (
    <>
      <Sky />
      <Ocean />
      <OrbitControls
        domElement={events.connected}
        camera={camera}
        enablePan={false}
        enableZoom={false}
        dampingFactor={0.1}
        rotateSpeed={0.25}
        target={[0.0, 2.5, 0]}
      />
    </>
  );
};

export default Experiment;
