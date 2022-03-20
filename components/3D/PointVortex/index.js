import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import { vertexShader, fragmentShader } from './shaders';

const VortexMaterial = shaderMaterial(
  {
    uTime: { value: 0 },
    uViewport: { value: [1, 1] },
    uMouse: { value: [0, 0] },
  },
  vertexShader,
  fragmentShader,
  (m) => {
    m.transparent = true;
    m.depthTest = false;
  }
);

extend({ VortexMaterial });

const PointVortex = ({ count = 1000 }) => {
  const ref = useRef();

  const viewport = useThree((state) => state.viewport);

  const points = useMemo(() => {
    let p = [];

    for (let i = 0; i < count; i++) {
      let x = Math.random() - 0.5;
      let y = Math.random() - 0.5;
      let z = -2;

      p.push(x, y, z);
    }

    return new Float32Array(p);
  }, []);

  const speed = useMemo(() => {
    let s = [];

    for (let i = 0; i < count; i++) {
      s.push(Math.random());
    }

    return new Float32Array(s);
  }, []);

  useEffect(() => {
    ref.current.material.uViewport = [viewport.width, viewport.height];
  }, [viewport]);

  useFrame(({ clock, mouse }) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uTime = clock.elapsedTime * 0.2 + 100;
      ref.current.material.uMouse = [mouse.x, mouse.y];
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'speed']}
          count={speed.length}
          array={speed}
          itemSize={1}
        />
      </bufferGeometry>
      <vortexMaterial />
    </points>
  );
};

export default PointVortex;
