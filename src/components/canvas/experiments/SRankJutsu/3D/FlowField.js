import { shaderMaterial, useFBO, useTexture } from '@react-three/drei';
import { extend, useFrame, createPortal, useThree } from '@react-three/fiber';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Color,
  DataTexture,
  FloatType,
  LinearEncoding,
  NearestFilter,
  OrthographicCamera,
  RGBAFormat,
  Scene,
} from 'three';
import { fragmentShader, vertexShader } from './shaders/fbo';
import blankImg from '../img/blank.png';
import { useControls } from 'leva';

const FBOMaterial = shaderMaterial(
  {
    uTime: 0,
    uDelta: 16,
    uTexture: null,
    uStartTexture: null,
    uTimeFrequency: 1,
    uNoiseAmplitude: 1,
    uNoiseMultiplier: 1,
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    // mat.transparent = true;
  }
);

extend({ FBOMaterial });

const FlowField = React.forwardRef(({ count, size }, textureRef) => {
  const planeRef = useRef();
  const baseRef = useRef();
  const camRef = useRef();
  const primaryTarget = useRef();
  const secondaryTarget = useRef();

  const { timeFactor, amplitude, multiplier } = useControls('FlowField', {
    timeFactor: { value: 0.5, min: 0.1, max: 1.0, step: 0.01 },
    amplitude: { value: 0.1, min: 0.1, max: 10, step: 0.1 },
    multiplier: { value: 0.1, min: 0.1, max: 10, step: 0.1 },
  });

  const scene = useMemo(() => new Scene(), []);

  const target1 = useFBO(size.width, size.height, {
    multisample: false,
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    generateMipmaps: false,
    format: RGBAFormat,
    type: FloatType,
    encoding: LinearEncoding,
    depthBuffer: false,
    stencilBuffer: false,
  });

  const target2 = useFBO(size.width, size.height, {
    multisample: false,
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    generateMipmaps: false,
    format: RGBAFormat,
    type: FloatType,
    encoding: LinearEncoding,
    depthBuffer: false,
    stencilBuffer: false,
  });

  const startTexture = useMemo(() => {
    let w = size.width,
      h = size.height;

    let bufferSize = w * h;

    const buffer = new Float32Array(bufferSize * 4);

    for (let i = 0; i < bufferSize; i++) {
      buffer[i * 4 + 0] = Math.random();
      buffer[i * 4 + 1] = Math.random();
      buffer[i * 4 + 2] = Math.random();
      buffer[i * 4 + 3] = Math.random();
    }

    const t = new DataTexture(buffer, w, h, RGBAFormat, FloatType);

    t.minFilter = NearestFilter;
    t.magFilter = NearestFilter;
    t.encoding = LinearEncoding;
    t.generateMipmaps = false;

    t.needsUpdate = true;

    return t;
  }, [size]);

  useEffect(() => {
    primaryTarget.current = target1;
  }, [target1]);

  useEffect(() => {
    secondaryTarget.current = target2;
  }, [target2]);

  useFrame(({ gl, clock }, delta) => {
    if (!primaryTarget.current || !secondaryTarget.current || !scene) {
      return;
    }

    // set uniforms
    planeRef.current.material.uTime = clock.elapsedTime;
    planeRef.current.material.uDelta = delta;
    planeRef.current.material.uTexture = secondaryTarget.current.texture;

    // render to target
    gl.setRenderTarget(primaryTarget.current);
    gl.render(scene, camRef.current);
    gl.setRenderTarget(null);

    // swap targets
    let t = primaryTarget.current;
    primaryTarget.current = secondaryTarget.current;
    secondaryTarget.current = t;

    textureRef.current = secondaryTarget.current.texture;
  });

  return (
    <>
      {createPortal(
        <mesh ref={planeRef}>
          <planeGeometry args={[1, 1]} />
          <fBOMaterial
            uStartTexture={startTexture}
            uTexture={startTexture}
            uTimeFrequency={timeFactor * 0.1}
            uNoiseAmplitude={amplitude}
            uNoiseMultiplier={multiplier}
          />
        </mesh>,
        scene
      )}
      <orthographicCamera
        ref={camRef}
        args={[-0.5, 0.5, 0.5, -0.5, 0.1, 10]}
        position={[0, 0, 1]}
      />
      {/* <mesh ref={baseRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={startTexture} transparent={true} />
      </mesh> */}
    </>
  );
});

FlowField.displayName = 'FlowField';

export default FlowField;
