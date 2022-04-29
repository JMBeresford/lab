import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useMemo, useRef } from 'react';
import { Color, Vector2 } from 'three';
import Noise from './Noise';
import { vertexShader, fragmentShader } from './shaders/rasengan';

const RasenganMaterial = shaderMaterial(
  {
    uResolution: new Vector2(),
    uAspect: new Vector2(),
    uTime: 0,

    uCoreColor: new Color(),
    uCoreSize: 0.06,

    uFresnelColor: new Color(),
    uFresnelMultiplier: 1.2,
    uFresnelOffset: 1,
    uFresnelExponent: 10,

    uInnerFresnelMultipler: 1,
    uInnerFresnelOffset: 1,
    uInnerFresnelExponent: 10,
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
  }
);

extend({ RasenganMaterial });

const Rasengan = () => {
  const ref = useRef();
  const lightRef = useRef();
  const { size, viewport } = useThree();

  const {
    color,
    colorHighlight,
    sizeHighlight,
    powerHighlight,
    offsetHighlight,
  } = useControls('Rasengan', {
    color: { value: '#95e7f5' },
    colorHighlight: { value: '#95e7f5' },
    sizeHighlight: { value: 1.2, min: 0, max: 2, step: 0.025 },
    powerHighlight: { value: 1.5, min: 0, max: 75, step: 0.05 },
    offsetHighlight: { value: 1.2, min: 0, max: 5, step: 0.01 },
  });

  const { density, coreExponent, coreOffset } = useControls('Core', {
    density: { value: 5.5, min: 0, max: 10, step: 0.01 },
    coreExponent: { value: 3.7, min: 0, max: 5, step: 0.1 },
    coreOffset: { value: 0.9, min: 0, max: 1.25, step: 0.01 },
  });

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
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <rasenganMaterial
          uCoreColor={color}
          uResolution={[size.width, size.height]}
          uAspect={aspect}
          uCoreSize={density}
          uFresnelColor={colorHighlight}
          uFresnelMultiplier={sizeHighlight}
          uFresnelExponent={powerHighlight}
          uFresnelOffset={offsetHighlight}
          uInnerFresnelExponent={coreExponent}
          uInnerFresnelOffset={coreOffset}
        />
      </mesh>
      <Noise />

      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color={color}
        intensity={10}
      />
    </group>
  );
};

export default Rasengan;
