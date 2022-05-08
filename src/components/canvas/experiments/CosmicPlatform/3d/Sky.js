import React, { useRef } from 'react';
import { Environment, shaderMaterial } from '@react-three/drei';
import { extend, useThree, useFrame } from '@react-three/fiber';
import skyVertexShader from '../shaders/sky/vertex.glsl';
import skyFragmentShader from '../shaders/sky/fragment.glsl';
import { Vector2, Color, BackSide } from 'three';
import envMap from '../img/env.hdr';

// const SkyMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uResolution: new Vector2(0, 0),
//     uColor: new Color(1, 0, 0),
//     uColor2: new Color(1, 0, 0),
//     uColor3: new Color(1, 0, 0),
//     uColor4: new Color(1, 0, 0),
//   },
//   skyVertexShader,
//   skyFragmentShader
// );

// extend({ SkyMaterial });

const Sky = (props) => {
  const { size } = useThree();
  const ref = useRef();

  // useFrame(({ clock }) => {
  //   ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  // });

  return (
    <>
      <Environment files={envMap} />
      <mesh ref={ref} {...props}>
        {/* <planeGeometry args={[200, 200]} />
      <skyMaterial
        uColor={'#00090f'}
        uColor2={'#001524'}
        uColor3={'#ff9e9e'}
        uColor4={'#000e24'}
        uResolution={[size.width, size.height]}
      /> */}
        <sphereGeometry args={[200, 20, 20]} />
        <meshStandardMaterial side={BackSide} envMapIntensity={0.5} />
      </mesh>
    </>
  );
};

export default Sky;
