import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder, Text, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";

const ProductModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main bottle body */}
      <Cylinder args={[0.4, 0.4, 1.6, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#D4730F"
          metalness={0.1}
          roughness={0.1}
          transmission={0.8}
          thickness={0.2}
        />
      </Cylinder>

      {/* Bottle neck */}
      <Cylinder args={[0.15, 0.15, 0.3, 32]} position={[0, 0.95, 0]}>
        <meshPhysicalMaterial
          color="#D4730F"
          metalness={0.1}
          roughness={0.1}
          transmission={0.8}
          thickness={0.2}
        />
      </Cylinder>

      {/* Dropper cap */}
      <Cylinder args={[0.18, 0.18, 0.2, 32]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#1A1A1A" metalness={0.5} roughness={0.5} />
      </Cylinder>
      <Cylinder args={[0.12, 0.12, 0.1, 32]} position={[0, 1.35, 0]}>
        <meshStandardMaterial color="#1A1A1A" metalness={0.5} roughness={0.5} />
      </Cylinder>

      {/* Label */}
      <Box args={[0.75, 1.2, 0.01]} position={[0, 0.1, 0.41]}>
        <meshBasicMaterial color="#F5F5F5" />
      </Box>

      {/* Brand name */}
      <Text
        position={[0, 0.6, 0.42]}
        fontSize={0.1}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/HelveticaNeueMedium.otf" // Replace with actual path to Aesop's font
      >
        Aesop
      </Text>

      {/* Product name */}
      <Text
        position={[0, 0.4, 0.42]}
        fontSize={0.06}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        Lucent Facial Concentrate
      </Text>

      {/* Product description */}
      <Text
        position={[0, 0, 0.42]}
        fontSize={0.03}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.7}
        textAlign="center"
        font="/HelveticaNeueMedium.otf" // Replace with actual path to Aesop's font
      >
        Lightweight Vitamin C and B3-infused hydrating serum
      </Text>

      {/* Liquid inside the bottle */}
      <Sphere args={[0.38, 32, 32]} position={[0, -0.1, 0]}>
        <meshPhysicalMaterial
          color="#D4730F"
          metalness={0.1}
          roughness={0.1}
          transmission={0.8}
          thickness={0.2}
        />
      </Sphere>
    </group>
  );
};

export default ProductModel;
