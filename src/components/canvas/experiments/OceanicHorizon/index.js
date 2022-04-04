import { useThree } from '@react-three/fiber';
import Sky from './Sky';
import Ocean from './Ocean';
import { useEffect } from 'react';
import useStore from '@/helpers/store';
import Controls from './Controls';

const Experiment = () => {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    camera.position.set(0, 2.5, 0);
    camera.rotation.reorder('YXZ');
  }, [camera.position, camera.rotation]);

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
