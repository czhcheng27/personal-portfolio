"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "@/constants";
import GlowCard from "./GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Loop through each timeline card and animate them in
      // as the user scrolls to each card
      gsap.utils.toArray(".timeline-card").forEach((card) => {
        // Animate the card coming in from the left
        // and fade in
        gsap.from(card as gsap.TweenTarget, {
          // Move the card in from the left
          xPercent: -100,
          // Make the card invisible at the start
          opacity: 0,
          // Set the origin of the animation to the left side of the card
          transformOrigin: "left left",
          // Animate over 1 second
          duration: 1,
          // Use a power2 ease-in-out curve
          ease: "power2.inOut",
          // 当卡片滚动到视口接近底部时触发动画
          scrollTrigger: {
            // 触发元素：当前卡片
            trigger: card as gsap.DOMTarget,
            // 动画触发位置：当触发元素的顶部到达视口高度的 90%（从顶部算起，即靠近底部）时开始
            start: "top 90%",
          },
        });
      });

      // 彩色渐变线渐渐淡入出现（跟 expText 一样的效果）
      gsap.from(".gradient-line", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".gradient-line",
          start: "top 90%",
        },
      });

      // 使用 GSAP matchMedia 处理响应式断点
      ScrollTrigger.matchMedia({
        // 移动端 (< 768px)
        "(max-width: 767px)": function () {
          gsap.to(".timeline", {
            transformOrigin: "bottom bottom",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".timeline",
              start: "top 70%", // 移动端：到达视口中部时开始
              end: "70% 40%",
              onUpdate: (self) => {
                gsap.to(".timeline", {
                  scaleY: 1 - self.progress,
                });
              },
            },
          });
        },
        // 桌面端 (>= 768px)
        "(min-width: 768px)": function () {
          gsap.to(".timeline", {
            transformOrigin: "bottom bottom",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".timeline",
              start: "top 90%", // 桌面端：到达视口底部 10% 时开始
              end: "70% 50%",
              onUpdate: (self) => {
                gsap.to(".timeline", {
                  scaleY: 1 - self.progress,
                });
              },
            },
          });
        },
      });

      // Loop through each expText element and animate them in
      // as the user scrolls to each text element
      gsap.utils.toArray(".expText").forEach((text) => {
        // Animate the text opacity from 0 to 1
        // and move it from the left to its final position
        // over 1 second with a power2 ease-in-out curve
        gsap.from(text as gsap.TweenTarget, {
          // Set the opacity of the text to 0
          opacity: 0,
          // Move the text from the left to its final position
          // (xPercent: 0 means the text is at its final position)
          xPercent: 0,
          // Animate over 1 second
          duration: 1,
          // Use a power2 ease-in-out curve
          ease: "power2.inOut",
          // Trigger the animation when the text is 60% down the screen
          scrollTrigger: {
            // The text is the trigger element
            trigger: text as gsap.DOMTarget,
            // Trigger the animation when the text is 60% down the screen
            start: "top 90%",
          },
        });
      }, "<"); // position parameter - insert at the start of the animation
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="mx-auto max-w-8xl flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full px-5">
        <div className="mt-32 relative">
          <div className="relative z-10 xl:space-y-32 space-y-10">
            {expCards.map((card, idx) => (
              <div key={idx} className="exp-card-wrapper">
                <div className="hidden xl:block xl:w-2/5">
                  <GlowCard card={card}>
                    <Image
                      src={card.imgPath}
                      alt={card.title}
                      width={300}
                      height={27}
                    />
                  </GlowCard>
                </div>

                <div className="xl:w-[calc(50%+40px)]">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-22">
                      <div className="timeline-logo">
                        <Image src={card.logoPath} alt="logo" width={50} height={50} />
                      </div>
                      <div>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        <p className="my-5 text-white-50">
                          🗓️&nbsp;{card.date}
                        </p>
                        <p className="text-[#839CB5] italic">
                        Key Achievements
                        </p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <li key={index} className="text-lg">
                                {responsibility}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
