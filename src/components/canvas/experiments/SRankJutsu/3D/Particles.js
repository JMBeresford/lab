import { shaderMaterial, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useEffect, useMemo, useRef } from 'react';
import { AdditiveBlending, Color, Texture } from 'three';
import { fragmentShader, vertexShader } from './shaders/particles';
import mask from '../img/particleMask.png';
import FlowField from './FlowField';

const ParticleMaterial = shaderMaterial(
  {
    uPointColor1: new Color(),
    uPointColor2: new Color(),
    uTime: 0,
    uFBO: new Texture(),
    uMask: new Texture(),
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

const Particles = ({ sphereRes = 128 }) => {
  const ref = useRef();
  const textureRef = useRef();
  const debugRef = useRef();

  const { particleColor, particleColor2 } = useControls('Particles', {
    particleColor: { value: '#ffffff' },
    particleColor2: { value: '#95e7f5' },
  });

  const maskTexture = useTexture(mask.src);

  const count = useMemo(() => {
    return sphereRes * sphereRes;
  }, [sphereRes]);

  const FBOsize = useMemo(() => {
    let w = 256;
    let h = Math.ceil(count / w);

    return { width: w, height: h };
  }, [count]);

  const uvs = useMemo(() => {
    let uvs = [];

    for (let i = 0; i < count; i++) {
      let x = (i % FBOsize.width) / FBOsize.width;
      let y = Math.floor(i / FBOsize.width) / FBOsize.height;

      uvs.push(x, y);
    }

    console.log(uvs);

    return new Float32Array(uvs);
  }, [FBOsize, count]);

  useEffect(() => {
    console.log(ref.current);
  }, []);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame(({ gl, clock }) => {
    ref.current.material.uFBO = textureRef.current;
    debugRef.current.material.map = textureRef.current;
  });

  return (
    <group>
      <FlowField ref={textureRef} count={count} size={FBOsize} />
      <mesh ref={debugRef} position={[-2, 0, -2]}>
        <planeGeometry args={[256 / 40, 1]} />
        <meshBasicMaterial transparent={true} />
      </mesh>
      {/* <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attachObject={['attributes', 'position']}
            count={count}
            itemSize={3}
            array={positions}
          />
          <bufferAttribute
            attachObject={['attributes', 'uv']}
            count={count}
            itemSize={2}
            array={uvs}
          />
        </bufferGeometry>
        <particleMaterial
          uPointColor1={particleColor}
          uPointColor2={particleColor2}
          uMask={maskTexture}
        />
      </points> */}
      <points ref={ref}>
        <sphereGeometry args={[1, sphereRes, sphereRes]} />
        <particleMaterial
          uPointColor1={particleColor}
          uPointColor2={particleColor2}
          uMask={maskTexture}
        />
      </points>
    </group>
  );
};

export default Particles;
