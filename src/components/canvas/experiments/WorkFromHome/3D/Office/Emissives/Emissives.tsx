import { useExperimentStore } from "../../../store";
import { OfficeModel } from "../Office";
import { Ipads } from "./Ipads";
import { Monitor } from "./Monitor";
import { Socials } from "./Socials";

type Props = {
  model: OfficeModel;
};

export function Emissives({ model }: Props) {
  const { nodes } = model;

  return (
    <>
      <mesh
        geometry={nodes.phone_emissive.geometry}
        position={[0.01893, 0.78195, -0.80597]}
      >
        <meshBasicMaterial />
      </mesh>

      <mesh
        geometry={nodes.shelving_emissive.geometry}
        position={[-1.1215, 1.24219, -0.76169]}
      >
        <meshBasicMaterial />
      </mesh>
      <mesh
        geometry={nodes.lamp_emissives.geometry}
        position={[1.29823, 1.57727, -0.86724]}
      >
        <meshBasicMaterial />
      </mesh>
      <mesh
        geometry={nodes.wall_emissive.geometry}
        position={[0.00167, 0.03201, -0.39003]}
      >
        <meshBasicMaterial color={[1, 0.8, 0.8]} />
      </mesh>

      <mesh
        geometry={nodes.mac_pro_emissive.geometry}
        position={[0.87088, 0.30488, -0.54437]}
      >
        <meshBasicMaterial />
      </mesh>

      <Socials model={model} />
      <Ipads model={model} />
      <Monitor model={model} />
    </>
  );
}
