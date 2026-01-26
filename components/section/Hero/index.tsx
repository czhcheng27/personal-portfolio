import Image from "next/image";
import Spline from "@splinetool/react-spline/next";
import Header from "@/components/layout/Header";

interface HeroProps {}

const Hero = ({}: HeroProps) => {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between">
      <Image
        src="/assets/bg/gradient.png"
        alt="Hero Image"
        width={524}
        height={520}
        className="absolute top-0 right-0 opacity-60 -z-10"
      />

      <div className="h-0 w-160 absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-30 -z-10"></div>

      <div className="max-w-xl ml-[5%] mt-[126%] md:mt-[60%] lg:mt-0 z-10">
        <div className="h-80 w-130 bg-red-200">content</div>
      </div>

      <Spline
        className="absolute lg:top-0 -top-60 bottom-0 sm:left-[-2%] lg:left-[25%] h-full"
        scene="https://prod.spline.design/B7JZR-DlCaC2BOBE/scene.splinecode"
      />
    </div>
  );
};

export default Hero;
