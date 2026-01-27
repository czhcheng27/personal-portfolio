"use client";

import { ComponentProps } from "react";
import { motion, Variants } from "framer-motion";
import { useViewportAmount } from "@/hooks/useViewportAmount";

// ========== 预设动画变体 ==========
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

// ========== 预设组件 ==========

// 淡入上移动画容器（单独使用）
export const FadeInUp = ({
  children,
  delay = 0,
  duration = 0.6,
  amount,
  ...props
}: ComponentProps<typeof motion.div> & {
  delay?: number;
  duration?: number;
  amount?: number;
}) => {
  const viewportAmount = useViewportAmount(amount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 错落动画容器（父容器）
export const StaggerContainer = ({
  children,
  staggerDelay = 0.2,
  ...props
}: ComponentProps<typeof motion.div> & { staggerDelay?: number }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 错落动画子项（响应式版本）
// - 移动端：每个子项独立检测视口，滚动到哪个就触发哪个（amount: 0.1）
// - PC 端：保持错落效果，通过 index 延迟实现（amount: 0.3）
export const StaggerItem = ({
  children,
  animateIndex = 0,
  amount,
  delay = 0.2,
  duration = 0.8,
  disableStaggerBelow = "lg", // 默认在 lg 以下禁用错落效果
  ...props
}: ComponentProps<typeof motion.div> & {
  animateIndex?: number;
  amount?: number;
  duration?: number;
  delay?: number;
  disableStaggerBelow?: "sm" | "md" | "lg" | "xl" | "2xl" | false | true; // 在指定断点以下禁用错落
}) => {
  const viewportAmount = useViewportAmount(amount);

  // 根据 disableStaggerBelow 判断是否应用 animateIndex delay
  const getDelay = () => {
    if (disableStaggerBelow === true) {
      return 0; // 始终禁用错落
    }

    if (disableStaggerBelow === false) {
      return animateIndex * delay; // 始终应用错落
    }

    if (typeof window === "undefined") {
      return animateIndex * delay; // SSR 默认应用
    }

    const breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    };

    const threshold = breakpoints[disableStaggerBelow];
    const isAboveBreakpoint = window.innerWidth >= threshold;

    return isAboveBreakpoint ? animateIndex * delay : 0; // 小屏不错落
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: viewportAmount, // 移动端 0.1，PC 端 0.3（可被 props 覆盖）
      }}
      transition={{
        duration: duration,
        delay: getDelay(),
        ease: [0.4, 0, 0.2, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 纯粹的错落子项（仅由父容器控制，不独立检测视口）
// 适用于确保所有子项在容器可见时同时在视口内的场景
export const StaggerChild = ({
  children,
  ...props
}: ComponentProps<typeof motion.div>) => (
  <motion.div variants={fadeInUp} {...props}>
    {children}
  </motion.div>
);

// ========== 通用灵活组件（保留给高级用法） ==========
export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionP = motion.p;
export const MotionButton = motion.button;

// 导出常用的动画变体供手动使用
export { fadeInUp as fadeInUpVariants };
