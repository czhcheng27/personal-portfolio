"use client";

import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import LazyLoadSection from "@/components/base/LazyLoadSection";
import Hero from "@/components/section/Hero";
import Projects from "@/components/section/Projects";
import { useEffect } from "react";

// 懒加载非首屏组件，减少首屏负载
const Experience = dynamic(() => import("@/components/section/Experience"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
});

const TechStack = dynamic(() => import("@/components/section/Techs"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);
  return (
    <div className="relative z-0 bg-primary">
      <Hero />
      {/* <LazyLoadSection>
        <Experience />
      </LazyLoadSection>
      <LazyLoadSection>
        <TechStack />
      </LazyLoadSection> */}

      <Projects />
      <Experience />
      <TechStack />
    </div>
  );
}
