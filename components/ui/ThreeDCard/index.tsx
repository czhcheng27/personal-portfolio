import { type CSSProperties } from "react";
import styles from "./index.module.css";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const ThreeDCard = ({
  children,
  className = "",
  style = {},
  onClick,
}: ThreeDCardProps) => {
  return (
    /* 使用 styles.hover3d 确保类名正确 */
    <div className={styles.hover3d} style={style} onClick={onClick}>
      {/* 这里的 className 依然接收外部传入的样式 */}
      <div className={className}>{children}</div>

      {/* 8个检测区域不需要额外类名，CSS里用了 :nth-child 控制 */}
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default ThreeDCard;
