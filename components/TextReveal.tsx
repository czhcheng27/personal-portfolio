import { motion } from "framer-motion";
import { ReactNode, Children, isValidElement } from "react";

interface TextRevealProps {
  text?: string;
  children?: ReactNode;
  className?: string; // Optional className for styling
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // 每个单词之间的延迟时间
    },
  },
};

const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 10, 
    filter: "blur(8px)" // 初始状态：透明、下方、模糊
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", // 最终状态：可见、原位、清晰
    transition: { duration: 0.5 }
  },
};

export default function TextReveal({ text, children, className = "" }: TextRevealProps) {
  const words: ReactNode[] = [];
  let count = 0;

  // Recursively process children to flatten text into animated words
  const processNode = (node: ReactNode, extraClass: string = "") => {
    Children.forEach(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        const str = String(child);
        str.split(" ").forEach((word) => {
          words.push(
            <motion.span
              key={count++}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.25em" }}
              className={extraClass}
            >
              {word}
            </motion.span>
          );
        });
      } else if (isValidElement(child)) {
        // Merge parent classes with child classes if applicable
        const childProps = child.props as { className?: string; children?: ReactNode };
        const childClass = childProps.className || "";
        const newClass = extraClass ? `${extraClass} ${childClass}` : childClass;
        
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // 当进入视口时开始动画
      viewport={{ once: true }}
      className={className}
    >
      {words}
    </motion.div>
  );
}