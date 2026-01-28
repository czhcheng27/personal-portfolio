"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { techStackIcons } from "@/constants";
import { FadeInUp } from "@/components/common/MotionWrapper";
import SectionContainer from "../../components/layout/SectionContainer";

const TechIcon = dynamic(() => import("./TechIcon"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const Techs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".tech-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.5,
          scrollTrigger: {
            trigger: "#skills",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <SectionContainer ref={containerRef} id="skills">
      <h1 className="heading">
        A Selection of <span className="headingWords">Skills</span>
      </h1>

      <div className="tech-grid">
        {techStackIcons.map((techStackIcon, idx) => (
          <FadeInUp
            key={idx}
            className="relative tech-card overflow-hidden group rounded-lg"
          >
            <div className="tech-card-animated-bg" />
            <div className="tech-card-content">
              {/* 注入随机的动画时长，制造错开的浮动效果 */}
              <div
                className="tech-icon-wrapper animate-float"
                style={{
                  animationDuration: `${3 + (idx % 3)}s`, // 3s, 4s, 5s 循环
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <TechIcon model={techStackIcon} />
              </div>
              <div className="padding-x w-full">
                <p>{techStackIcon.name}</p>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </SectionContainer>
  );
};
export default Techs;
