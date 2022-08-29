import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import albedoImg from "../img/floor/albedo.jpeg";
import normalImg from "../img/floor/normal.jpeg";
// import roughnessImg from "../img/floor/roughness.jpeg";
import aoImg from "../img/floor/ao.jpeg";
import { RepeatWrapping } from "three";

const Floor = () => {
  const [albedo, normal, ao] = useTexture(
    [albedoImg.src, normalImg.src, aoImg.src],
    (textures) => {
      textures.forEach((tex) => {
        tex.wrapS = RepeatWrapping;
        tex.wrapT = RepeatWrapping;
        tex.repeat.set(6, 6);
        tex.needsUpdate = true;
      });
    }
  );

  return (
    <mesh
      rotation={[-Math.PI / 2.0, 0, 0]}
      position={[0, -1.5, 0]}
      renderOrder={1}
    >
      <planeGeometry args={[50, 50]} />
      <meshToonMaterial
        transparent={true}
        map={albedo}
        normalMap={normal}
        aoMap={ao}
      />
    </mesh>
  );
};

export default Floor;
