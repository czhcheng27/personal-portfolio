import { useIsBelowBreakpoint } from "./useIsBelowBreakpoint";

/**
 * Return a viewport.amount value with a sensible responsive default.
 * - If `amount` is provided, return it.
 * - Otherwise return `0.1` on mobile and `0.3` on desktop.
 */
export const useViewportAmount = (amount?: number) => {
  const isMobile = useIsBelowBreakpoint(768);
  return amount ?? (isMobile ? 0.1 : 0.15);
};

export default useViewportAmount;
