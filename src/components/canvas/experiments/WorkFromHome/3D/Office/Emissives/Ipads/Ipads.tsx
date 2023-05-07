import { useRef } from "react";
import { useExperimentStore } from "../../../../store";
import { OfficeModel } from "../../Office";
import { IpadMaterial, IpadMaterialProps } from "./shader";
import { BufferGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  model: OfficeModel;
};

export function Ipads({ model }: Props) {
  const ref1 = useRef<Mesh<BufferGeometry, IpadMaterialProps>>();
  const ref2 = useRef<Mesh<BufferGeometry, IpadMaterialProps>>();
  const ref3 = useRef<Mesh<BufferGeometry, IpadMaterialProps>>();
  const { nodes } = model;

  useFrame(({ clock }) => {
    ref1.current.material.uTime = clock.elapsedTime;
    ref2.current.material.uTime = clock.elapsedTime + 1130;
    ref3.current.material.uTime = clock.elapsedTime + 2500;
  });

  return (
    <>
      <mesh
        ref={ref1}
        geometry={nodes.ipad_emissive001.geometry}
        position={[-1.33282, 1.3842, -0.76811]}
        onClick={() => useExperimentStore.setState({ view: "about" })}
        onPointerEnter={() =>
          useExperimentStore.setState({ ipadTopHovered: true })
        }
        onPointerLeave={() =>
          useExperimentStore.setState({ ipadTopHovered: false })
        }
      >
        <IpadMaterial uColor={[1.0, 0.5098, 0.4745]} />
      </mesh>

      <mesh
        ref={ref2}
        geometry={nodes.ipad_emissive002.geometry}
        position={[-0.91018, 0.9881, -0.76811]}
        onClick={() => useExperimentStore.setState({ view: "works" })}
        onPointerEnter={() =>
          useExperimentStore.setState({ ipadMiddleHovered: true })
        }
        onPointerLeave={() =>
          useExperimentStore.setState({ ipadMiddleHovered: false })
        }
      >
        <IpadMaterial uColor={[0.4745, 0.7451, 1.0]} />
      </mesh>

      <mesh
        ref={ref3}
        geometry={nodes.ipad_emissive003.geometry}
        position={[-1.34343, 0.61977, -0.76811]}
        onClick={() => useExperimentStore.setState({ view: "lab" })}
        onPointerEnter={() =>
          useExperimentStore.setState({ ipadBottomHovered: true })
        }
        onPointerLeave={() =>
          useExperimentStore.setState({ ipadBottomHovered: false })
        }
      >
        <IpadMaterial uColor={[0.6706, 0.4196, 1.0]} />
      </mesh>
    </>
  );
}
