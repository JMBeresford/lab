import { useDetectGPU } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  Outline,
  SMAA,
} from '@react-three/postprocessing';
import { useControls } from 'leva';
import { BlendFunction, KernelSize, Resolution } from 'postprocessing';
import { Suspense, useMemo } from 'react';

const Post = () => {
  const { size, gl } = useThree();

  const GPU = useDetectGPU({ glContext: gl.getContext() });

  const { color } = useControls('Saber', {
    color: { value: '#00ff00' },
  });

  const scaleFactor = useMemo(() => {
    switch (GPU.tier) {
      case 3: {
        return 1;
      }

      case 2: {
        return 1;
      }

      default: {
        return 0.5;
      }
    }
  }, [GPU]);

  return (
    <Suspense fallback={null}>
      <EffectComposer multisampling={8} autoClear={false}>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.85}
          width={size.width * scaleFactor}
          height={size.height * scaleFactor}
          kernelSize={
            scaleFactor === 1 ? KernelSize.MEDIUM : KernelSize.VERY_SMALL
          }
          luminanceThreshold={0.75}
          luminanceSmoothing={0.2}
        />
        <Outline
          blur
          blendFunction={BlendFunction.ALPHA}
          xRay={false}
          edgeStrength={7}
          visibleEdgeColor={color}
          hiddenEdgeColor='white'
          width={size.width * scaleFactor}
          height={size.height * scaleFactor}
          kernelSize={
            scaleFactor === 1 ? KernelSize.MEDIUM : KernelSize.VERY_SMALL
          }
        />
      </EffectComposer>
    </Suspense>
  );
};

export default Post;
