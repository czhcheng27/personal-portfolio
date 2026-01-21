"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "@/constants";
import GlowCard from "./GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef<HTMLElement>(null);
  const globalLineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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

      // 3. 全局时间线淡入动画
      gsap.from(".global-timeline-container", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".global-timeline-container",
          start: "top 90%", // 当线容器顶部到达 90% 处开始淡入
        },
      });
    },
    { scope: containerRef }
  );

  // 终极方案：原生 JS 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      if (!globalLineRef.current || !cardsContainerRef.current) return;

      const containerRect = cardsContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const startTrigger = viewportHeight * 0.90;
      const dist = startTrigger - containerRect.top;
      const totalDist = containerRect.height;

      const progress = Math.max(0, Math.min(1, dist / totalDist));

      const percent = progress * 100;
      const mask = `linear-gradient(to bottom, black 0%, black ${percent - 5}%, transparent ${percent}%)`;
      globalLineRef.current.style.maskImage = mask;
      globalLineRef.current.style.webkitMaskImage = mask;
    };

    // 监听滚动
    window.addEventListener("scroll", handleScroll);
    // 初始化调用一次
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="mx-auto max-w-8xl flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full px-5">
        <div className="mt-32 relative">
          {/* 全局连续时间线 */}
          <div className="global-timeline-container absolute top-0 xl:left-1/2 md:left-10 left-5 h-full flex justify-center z-0">
            {/* 背景暗线 */}
            <div className="w-1 h-full bg-primary" />

            {/* 彩管渐变线 - 覆盖在上面 */}
            <div
              ref={globalLineRef}
              className="gradient-line w-1 h-full absolute top-0 left-0"
              style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 0%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 0%)" }}
            />
          </div>

          <div
            ref={cardsContainerRef}
            className="relative z-10 xl:space-y-32 space-y-10"
          >
            {expCards.map((card, idx) => (
              <div
                key={idx}
                className="exp-card-wrapper"
              >
                <div className="hidden xl:block xl:w-2/5 timeline-card">
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
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-22">
                      <div
                        className="timeline-logo md:border-(--logo-border)"
                        style={{ "--logo-border": card.borderColor } as React.CSSProperties}
                      >
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
