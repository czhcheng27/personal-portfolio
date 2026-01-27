"use client";

import { useEffect, useState } from "react";

/**
 * 检测是否小于指定断点
 * @param breakpoint - 断点宽度，默认 1280px (Tailwind 的 xl 断点)
 * @returns boolean - 当前屏幕宽度是否小于断点
 */
export const useIsBelowBreakpoint = (breakpoint: number = 1280): boolean => {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsBelow(window.innerWidth < breakpoint);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [breakpoint]);

  return isBelow;
};
