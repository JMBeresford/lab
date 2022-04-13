import { shaderMaterial, useDetectGPU } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useMemo, useRef } from 'react';
import { Color } from 'three';
import { vertexShader, fragmentShader } from './shaders/sphere';
import { BloomPass, UnrealBloomPass } from 'three-stdlib';

const SphereMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmp: 0.4,
    uLight1Color: new Color(),
    uLight2Color: new Color(),
    uFresnelColor: new Color(),
    uLightIntensity: [1, 1],
    uColor: new Color(),
    uDetail: 0.2,
    uFbmOctaves: 4,
    uResolution: [1, 1],
  },
  vertexShader,
  fragmentShader,
  (m) => {
    m.defines.USE_TANGENT = '';
  }
);

extend({ SphereMaterial, UnrealBloomPass, BloomPass });

const Sphere = () => {
  const ref = useRef();
  const { gl } = useThree();
  const GPU = useDetectGPU({ glContext: gl.getContext() });

  const { amplitude, sphereColor, detail, speed } = useControls('Sphere', {
    amplitude: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.05,
    },
    sphereColor: '#162052',
    detail: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.05,
    },
    speed: {
      value: 0.7,
      min: 0,
      max: 2,
      step: 0.1,
    },
  });

  const {
    light1Intensity,
    light2Intensity,
    light1Color,
    light2Color,
    highlightColor,
  } = useControls('Lighting', {
    light1Intensity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    light2Intensity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    light1Color: '#ff4ba2',
    light2Color: '#54ba84',
    highlightColor: '#ffffff',
  });

  const resolution = useMemo(() => {
    switch (GPU.tier) {
      case 3: {
        return 512;
      }
      case 2: {
        return 512;
      }
      case 1: {
        return 256;
      }
      default: {
        return 128;
      }
    }
  }, [GPU]);

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
    ref.current.material.uniforms.uFresnelColor.value.setStyle(highlightColor);
  }, [highlightColor]);

  useEffect(() => {
    ref.current.material.uniforms.uColor.value.setStyle(sphereColor);
  }, [sphereColor]);

  useEffect(() => {
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
        uDetail={detail * 0.25}
        uResolution={[resolution, resolution]}
        uLightIntensity={[light1Intensity, light2Intensity]}
      />
    </mesh>
  );
};

export default Sphere;
