import { shaderMaterial } from "@react-three/drei";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { Color, ShaderMaterial, Texture } from "three";
import { MaterialNode, extend } from "@react-three/fiber";
import { animated } from "@react-spring/three";

type Uniforms = {
  uMap: Texture;
  uLightMap: Texture;
  uLightMap2: Texture;
  uTableColor: Color;
  uMacColor: Color;
  uEmailIntensity: number;
  uInstaIntensity: number;
  uLinkedinIntensity: number;
  uGithubIntensity: number;
  uMacIntensity: number;
  uTableIntensity: number;
};

const uniforms: Uniforms = {
  uMap: undefined,
  uLightMap: undefined,
  uLightMap2: undefined,
  uTableColor: new Color(1, 1, 1),
  uMacColor: new Color(1, 1, 1),
  uEmailIntensity: 1.0,
  uInstaIntensity: 1.0,
  uLinkedinIntensity: 1.0,
  uGithubIntensity: 1.0,
  uMacIntensity: 1.0,
  uTableIntensity: 1.0,
};

export type OfficeMaterialProps = ShaderMaterial & Uniforms;

const BaseOfficeMaterial = shaderMaterial(
  uniforms,
  vertexShader,
  fragmentShader,
  (m) => {
    m.toneMapped = true;
    m.transparent = true;
  }
);

extend({ BaseOfficeMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseOfficeMaterial: MaterialNode<
      OfficeMaterialProps,
      typeof BaseOfficeMaterial
    >;
  }
}

export const OfficeMaterial = animated("baseOfficeMaterial");
