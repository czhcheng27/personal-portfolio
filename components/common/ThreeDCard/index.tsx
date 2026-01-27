import { type CSSProperties, useState } from "react";
import styles from "./index.module.css";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  outterClassName?: string;
  style?: CSSProperties;
  onClick?: () => void;
  /** 3D倾斜强度系数 (默认 1.0) */
  tiltIntensity?: number;
  /** 阴影强度系数 (默认 0.5) */
  shadowIntensity?: number;
  /** 光斑范围倍数 (默认 200) */
  shineRange?: number;
  /** hover时缩放比例 (默认 1.05) */
  hoverScale?: number;
}

const ThreeDCard = ({
  children,
  className = "",
  style = {},
  onClick,
  tiltIntensity = 1.0,
  shadowIntensity = 0.5,
  shineRange = 200,
  hoverScale = 1.05,
  outterClassName = "",
}: ThreeDCardProps) => {
  const [cssVars, setCssVars] = useState<Record<string, string>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 - 1
    const y = (e.clientY - rect.top) / rect.height; // 0 - 1

    const tx = ((x - 0.5) * 2 * tiltIntensity).toFixed(3); // -tiltIntensity .. tiltIntensity
    const ty = ((y - 0.5) * 2 * tiltIntensity).toFixed(3);

    const shineX = `${Math.round(x * shineRange)}%`;
    const shineY = `${Math.round(y * shineRange)}%`;

    const shadowX = `${(-parseFloat(tx) * shadowIntensity).toFixed(3)}rem`;
    const shadowY = `${(-parseFloat(ty) * shadowIntensity).toFixed(3)}rem`;

    setCssVars({
      "--transform": `${tx}, ${ty}`,
      "--shine": `${shineX} ${shineY}`,
      "--shadow": `${shadowX} ${shadowY} 0rem`,
      "--start": `${Math.round(x * 360)}`,
      "--hover-scale": `${hoverScale}`,
    });
  };

  const handleMouseLeave = () => {
    setCssVars({
      "--transform": `0, 0`,
      "--shine": `100% 100%`,
      "--shadow": `0rem 0rem 0rem`,
      "--start": `0`,
      "--hover-scale": `${hoverScale}`,
    });
  };

  return (
    <div
      className={`${styles.hover3d} ${outterClassName}`}
      style={{
        ...(style as CSSProperties),
        ...(cssVars as unknown as CSSProperties),
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={className}>{children}</div>
    </div>
  );
};

export default ThreeDCard;
