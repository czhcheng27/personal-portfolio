import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

interface ComputersCanvasProps {}

const Computers = () => {
  // load from public folder via absolute path
  const computer = useGLTF("/desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={5} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={3} />
      <ambientLight intensity={0.3} />

      <directionalLight position={[-5, 1, 5]} intensity={2} castShadow />
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[-1, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = ({}: ComputersCanvasProps) => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
