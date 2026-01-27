"use client";

import { useEffect, useState } from "react";

// 定义标准断点宽度
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * 通用网格列数获取 Hook
 * @param config - 映射表，例如 { base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }
 */
export const useGridColumns = (
  config: { base: number } & Partial<Record<BreakpointKey, number>>
) => {
  const [columns, setColumns] = useState(config.base);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // 按照断点从大到小排序检查
      if (config["2xl"] && width >= BREAKPOINTS["2xl"]) {
        setColumns(config["2xl"]);
      } else if (config.xl && width >= BREAKPOINTS.xl) {
        setColumns(config.xl);
      } else if (config.lg && width >= BREAKPOINTS.lg) {
        setColumns(config.lg);
      } else if (config.md && width >= BREAKPOINTS.md) {
        setColumns(config.md);
      } else if (config.sm && width >= BREAKPOINTS.sm) {
        setColumns(config.sm);
      } else {
        setColumns(config.base);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [config]);

  return columns;
};
