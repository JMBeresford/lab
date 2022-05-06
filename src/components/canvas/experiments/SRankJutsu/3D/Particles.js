import { shaderMaterial, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { vertexShader, fragmentShader } from './shaders/particles';
import particleMaskImg from '../img/particleMask.png';
import { AdditiveBlending, Color, Vector2 } from 'three';
import { useControls } from 'leva';
import { animated, useSpring } from '@react-spring/three';

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uPower: 0,
    uMask: null,
    uSize: 1,
    uSpeed: 1,
    uDpr: 1,
    uInnerColor: new Color(),
    uOuterColor: new Color(),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthTest = false;
    mat.blending = AdditiveBlending;
  }
);

extend({ ParticleMaterial });

const AnimatedParticlesMaterial = animated('particleMaterial');

const Particles = ({ count = 2000, stage }) => {
  const ref = useRef();

  const maskTex = useTexture(particleMaskImg.src);

  const { viewport } = useThree();

  const { power } = useSpring({
    power:
      stage === 0
        ? 0
        : stage === 1
        ? 0.25
        : stage === 2
        ? 0.5
        : stage === 3
        ? 0.75
        : 1,
  });

  const { outerColor, innerColor, size, speed } = useControls(
    'Particles',
    {
      outerColor: { value: '#161c38' },
      innerColor: { value: '#7dacff' },
      size: { value: 20.5, min: 0, max: 50, step: 0.5 },
      speed: { value: 0.15, min: 0, max: 2, step: 0.01 },
    },
    {
      collapsed: true,
    }
  );

  const positions = useMemo(() => {
    let pos = [];

    for (let i = 0; i < count; i++) {
      let x = Math.random() * 2 - 1;
      let y = Math.random() * 2 - 1;
      let z = Math.random() * 2 - 1;

      let mag = 1 / Math.sqrt(x * x + y * y + z * z);

      x *= mag;
      y *= mag;
      z *= mag;

      pos.push(x, y, z);
    }

    return new Float32Array(pos);
  }, [count]);

  const offset = useMemo(() => {
    let off = [];

    for (let i = 0; i < count; i++) {
      off.push(Math.random() * 0.5 + 0.5);
    }

    return new Float32Array(off);
  }, [count]);

  useFrame(({ clock, mouse }, delta) => {
    ref.current.material.uDelta = delta * 1000;
    ref.current.material.uTime = clock.elapsedTime + 100;
  });

  return (
    <>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attachObject={['attributes', 'position']}
            array={positions}
            itemSize={3}
            count={count}
          />
          <bufferAttribute
            attachObject={['attributes', 'aOffset']}
            array={offset}
            itemSize={1}
            count={count}
          />
        </bufferGeometry>
        <AnimatedParticlesMaterial
          uMask={maskTex}
          uDpr={viewport.dpr}
          uSize={(size * viewport.height) / viewport.distance}
          uInnerColor={innerColor}
          uOuterColor={outerColor}
          uSpeed={speed}
          uPower={power}
        />
      </points>
    </>
  );
};

export default Particles;
