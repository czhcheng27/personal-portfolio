"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { TechIcon } from "@/constants";

interface TechIconProps {
  model: TechIcon;
}

// Separate component for the 3D model - must be inside Canvas
const Model = ({ model }: TechIconProps) => {
  const { scene } = useGLTF(model.modelPath);
  const groupRef = useRef<THREE.Group>(null);

  // Create a stable clone of the scene that won't change on re-renders
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    // Deep clone materials to avoid sharing issues
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material = Array.isArray(child.material)
          ? child.material.map((m) => m.clone())
          : child.material.clone();
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    if (model.name === "Threejs" && groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      });
    }
  }, [model.name, clonedScene]);

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group ref={groupRef} scale={model.scale} rotation={model.rotation}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
};

const TechIcon = ({ model }: TechIconProps) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "low-power",
        // Prevent context loss by limiting resources
        preserveDrawingBuffer: false,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
        />
        <Environment preset="city" />

        <Model model={model} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  );
};

export default TechIcon;
