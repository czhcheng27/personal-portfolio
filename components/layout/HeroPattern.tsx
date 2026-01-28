export default function HeroPattern() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.3)_15%,transparent_40%,transparent_60%,rgba(0,0,0,0.3)_85%,rgba(0,0,0,0.6)_100%)]">
      <svg
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="text-[#915eff]/40"
          d="M0,1000 C200,800 300,900 500,600 C700,300 800,400 1000,0"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          className="text-[#915eff]/20"
          d="M-200,1000 C100,700 400,800 600,400 C800,100 900,200 1200,-100"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          className="text-[#915eff]/10"
          d="M1000,1000 C800,800 700,900 500,600 C300,300 200,400 0,0"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
