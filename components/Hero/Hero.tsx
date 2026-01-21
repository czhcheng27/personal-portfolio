"use client";

import dynamic from "next/dynamic";
import TextReveal from "../TextReveal/TextReveal";
import styles from "./Hero.module.css";

// Dynamically import Computer with SSR disabled to prevent server-side rendering issues
// useGLTF cannot parse relative URLs during SSR/prerendering
const Computer = dynamic(() => import("../Computer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="canvas-loader"></span>
    </div>
  ),
});

interface HeroProps { }

const Hero = ({ }: HeroProps) => {
  return (
    <section className={`relative w-full h-200 md:h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-30 max-w-7xl mx-auto paddingX flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <TextReveal
            className="heroHeadText text-white"
            staggerDelayMs={60}
            durationMs={450}
            initialDelayMs={100}
          >
            Hi, I'm <span className="text-[#915EFF]">Zihang</span>
          </TextReveal>
          <div className={`heroSubText mt-2 text-white-100`}>
            <TextReveal
              staggerDelayMs={40}
              durationMs={400}
              initialDelayMs={400}
            >
              I develop scalable, high-performance web applications with
              modular, maintainable frontend architectures.
            </TextReveal>
          </div>
        </div>
      </div>

      <div
        className={`h-2/5 md:h-1/2 lg:[@media_(max-height:820px)]:h-full lg:h-1/2 xl:h-full
        top-1/4 md:top-1/8 lg:[@media_(max-height:820px)]:top-auto lg:top-1/12 xl:top-auto 
        md:bottom-0
        absolute w-full`}
      >
        <Computer />
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-9 h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            {/* Use CSS animation instead of framer-motion for the bouncing dot */}
            <div className={`w-3 h-3 rounded-full bg-secondary mb-1 ${styles.bounce}`} />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
