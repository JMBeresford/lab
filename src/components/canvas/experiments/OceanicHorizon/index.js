import { useThree } from '@react-three/fiber';
import Sky from './Sky';
import Ocean from './Ocean';
import { useCursor } from '@react-three/drei';
import { useEffect } from 'react';
import useStore from '@/helpers/store';
import Controls from './Controls';

const Experiment = () => {
  const camera = useThree((state) => state.camera);
  const dom = useStore((state) => state.dom);

  useEffect(() => {
    camera.position.set(0, 2.5, 0);
    camera.rotation.reorder('YXZ');
  }, [camera]);

  useEffect(() => {
    useStore.setState({ experimentLoaded: true });
  }, []);

  return (
    <>
      <Sky />
      <Ocean />
      <Controls />
    </>
  );
};

export default Experiment;
