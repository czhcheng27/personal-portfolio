import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
} from "@/components/common/SocialIcons";
import SectionContainer from "./SectionContainer";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <SectionContainer className="relative z-50 w-full mt-12 bg-background-light dark:bg-background-dark/80 backdrop-blur-xl                         footer-pattern overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="relative z-10 max-w-screen-2xl mx-auto px-10 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="">
          <span className="text-white font-bold mr-2">Zihang Cheng</span>
          <span className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-600 mt-1 font-semibold">
            Built with Passion
          </span>
        </div>
        <div className="flex items-center gap-4">
          <GitHubIcon
            href="https://github.com/yourusername"
            className="bg-white/5 border-white/10 hover:shadow-[0_0_20px_rgba(145,94,255,0.6)]"
            fill="#cbd5e1"
          />
          <LinkedInIcon
            href="https://linkedin.com/in/yourusername"
            className="bg-white/5 border-white/10 hover:shadow-[0_0_20px_rgba(145,94,255,0.6)]"
            fill="#cbd5e1"
          />
          <EmailIcon
            href="mailto:your.email@example.com"
            className="bg-white/5 border-white/10 hover:shadow-[0_0_20px_rgba(145,94,255,0.6)]"
            fill="#cbd5e1"
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default Footer;
