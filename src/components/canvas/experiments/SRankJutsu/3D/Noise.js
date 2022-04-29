import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide, Vector2 } from 'three';
import { fragmentShader, vertexShader } from './shaders/curves';

const CurvesMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoiseScale: 0,
    uNoiseSize: 0,
    uResolution: new Vector2(),
    uAspect: new Vector2(),
    uCurveColor1: new Color(),
    uCurveColor2: new Color(),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.side = DoubleSide;
    mat.depthTest = false;
    mat.blending = AdditiveBlending;
  }
);

extend({ CurvesMaterial });

const Noise = () => {
  const ref = useRef();
  const { size, viewport } = useThree();

  const { outerColor, innerColor, noiseScale, noiseSize } = useControls(
    'Noise',
    {
      outerColor: { value: '#95e7f5' },
      innerColor: { value: '#ffffff' },
      noiseScale: { value: 0.3, min: 0, max: 5, step: 0.1 },
      noiseSize: { value: 0.04, min: 0, max: 1, step: 0.01 },
    }
  );

  const aspect = useMemo(() => {
    if (size.width > size.height) {
      return [viewport.aspect, 1];
    } else {
      return [1, 1 / viewport.aspect];
    }
  }, [viewport, size]);

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime;
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <curvesMaterial
          uCurveColor1={outerColor}
          uCurveColor2={innerColor}
          uResolution={[size.width, size.height]}
          uAspect={aspect}
          uNoiseScale={noiseScale}
          uNoiseSize={noiseSize}
        />
      </mesh>
    </>
  );
};

export default Noise;
