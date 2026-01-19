"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { techStackIcons } from "@/constants";
import TechIcon from "./TechIcon";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TechStackProps {}

const TechStack = ({}: TechStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the tech cards in the skills section
  useGSAP(
    () => {
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
        },
      );
    },
    { scope: containerRef },
  );

  // Refresh ScrollTrigger after the Canvas components are mounted
  // This fixes the issue where icons don't show on large screens (>1280px) after refresh
  useEffect(() => {
    // Give Three.js Canvas time to fully initialize
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      id="skills"
      className="mx-auto max-w-8xl flex-center section-padding"
    >
      <div className="w-full h-full px-5">
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
      </div>
    </div>
  );
};

export default TechStack;
