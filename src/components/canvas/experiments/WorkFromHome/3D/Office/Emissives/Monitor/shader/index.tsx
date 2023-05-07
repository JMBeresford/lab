import { shaderMaterial } from "@react-three/drei";
import { Color, ShaderMaterial } from "three";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { MaterialNode, extend } from "@react-three/fiber";
import { animated } from "@react-spring/three";

type Uniforms = {
  uTime?: number;
  uEntered?: number;
};

const uniforms: Uniforms = {
  uTime: 0,
  uEntered: 0,
};

export type MonitorMaterialProps = ShaderMaterial & Uniforms;

const BaseMonitorMaterial = shaderMaterial(
  uniforms,
  vertexShader,
  fragmentShader,
  (m) => {
    m.transparent = true;
  }
);

extend({ BaseMonitorMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseMonitorMaterial: MaterialNode<
      MonitorMaterialProps,
      typeof BaseMonitorMaterial
    >;
  }
}

export const MonitorMaterial = (props: Uniforms) => (
  // @ts-ignore
  <baseMonitorMaterial {...props} />
);
