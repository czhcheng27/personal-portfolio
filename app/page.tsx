"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "@/app/Hero";
import Projects from "@/app/Projects";
import LazyLoadSection from "@/components/base/LazyLoadSection";

// 懒加载非首屏组件，减少首屏负载
const Experience = dynamic(() => import("@/app/Experience"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
});

const TechStack = dynamic(() => import("@/app/Techs"), {
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
    <div className="relative">
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
