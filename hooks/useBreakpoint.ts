// useBreakpoint.ts
import { useEffect, useState } from "react";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
};

type Breakpoint = keyof typeof BREAKPOINTS;

export function useBreakpoint(): Breakpoint {
  const getBp = () => {
    const w = window.innerWidth;
    if (w < BREAKPOINTS.sm) return "sm";
    if (w < BREAKPOINTS.md) return "md";
    return "lg";
  };

  const [bp, setBp] = useState<Breakpoint>("lg");

  useEffect(() => {
    const onResize = () => setBp(getBp());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return bp;
}
