import dynamic from "next/dynamic";
import LazyLoadSection from "@/components/LazyLoadSection";
import HeroSection from "@/components/section/Hero";
import Projects from "@/components/Projects";

// 懒加载非首屏组件，减少首屏负载
const Experience = dynamic(() => import("@/components/section/Experience"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
});

const TechStack = dynamic(() => import("@/components/TechStack"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  return (
    <div className="relative z-0 bg-primary pb-10 overflow-x-hidden">
      <HeroSection />
      <TechStack />
      <Projects />
      <Experience />
    </div>
  );
}
