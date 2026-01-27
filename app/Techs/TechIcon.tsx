"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Preload,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { TechIcon as TechIconType } from "@/constants";

interface TechIconProps {
  model: TechIconType;
}

const Model = ({ model }: TechIconProps) => {
  const { scene } = useGLTF(model.modelPath);

  // 稳定克隆并修复材质
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // 修复 Threejs 模型的特定颜色问题
        if (model.name === "Threejs" && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        } else if (child.material) {
          child.material = child.material.clone();
        }
      }
    });
    return clone;
  }, [scene, model.name]);

  return (
    <group scale={model.scale} rotation={model.rotation}>
      <primitive object={clonedScene} />
    </group>
  );
};

const TechIcon = ({ model }: TechIconProps) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "400px" } // 提前 400px 就开始加载渲染，保证用户看到时已经就绪
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        // 关键点：使用 demand 模式，模型加载完渲染一次后就静止，除非你操作它
        frameloop={isInView ? "demand" : "never"}
        dpr={[1, 2]} // 恢复高分辨率
        gl={{
          antialias: true, // 恢复抗锯齿
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          {/* 使用 Environment 提升质感，city 预设会自动被 Drei 缓存 */}
          <Environment preset="city" />

          <Model model={model} />

          <OrbitControls enableZoom={false} enablePan={false} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechIcon;
