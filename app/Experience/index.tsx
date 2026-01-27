"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { expCards } from "@/constants";
import SectionContainer from "@/components/layout/SectionContainer";
import GlowElement from "@/components/common/GlowElement";
import "./index.css";

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globalLineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 使用 rAF 确保在浏览器绘制下一帧前添加类名，避免布局突变
            window.requestAnimationFrame(() => {
              entry.target.classList.add("is-visible");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        // 增加底部余量，让动画在更靠近屏幕中心时才触发，避开滚动边缘
        rootMargin: "0px 0px -150px 0px",
      }
    );

    // 只对特定的动画元素进行监听
    const animatedElements = document.querySelectorAll(".obs-actor");
    animatedElements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (globalLineRef.current && cardsContainerRef.current) {
            const containerRect =
              cardsContainerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // 稍微推迟线条启动时机，避开第一、二个卡片的动画高峰
            const startTrigger = viewportHeight * 0.85;
            const dist = startTrigger - containerRect.top;
            const totalDist = containerRect.height;

            const progress = Math.min(Math.max(dist / totalDist, 0), 1);
            const percent = progress * 100;

            const mask = `linear-gradient(to bottom, 
                black 0%, 
                black ${Math.max(0, percent - 5)}%, 
                transparent ${percent}%)`;

            globalLineRef.current.style.webkitMaskImage = mask;
            globalLineRef.current.style.maskImage = mask;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <SectionContainer
      ref={containerRef}
      id="experience"
      className="overflow-x-hidden"
    >
      <h1 className="heading">
        My <span className="headingWords">work experience</span>
      </h1>

      <div className="mt-12 lg:mt-32 relative">
        <div className="obs-actor fade-only absolute top-0 left-5 md:left-10 xl:left-1/2  h-full flex justify-center z-0">
          {/* 静态背景暗线 */}
          <div className="w-1 h-full bg-primary/20" />

          {/* 动态渐变进度线 */}
          <div
            ref={globalLineRef}
            className="gradient-line w-1 h-full absolute top-0"
          />
        </div>

        {/* 这里的 space-y 加大，给动画留出足够的视觉和计算空间 */}
        <div
          ref={cardsContainerRef}
          className="relative z-10 xl:space-y-40 space-y-20"
        >
          {expCards.map((card, idx) => (
            <div
              key={idx}
              className="relative flex flex-col xl:flex-row items-start justify-between min-h-75"
            >
              {/* 左侧卡片 */}
              <div className="hidden xl:block xl:w-[40%] obs-actor slide-from-left">
                <GlowElement>
                  <div className="rounded-xl p-10 bg-black-100 border border-black-50 shadow-card">
                    <div className="mb-5 space-y-1">
                      {[
                        card.review1,
                        card.review2,
                        card.review3,
                        card.review4,
                      ].map(
                        (text, i) =>
                          text && (
                            <p key={i} className="text-white-50 text-lg">
                              {text}
                            </p>
                          )
                      )}
                    </div>
                    <Image
                      src={card.imgPath}
                      alt={card.title}
                      width={300}
                      height={27}
                    />
                  </div>
                </GlowElement>
              </div>

              {/* 右侧区域 */}
              <div className="xl:w-[calc(50%+38px)] w-full">
                <div className="flex items-start xl:gap-20 md:gap-10 gap-5 relative z-22">
                  {/* 中间 Logo：原地渐现 */}
                  <div
                    className="md:size-20 size-10 flex-none rounded-full flex justify-center items-center md:-translate-y-7 border border-black-50 bg-black-100 z-30 relative"
                    style={{ "--logo-border": card.borderColor } as any}
                  >
                    <Image
                      src={card.logoPath}
                      alt="logo"
                      width={50}
                      height={50}
                    />
                  </div>

                  {/* 右侧文字：滑入 */}
                  <div className="obs-actor slide-from-right">
                    <h1 className="font-semibold text-3xl text-white">
                      {card.title}
                    </h1>
                    <p className="my-5 text-white-50">🗓️&nbsp;{card.date}</p>
                    <p className="text-blue-50 italic">Key Achievements</p>
                    <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                      {card.responsibilities.map((res, i) => (
                        <li key={i} className="text-lg leading-relaxed">
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Experience;
