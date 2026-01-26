import React from "react";

/**
 * 流光边框元素组件的属性接口
 */
interface GlowElementProps {
  /** 渲染的 HTML 标签，默认 "div"，可以是 "button", "a", "span" 等 */
  as?: React.ElementType;
  /** 简写：设置为 true 时渲染为 button 元素 */
  button?: boolean;
  /** 子内容，可以是文本或 React 节点 */
  children?: React.ReactNode;
  /** 按钮标题文本（用于按钮模式，与 children 二选一） */
  title?: string;
  /** 图标元素 */
  icon?: React.ReactNode;
  /** 图标位置：左侧或右侧 */
  iconPosition?: "left" | "right";
  /** 点击事件处理函数 */
  onClick?: () => void;
  /** 外层容器的额外类名 */
  className?: string;
  /** 内层内容区域的额外类名 */
  innerClassName?: string;
  /** 流光渐变颜色配置 */
  glowColors?: {
    from?: string;
    via?: string;
    to?: string;
  };
  /** 流光动画持续时间（秒） */
  glowDuration?: number;
  /** 圆角大小，默认 "lg" */
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** 流光边框宽度（像素），默认 1 */
  borderWidth?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 原生 HTML 属性透传 */
  [key: string]: unknown;
}

/**
 * 流光边框元素组件
 *
 * 提供带有流光滚动效果边框的通用元素，可作为 div、button、a 等使用。
 *
 * @example
 * // 作为普通 div 使用
 * <GlowElement>
 *   <p>内容</p>
 * </GlowElement>
 *
 * @example
 * // 作为按钮使用（简写方式）
 * <GlowElement button onClick={() => console.log('clicked')}>
 *   点击我
 * </GlowElement>
 *
 * @example
 * // 作为按钮使用（带图标）
 * <GlowElement
 *   button
 *   icon={<ArrowIcon />}
 *   iconPosition="right"
 *   onClick={() => console.log('clicked')}
 * >
 *   点击我
 * </GlowElement>
 *
 * @example
 * // 自定义流光颜色
 * <GlowElement
 *   glowColors={{ from: "#ff0000", via: "#00ff00", to: "#0000ff" }}
 *   glowDuration={3}
 * >
 *   自定义流光
 * </GlowElement>
 */
const GlowElement = ({
  as,
  button = false,
  children,
  title,
  icon,
  iconPosition = "right",
  onClick,
  className = "",
  innerClassName = "",
  glowColors = {
    from: "#E2CBFF",
    via: "#393BB2",
    to: "#E2CBFF",
  },
  glowDuration = 2,
  borderRadius = "lg",
  borderWidth = 1,
  disabled = false,
  // 提取已知的 props，剩余的透传给组件
  ...restProps
}: GlowElementProps) => {
  // 确定实际渲染的标签：button 属性优先，然后是 as 属性，默认为 div
  const Component = button ? "button" : (as ?? "div");
  const Tag = Component as React.ElementType<{ children?: React.ReactNode }>;

  // 构建流光渐变背景
  const glowGradient = `conic-gradient(from 90deg at 50% 50%, ${glowColors.from} 0%, ${glowColors.via} 50%, ${glowColors.to} 100%)`;

  // 圆角映射
  const radiusMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };
  const radiusClass = radiusMap[borderRadius];

  // 判断是否为按钮模式
  const isButtonMode = button || Component === "button" || !!title;

  // 渲染内容
  const renderContent = () => {
    // 按钮模式且有 icon：渲染 icon + children/title
    if (isButtonMode && icon) {
      return (
        <>
          {iconPosition === "left" && icon}
          {children ?? title}
          {iconPosition === "right" && icon}
        </>
      );
    }

    // 有 children 直接返回
    if (children) {
      return children;
    }

    // 只有 title
    if (title) {
      return title;
    }

    return null;
  };

  return (
    <Tag
      className={`relative ${isButtonMode ? "h-12" : ""} inline-flex overflow-hidden ${radiusClass} focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ padding: `${borderWidth}px` }}
      {...restProps}
    >
      {/* 流光背景层 */}
      <span
        className="absolute inset-[-1000%]"
        style={{
          background: glowGradient,
          animation: `spin ${glowDuration}s linear infinite`,
        }}
      />

      {/* 内容层 */}
      <span
        className={`relative inline-flex w-full h-full items-center justify-center ${radiusClass} bg-slate-950 backdrop-blur-3xl ${
          isButtonMode
            ? "cursor-pointer px-7 text-sm font-medium text-white gap-2"
            : ""
        } ${innerClassName}`}
      >
        {renderContent()}
      </span>
    </Tag>
  );
};

export default GlowElement;
