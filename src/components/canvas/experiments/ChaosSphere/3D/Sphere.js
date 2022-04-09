import { shaderMaterial, useDetectGPU } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Color, DoubleSide } from 'three';
import { vertexShader, fragmentShader } from './shaders/sphere';

const SphereMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmp: 0.4,
    uLight1Color: new Color(),
    uLight2Color: new Color(),
    uColor: new Color(),
    uDetail: 0.2,
    uFbmOctaves: 4,
    uResolution: [1, 1],
  },
  vertexShader,
  fragmentShader,
  (m) => {
    m.defines.USE_TANGENT = '';
    m.side = DoubleSide;
  }
);

extend({ SphereMaterial });

const Sphere = () => {
  const ref = useRef();
  const GPU = useDetectGPU();

  const { amplitude, light1Color, light2Color, sphereColor, detail, speed } =
    useControls({
      amplitude: {
        value: 0.4,
        min: 0,
        max: 2,
        step: 0.1,
      },
      light1Color: '#ff4ba2',
      light2Color: '#54ba84',
      sphereColor: '#162052',
      detail: {
        value: 0.4,
        min: 0,
        max: 1,
        step: 0.05,
      },
      speed: {
        value: 1,
        min: 0,
        max: 2,
        step: 0.1,
      },
    });

  const resolution = useMemo(() => (GPU.tier > 1 ? 1024 : 512), [GPU]);

  useEffect(() => {
    switch (GPU.tier) {
      case 3: {
        ref.current.material.uFbmOctaves = 2;
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
  }, [GPU]);

  useEffect(() => {
    ref.current.material.uniforms.uLight1Color.value.setStyle(light1Color);
  }, [light1Color]);

  useEffect(() => {
    ref.current.material.uniforms.uLight2Color.value.setStyle(light2Color);
  }, [light2Color]);

  useEffect(() => {
    ref.current.material.uniforms.uColor.value.setStyle(sphereColor);
  }, [sphereColor]);

  useLayoutEffect(() => {
    ref.current.geometry.computeTangents();
  }, []);

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime * 0.25 * speed;
  });

  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[3, resolution, resolution]} />
      <sphereMaterial
        uAmp={amplitude}
        uDetail={detail * 0.5}
        uResolution={[resolution, resolution]}
      />
    </mesh>
  );
};

export default Sphere;
