import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  BackSide,
  Color,
  DoubleSide,
  NormalBlending,
  SubtractiveBlending,
  Vector2,
} from 'three';
import Noise from './Noise';
import Particles from './Particles';
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
  const { size, viewport } = useThree();

  const { coreColor, coreSize } = useControls('Core', {
    coreColor: { value: '#95e7f5' },
    coreSize: { value: 0.23, min: 0, max: 0.5, step: 0.01 },
  });

  const { colorHighlight, sizeHighlight, powerHighlight, offsetHighlight } =
    useControls('Highlight', {
      colorHighlight: { value: '#95e7f5' },
      sizeHighlight: { value: 1.2, min: 0, max: 2, step: 0.025 },
      powerHighlight: { value: 1.5, min: 0, max: 20, step: 0.5 },
      offsetHighlight: { value: 1.2, min: 0, max: 5, step: 0.1 },
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
          uCoreColor={coreColor}
          uResolution={[size.width, size.height]}
          uAspect={aspect}
          uCoreSize={coreSize}
          uFresnelColor={colorHighlight}
          uFresnelMultiplier={sizeHighlight}
          uFresnelExponent={powerHighlight}
          uFresnelOffset={offsetHighlight}
        />
      </mesh>
      <Noise />
      <Particles />
    </group>
  );
};

export default Rasengan;
