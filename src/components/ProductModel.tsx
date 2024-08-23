import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface ProductModelProps {
  onClick: () => void;
}

function ProductModel({ onClick }: ProductModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Bottle body */}
      <Cylinder args={[0.5, 0.5, 2, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B7E74" metalness={0.4} roughness={0.2} />
      </Cylinder>

      {/* Bottle neck */}
      <Cylinder args={[0.2, 0.3, 0.5, 32]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#8B7E74" metalness={0.4} roughness={0.2} />
      </Cylinder>

      {/* Bottle cap */}
      <Cylinder args={[0.25, 0.25, 0.2, 32]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color="#413F3D" metalness={0.6} roughness={0.1} />
      </Cylinder>

      {/* Pump top */}
      <Sphere args={[0.15, 16, 16]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#413F3D" metalness={0.6} roughness={0.1} />
      </Sphere>
    </group>
  );
}

export default ProductModel;
