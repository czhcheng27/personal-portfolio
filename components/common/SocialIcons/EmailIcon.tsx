interface EmailIconProps {
  href?: string;
  className?: string;
  fill?: string;
}

const EmailIcon = ({
  href = "mailto:",
  className = "",
  fill = "#cbd5e1",
}: EmailIconProps) => {
  return (
    <a
      className={`w-11 h-11 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all duration-300 social-icon-glow ${className}`}
      href={href}
    >
      <svg className="w-5 h-5" fill={fill} viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
      </svg>
    </a>
  );
};

export default EmailIcon;
