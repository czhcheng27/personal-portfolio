"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { techStackIcons } from "@/constants";
import SectionContainer from "../../layout/SectionContainer";

// Dynamically import TechIcon with SSR disabled to prevent server-side rendering issues
// useGLTF cannot parse relative URLs during SSR/prerendering
const TechIcon = dynamic(() => import("./TechIcon"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-white-50 border-t-transparent animate-spin" />
    </div>
  ),
});

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type TechStackProps = object;

const Techs = ({}: TechStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the tech cards in the skills section
  useGSAP(
    () => {
      // Clear any existing inline styles first
      gsap.set(".tech-card", { clearProps: "all" });

      // This animation is triggered when the user scrolls to the #skills wrapper
      // The animation starts when the top of the wrapper is at the center of the screen
      // The animation is staggered, meaning each card will animate in sequence
      // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
      gsap.fromTo(
        ".tech-card",
        {
          // Initial values
          y: 50, // Move the cards down by 50px
          opacity: 0, // Set the opacity to 0
        },
        {
          // Final values
          y: 0, // Move the cards back to the top
          opacity: 1, // Set the opacity to 1
          duration: 1, // Duration of the animation
          ease: "power2.inOut", // Ease of the animation
          stagger: 0.2, // Stagger the animation by 0.2 seconds
          scrollTrigger: {
            trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
            start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
          },
        }
      );

      // Refresh ScrollTrigger after animation setup
      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <SectionContainer ref={containerRef} id="skills">
      <h1 className="heading">
        A Selection of <span className="headingWords">Skills</span>
      </h1>

      <div className="tech-grid">
        {techStackIcons.map((techStackIcon, idx) => (
          <div
            key={idx}
            className="relative card-border tech-card overflow-hidden group rounded-lg"
          >
            <div className="tech-card-animated-bg" />
            <div className="tech-card-content">
              <div className="tech-icon-wrapper">
                <TechIcon model={techStackIcon} />
              </div>
              <div className="padding-x w-full">
                <p>{techStackIcon.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Techs;
