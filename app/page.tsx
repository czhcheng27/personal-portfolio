import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar";
import LazyLoadSection from "@/components/LazyLoadSection";
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
    <div className="relative z-0 bg-primary pb-10">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <LazyLoadSection>
        <Experience />
      </LazyLoadSection>
      <LazyLoadSection>
        <TechStack />
      </LazyLoadSection>

      <Projects />
    </div>
  );
}
