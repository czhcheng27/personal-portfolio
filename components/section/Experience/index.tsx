
"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { expCards } from "@/constants";
import SectionContainer from "@/components/SectionContainer";
import GlowElement from "@/components/ui/GlowElement";
import './index.css'; 

const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const globalLineRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      // 1. 入场观察者 (处理卡片、文字、Logo 的渐现)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
      );
  
      const animatedElements = document.querySelectorAll(".obs-actor");
      animatedElements.forEach((el) => observer.observe(el));
  
      // 2. 优化后的进度线滚动逻辑
      const handleScroll = () => {
        if (!globalLineRef.current || !cardsContainerRef.current) return;
        
        const containerRect = cardsContainerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
  
        // 【时机修复】：设置触发点为视口高度的 95% (几乎一露头就动)
        const startTrigger = viewportHeight * 0.95;
        
        // 计算相对于容器顶部的滚动距离
        const dist = startTrigger - containerRect.top;
        const totalDist = containerRect.height;
        
        // 进度百分比
        const progress = Math.max(0, Math.min(1, dist / totalDist));
        const percent = progress * 100;
  
        /**
         * 【流星尾巴修复】：
         * 我们不直接在 percent 处截断，而是：
         * 0% -> percent-5%: 纯黑 (显示)
         * percent-5% -> percent: 渐变到透明 (流星尾巴)
         * percent -> 100%: 全透明 (隐藏)
         */
        const mask = `linear-gradient(to bottom, 
          black 0%, 
          black ${Math.max(0, percent - 8)}%, 
          transparent ${percent}%)`;
  
        globalLineRef.current.style.webkitMaskImage = mask;
        globalLineRef.current.style.maskImage = mask;
      };
  
      // 使用 scroll 监听，配合 passive 提升性能
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // 初始化位置
  
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return (
      <SectionContainer ref={containerRef} id="experience">
        <h1 className="heading">
          My <span className="headingWords">work experience</span>
        </h1>
  
        <div className="mt-12 lg:mt-32 relative">
          {/* 中间进度线容器 */}
          <div className="obs-actor fade-only absolute top-0 xl:left-1/2 md:left-10 left-5 h-full flex justify-center z-0">
            {/* 静态背景暗线 */}
            <div className="w-1 h-full bg-primary" />
            
            {/* 动态渐变进度线 */}
            <div 
              ref={globalLineRef} 
              className="gradient-line w-1 h-full absolute top-0" 
            />
          </div>
  
          <div ref={cardsContainerRef} className="relative z-10 xl:space-y-32 space-y-10">
            {expCards.map((card, idx) => (
              <div key={idx} className="flex flex-col xl:flex-row items-start justify-between">
                
                {/* 左侧卡片：滑入 */}
                <div className="hidden xl:block xl:w-2/5 obs-actor slide-from-left">
                  <GlowElement>
                    <div className="rounded-xl p-10 bg-black-100 border border-black-50 shadow-card">
                      <div className="mb-5 space-y-1">
                        {[card.review1, card.review2, card.review3, card.review4].map((text, i) => (
                          text && <p key={i} className="text-white-50 text-lg">{text}</p>
                        ))}
                      </div>
                      <Image src={card.imgPath} alt={card.title} width={300} height={27} />
                    </div>
                  </GlowElement>
                </div>
  
                {/* 右侧区域：Logo 和 文字 */}
                <div className="xl:w-[calc(50%+40px)] w-full">
                  <div className="flex items-start xl:gap-20 md:gap-10 gap-5 relative z-22">
                    
                    {/* 中间 Logo：原地渐现 */}
                    <div
                      className="md:size-20 size-10 flex-none rounded-full flex justify-center items-center md:-translate-y-7 border border-black-50 bg-black-100 z-30 relative"
                      style={{ "--logo-border": card.borderColor } as any}
                    >
                      <Image src={card.logoPath} alt="logo" width={50} height={50} />
                    </div>
                    
                    {/* 右侧文字：滑入 */}
                    <div className="obs-actor slide-from-right">
                      <h1 className="font-semibold text-3xl text-white">{card.title}</h1>
                      <p className="my-5 text-white-50">🗓️&nbsp;{card.date}</p>
                      <p className="text-blue-50 italic">Key Achievements</p>
                      <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                        {card.responsibilities.map((res, i) => (
                          <li key={i} className="text-lg">{res}</li>
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