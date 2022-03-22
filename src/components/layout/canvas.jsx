import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import useStore from '@/helpers/store';
import { useEffect, useRef } from 'react';

const LControl = () => {
  const dom = useStore((state) => state.dom);
  const control = useRef(null);

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none';
    }
  }, [dom, control]);
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />;
};

const LCanvas = ({ children }) => {
  // const dom = useStore((state) => state.dom);

  return (
    <Canvas
      mode='concurrent'
      gl={{ alpha: true }}
      style={{
        position: 'absolute',
        top: 0,
      }}
      camera={{ position: [0, 0, 5], rotation: [0, 0, 0] }}
      // onCreated={(state) => state.events.connect(dom.current)}
    >
      <LControl />
      <Preload all />
      {children}
    </Canvas>
  );
};

export default LCanvas;
