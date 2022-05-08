import React, { useEffect, useRef, Suspense } from 'react';
import { Text as TextImpl } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import font from '@/fonts/MajorMonoDisplay.ttf';

const Text = () => {
  const ref = useRef();

  const { camera, viewport, size } = useThree();

  // useEffect(() => {
  //   camera.add(ref.current);
  // }, [camera]);

  return (
    <Suspense fallback={null}>
      <TextImpl
        ref={ref}
        font={font}
        textAlign='center'
        position={[0, 0, -10]}
        letterSpacing={0.2}
        fontSize={size.width > 1000 ? 5 : 3.75}
        fillOpacity={0.2}
        strokeColor='black'
        outlineColor='black'
        text={`click${'\n'}drag${'\n'}zoom`}
      />
    </Suspense>
  );
};

export default Text;
