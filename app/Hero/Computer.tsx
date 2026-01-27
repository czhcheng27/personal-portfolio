import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../../components/base/Loader";

interface ComputersCanvasProps {}

const Computers = () => {
  // load from public folder via absolute path
  const computer = useGLTF("/desktop_pc/scene.gltf");
  const meshRef = useRef<THREE.Group>(null);

  // --- 可配置的动画参数（以度/秒为输入，更直观） ---
  // 水平旋转设定（度，周期秒）
  const ROT_DEG = 3; // 旋转幅度：3 度
  // 将角速度设为 0.5 (rad/s)
  // 对应周期 T = 2π / 0.5 ≈ 12.566s
  const ROT_PERIOD = 12.566; // 周期：约 12.57 秒 (匹配之前的慢频率)
  const ROT_AMP = (Math.PI / 180) * ROT_DEG; // 转为弧度
  const ROT_OMEGA = (2 * Math.PI) / ROT_PERIOD; // 角速度

  // 垂直浮动设定（单位为场景坐标，周期秒）
  const VERT_AMP = 0.03; // y 方向振幅
  // 将角速度设为 0.8 (rad/s)
  // 对应周期 T = 2π / 0.8 ≈ 7.854s
  const VERT_PERIOD = 7.854; // 周期：约 7.85 秒 (匹配之前的慢频率)
  const VERT_OMEGA = (2 * Math.PI) / VERT_PERIOD;

  // useFrame: 使用可配置参数创建平滑的左右摆动 + 轻微上下浮动
  // useFrame((state) => {
  //   if (meshRef.current) {
  //     const t = state.clock.elapsedTime;
  //     // 在原有偏移基础上应用小幅正弦摆动
  //     meshRef.current.rotation.y = -0.2 + Math.sin(t * ROT_OMEGA) * ROT_AMP;
  //     meshRef.current.position.y = -3.25 + Math.sin(t * VERT_OMEGA) * VERT_AMP;
  //   }
  // });

  return (
    // <group ref={meshRef}>
    //   {/* <hemisphereLight intensity={5} groundColor="black" />
    //   <spotLight
    //     position={[-20, 50, 10]}
    //     angle={0.12}
    //     penumbra={1}
    //     intensity={5}
    //     castShadow
    //     shadow-mapSize={1024}
    //   />
    //   <pointLight intensity={3} /> */}
    //   <ambientLight intensity={1.5} />
    //   <directionalLight position={[10, 15, -5]} intensity={2} castShadow />

    //   <primitive
    //     object={computer.scene}
    //     scale={1.1}
    //     position={[-1, 1.5, -1.75]}
    //     rotation={[-0.01, 0, -0.1]}
    //   />
    // </group>
    <group
      ref={meshRef}
      rotation={[0, -0.2, 0]} // 这里补偿 rotation.y = -0.2
      position={[0, -3.25, 0]} // 这里补偿 position.y = -3.25
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 15, -5]} intensity={2} />

      <primitive
        object={computer.scene}
        scale={1.1}
        // 这里的坐标是相对于 group 的
        position={[-1, 1.5, -1.75]}
        rotation={[-0.01, 0, -0.1]}
      />
    </group>
  );
};

const ComputersCanvas = ({}: ComputersCanvasProps) => {
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当 Canvas 进入视口时 entry.isIntersecting 为 true
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "200px", // 提前 200px 开始加载/渲染，防止用户滚动太快看到空白
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full hero-3d-container">
      <Canvas
        frameloop={isInView ? "demand" : "never"}
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          {isInView && <Computers />}
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
