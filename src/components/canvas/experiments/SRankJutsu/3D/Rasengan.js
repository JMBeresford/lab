import { shaderMaterial, Text } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import font from "@/fonts/MajorMonoDisplay.ttf";
import React, { Suspense, useMemo, useRef, useState } from "react";
import { Color, DoubleSide, Vector2 } from "three";
import Particles from "./Particles";
import { vertexShader, fragmentShader } from "./shaders/rasengan";
import { animated, useSpring } from "@react-spring/three";
import Wind from "./Wind";

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

    uNoiseScale: 0,
    uNoiseSize: 0,
    uNoiseSpeed: 0,
    uCurveColor1: new Color(),
    uCurveColor2: new Color(),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.side = DoubleSide;
    mat.depthWrite = false;
  }
);

extend({ RasenganMaterial });

const AnimText = animated(Text);

const Rasengan = () => {
  const ref = useRef();
  const lightRef = useRef();
  const power = useRef(-100);
  const lastMouse = useRef(new Vector2(0, 0));

  const { size, viewport } = useThree();

  const [on, setOn] = useState(false);
  const [stage, setStage] = useState(0);

  const { scale, lightIntensity } = useSpring({
    scale:
      stage === 0
        ? [0, 0, 0]
        : stage === 1
        ? [0.25, 0.25, 0.25]
        : stage === 2
        ? [0.5, 0.5, 0.5]
        : stage === 3
        ? [0.75, 0.75, 0.75]
        : [1, 1, 1],
    lightIntensity:
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

  const {
    color,
    colorHighlight,
    sizeHighlight,
    powerHighlight,
    offsetHighlight,
  } = useControls(
    "Rasengan",
    {
      color: { value: "#95e7f5" },
      colorHighlight: { value: "#95e7f5" },
      sizeHighlight: { value: 1.02, min: 0, max: 2, step: 0.025 },
      powerHighlight: { value: 1.5, min: 0, max: 75, step: 0.05 },
      offsetHighlight: { value: 1.2, min: 0, max: 5, step: 0.01 },
    },
    { collapsed: true }
  );

  const { density, coreExponent, coreOffset } = useControls(
    "Core",
    {
      density: { value: 5.5, min: 0, max: 10, step: 0.01 },
      coreExponent: { value: 1.7, min: 0, max: 5, step: 0.1 },
      coreOffset: { value: 0.82, min: 0, max: 1.25, step: 0.01 },
    },
    { collapsed: true }
  );

  const { outerColor, innerColor, noiseScale, noiseSize, noiseSpeed } =
    useControls(
      "Noise",
      {
        outerColor: { value: "#00cfff" },
        innerColor: { value: "#8eddff" },
        noiseScale: { value: 0.5, min: 0, max: 5, step: 0.1 },
        noiseSize: { value: 0.16, min: 0, max: 1, step: 0.01 },
        noiseSpeed: { value: 1, min: 0, max: 5, step: 0.1 },
      },
      { collapsed: true }
    );

  const aspect = useMemo(() => {
    if (size.width > size.height) {
      return [viewport.aspect, 1];
    } else {
      return [1, 1 / viewport.aspect];
    }
  }, [viewport, size]);

  useFrame(({ clock, mouse }, delta) => {
    ref.current.material.uTime = clock.elapsedTime;

    if (!on) {
      let d = mouse.distanceTo(lastMouse.current);
      power.current += d * delta * 10;
      lastMouse.current.copy(mouse);

      if (power.current >= 1) {
        setOn(true);
        setStage(4);
      } else if (power.current >= 0.75) {
        setStage(3);
      } else if (power.current >= 0.5) {
        setStage(2);
      } else if (power.current >= 0.25) {
        setStage(1);
      }

      power.current -= delta * 0.25;
      power.current = Math.max(0, power.current);

      if (power.current < 0.25) {
        setStage(0);
      } else if (power.current < 0.5) {
        setStage(1);
      } else if (power.current < 0.75) {
        setStage(2);
      }

      ref.current.material.uPower = power.current;
    }
  });

  return (
    <>
      <Suspense fallback={null}>
        <AnimText
          font={font}
          renderOrder={1}
          position={[0, 1, -4.5]}
          rotation={[Math.PI / 10, 0, 0]}
          text={`move your\nmouse or\nfinger\naround\nin circles`}
          fontSize={0.9}
          textAlign="center"
          // maxWidth={Math.max(viewport.width / 2.5, 3.5)}
        />
      </Suspense>
      <animated.group renderOrder={2} scale={scale}>
        <mesh ref={ref}>
          <sphereGeometry args={[1.05, 32, 32]} />
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
            uCurveColor1={outerColor}
            uCurveColor2={innerColor}
            uNoiseScale={noiseScale}
            uNoiseSize={noiseSize}
            uNoiseSpeed={noiseSpeed}
          />
        </mesh>

        <Particles stage={stage} />
        <Wind stage={stage} />

        <animated.pointLight
          ref={lightRef}
          color={color}
          intensity={lightIntensity}
        />
      </animated.group>
    </>
  );
};

export default Rasengan;
