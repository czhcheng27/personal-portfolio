"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

/**
 * GlowCard 组件参数接口
 */
interface GlowCardProps {
  /** 渲染的底层 HTML 标签或 React 组件 */
  as?: React.ElementType;
  /** 卡片的整体圆角大小，默认 '1.75rem' */
  borderRadius?: string;
  /** 流光露出的边距厚度 (px)，默认 2px */
  borderWidth?: number;
  /** 流光循环速度 (ms)，默认 10000ms */
  duration?: number;
  /** 流光主颜色 */
  glowColor?: string;
  /** 光源斑点尺寸 (px) */
  glowSize?: number;
  /** 光源透明度 (0-1) */
  glowOpacity?: number;
  /** 外部容器样式类名 */
  containerClassName?: string;
  /** 内部内容区样式类名 */
  contentClassName?: string;
  /** 光源本身的样式类名 (如需增加特殊滤镜可传) */
  glowClassName?: string;
  /** 内容子节点 */
  children?: React.ReactNode;
  /** 原生 HTML 属性 */
  [key: string]: unknown;
}

/**
 * 高级流光磨砂卡片 (锐利物理隔离版)
 *
 * 视觉原理：
 * 1. 物理隔离：通过 padding 预留出纯净的流光通道，确保边缘光不被毛玻璃滤镜干扰。
 * 2. 锐利光源：底部光源不带 blur 滤镜，确保透过 2px 缝隙时呈现激光般的锐度。
 * 3. 内部柔和：只有内容层带 backdrop-blur，这层“盖子”会模糊掉它遮盖下的部分光源。
 */
const GlowCard = ({
  as: Component = "div",
  borderRadius = "1.75rem",
  borderWidth = 2,
  duration = 10000,
  glowColor = "#CBACF9",
  glowSize = 120,
  glowOpacity = 0.9,
  containerClassName = "",
  contentClassName = "",
  glowClassName = "",
  children,
  ...props
}: GlowCardProps) => {
  const Tag = Component as React.ElementType<{ children?: React.ReactNode }>;

  return (
    <Tag
      className={`relative overflow-hidden group ${containerClassName}`}
      style={{
        borderRadius,
        padding: `${borderWidth}px`, // 确定的物理间隙
      }}
      {...props}
    >
      {/* 底层流光 - 负责产生极细且锐利的亮边 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius }}
      >
        <MovingBorder duration={duration} rx={borderRadius} ry={borderRadius}>
          <div
            className={glowClassName}
            style={{
              width: `${glowSize}px`,
              height: `${glowSize}px`,
              opacity: glowOpacity,
              // 强化核心亮度的渐变：中心 50% 保持高亮，边缘快速消退，保证 5px 缝隙内显示的是实线
              background: `radial-gradient(circle at center, ${glowColor} 0%, ${glowColor} 50%, transparent 100%)`,
            }}
          />
        </MovingBorder>
      </div>

      {/* 顶层内容 - 带毛玻璃效果，物理隔离在 padding 内部 */}
      <div
        className={`relative w-full h-full bg-slate-900/10 border border-white/10 backdrop-blur-xl text-white flex items-center justify-center antialiased ${contentClassName}`}
        style={{
          // 数学校正：内圆角 = 外圆角 - 间距。确保毛玻璃绝对不会重叠并模糊掉边缘光线。
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </Tag>
  );
};

export default GlowCard;

const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...props
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: unknown;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const updatePathLength = () => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    };
    updatePathLength();
    const observer = new ResizeObserver(updatePathLength);
    if (pathRef.current) observer.observe(pathRef.current);
    return () => observer.disconnect();
  }, [rx, ry]);

  useAnimationFrame((time) => {
    if (pathLength > 0) {
      const pxPerMillisecond = pathLength / duration;
      progress.set((time * pxPerMillisecond) % pathLength);
    }
  });

  const x = useTransform(progress, (val) => {
    // 防止在路径为空或未准备好时调用 getPointAtLength
    if (!pathRef.current || pathLength === 0) return 0;
    try {
      return pathRef.current.getPointAtLength(val).x;
    } catch {
      return 0;
    }
  });

  const y = useTransform(progress, (val) => {
    // 防止在路径为空或未准备好时调用 getPointAtLength
    if (!pathRef.current || pathLength === 0) return 0;
    try {
      return pathRef.current.getPointAtLength(val).y;
    } catch {
      return 0;
    }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full pointer-events-none"
        width="100%"
        height="100%"
        {...props}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
