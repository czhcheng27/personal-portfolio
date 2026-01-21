"use client";

import { ReactNode, Children, isValidElement, useMemo, useId, memo } from "react";
import styles from "./TextReveal.module.css";

interface TextRevealProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  /** Delay between each word animation in milliseconds */
  staggerDelayMs?: number;
  /** Duration of each word animation in milliseconds */
  durationMs?: number;
  /** Initial delay before animation starts in milliseconds */
  initialDelayMs?: number;
}

/**
 * High-performance text reveal animation using pure CSS animations
 * - Uses GPU-accelerated CSS transforms only
 * - No JavaScript animation overhead during runtime
 * - Uses useId to generate stable keys that prevent animation restart on re-render
 */
const TextReveal = memo(function TextReveal({
  text,
  children,
  className = "",
  staggerDelayMs = 80,
  durationMs = 500,
  initialDelayMs = 0,
}: TextRevealProps) {
  // Use React's useId for stable, unique IDs that persist across re-renders
  const baseId = useId();

  // Process text into animated word spans - memoized to prevent re-processing
  const words = useMemo(() => {
    const result: ReactNode[] = [];
    let count = 0;

    const processNode = (node: ReactNode, extraClass: string = "") => {
      Children.forEach(node, (child) => {
        if (typeof child === "string" || typeof child === "number") {
          const str = String(child);
          str.split(" ").forEach((word) => {
            if (word.trim() === "") return;

            const delay = initialDelayMs + count * staggerDelayMs;
            const wordIndex = count;
            count++;

            result.push(
              <span
                key={`${baseId}-word-${wordIndex}`}
                className={`${styles.word} ${extraClass}`}
                style={{
                  animationDelay: `${delay}ms`,
                  animationDuration: `${durationMs}ms`,
                }}
              >
                {word}
              </span>
            );
          });
        } else if (isValidElement(child)) {
          const childProps = child.props as {
            className?: string;
            children?: ReactNode;
          };
          const childClass = childProps.className || "";
          const newClass = extraClass
            ? `${extraClass} ${childClass}`
            : childClass;

          if (childProps.children) {
            processNode(childProps.children, newClass);
          }
        }
      });
    };

    if (text) {
      processNode(text);
    } else if (children) {
      processNode(children);
    }

    return result;
    // Note: baseId is stable across re-renders, so this won't cause unnecessary recalculations
  }, [text, children, staggerDelayMs, durationMs, initialDelayMs, baseId]);

  return <div className={className}>{words}</div>;
});

export default TextReveal;
