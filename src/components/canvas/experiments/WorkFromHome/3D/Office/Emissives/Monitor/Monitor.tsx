import { useRef } from "react";
import { OfficeModel } from "../../Office";
import { MonitorMaterial, MonitorMaterialProps } from "./shader";
import { BufferGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  model: OfficeModel;
};

export function Monitor({ model }: Props) {
  const ref = useRef<Mesh<BufferGeometry, MonitorMaterialProps>>();
  const { nodes } = model;

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime;
  });

  return (
    <>
      <mesh
        ref={ref}
        geometry={nodes.monitor_emissive.geometry}
        position={[0.34019, 1.12988, -0.91913]}
      >
        <MonitorMaterial uEntered={1} />
      </mesh>
    </>
  );
}
