import { useExperimentStore } from "../../../store";
import { OfficeModel } from "../Office";

type Props = {
  model: OfficeModel;
};

export function Socials({ model }: Props) {
  const { nodes } = model;

  return (
    <>
      <mesh
        geometry={nodes.email_emissive.geometry}
        position={[-1.54201, 1.74999, -0.82321]}
        onPointerEnter={() =>
          useExperimentStore.setState({ emailHovered: true })
        }
        onPointerLeave={() =>
          useExperimentStore.setState({ emailHovered: false })
        }
      >
        <meshBasicMaterial />
      </mesh>

      <mesh
        geometry={nodes.insta_emissive.geometry}
        position={[-1.2595, 1.74999, -0.82434]}
        onPointerEnter={() =>
          useExperimentStore.setState({ instaHovered: true })
        }
        onPointerLeave={() =>
          useExperimentStore.setState({ instaHovered: false })
        }
      >
        <meshBasicMaterial />
      </mesh>

      <mesh
        geometry={nodes.linkedin_emissive.geometry}
        position={[-0.9821, 1.74999, -0.82434]}
        onPointerEnter={() =>
          useExperimentStore.setState({ linkedinHovered: true })
        }
        onPointerLeave={() =>
          useExperimentStore.setState({ linkedinHovered: false })
        }
      >
        <meshBasicMaterial />
      </mesh>

      <mesh
        geometry={nodes.github_emissive.geometry}
        position={[-0.70014, 1.74999, -0.82434]}
        onPointerEnter={() =>
          useExperimentStore.setState({ githubHovered: true })
        }
        onPointerLeave={() =>
          useExperimentStore.setState({ githubHovered: false })
        }
      >
        <meshBasicMaterial />
      </mesh>
    </>
  );
}
