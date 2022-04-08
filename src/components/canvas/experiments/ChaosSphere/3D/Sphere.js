import { shaderMaterial, useDetectGPU } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useMemo, useRef } from 'react';
import { Color } from 'three';
import { vertexShader, fragmentShader } from './shaders/sphere';

const SphereMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmp: [0.375, 0.375, 0.375],
    uLight1Color: new Color(),
    uLight2Color: new Color(),
    uColor: new Color(),
    uDetail: [1, 1, 1],
    uFbmOctaves: 4,
  },
  vertexShader,
  fragmentShader
);

extend({ SphereMaterial });

const Sphere = () => {
  const ref = useRef();
  const GPU = useDetectGPU();

  const { amplitude, light1Color, light2Color, sphereColor, detail } =
    useControls({
      amplitude: {
        value: { x: 0.5, y: 0.7, z: 1.9 },
        x: { min: 0, max: 2, step: 0.1 },
        y: { min: 0, max: 2, step: 0.1 },
        z: { min: 0, max: 2, step: 0.1 },
      },
      light1Color: '#7f56cc',
      light2Color: '#54ba56',
      sphereColor: '#36579a',
      detail: {
        value: { x: 1, y: 0.3, z: 6.5 },
        x: { min: 0, max: 100, step: 0.1 },
        y: { min: 0, max: 100, step: 0.1 },
        z: { min: 0, max: 100, step: 0.1 },
      },
    });

  const resolution = useMemo(() => {
    switch (GPU.tier) {
      case 3: {
        return 1024;
      }
      case 2: {
        return 512;
      }
      default: {
        return 256;
      }
    }
  }, [GPU.tier]);

  useEffect(() => {
    switch (GPU.tier) {
      case 3: {
        ref.current.material.uFbmOctaves = 3;
        break;
      }
      case 2: {
        ref.current.material.uFbmOctaves = 2;
        break;
      }
      default: {
        ref.current.material.uFbmOctaves = 1;
        break;
      }
    }
  });

  useEffect(() => {
    ref.current.material.uniforms.uLight1Color.value.setStyle(light1Color);
  }, [light1Color]);

  useEffect(() => {
    ref.current.material.uniforms.uLight2Color.value.setStyle(light2Color);
  }, [light2Color]);

  useEffect(() => {
    ref.current.material.uniforms.uColor.value.setStyle(sphereColor);
  }, [sphereColor]);

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime * 0.25;
  });

  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[3, resolution, resolution]} />
      <sphereMaterial uAmp={amplitude} uDetail={detail} />
    </mesh>
  );
};

export default Sphere;
