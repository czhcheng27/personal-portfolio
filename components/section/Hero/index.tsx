import { FaLocationArrow } from "react-icons/fa6";
import ComputersCanvas from "@/components/section/Hero/Computer";
import SectionContainer from "@/components/layout/SectionContainer";

interface HeroProps {}

const Hero = ({}: HeroProps) => {
  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center w-full h-screen">
      <SectionContainer className="mt-0! py-20 h-full bg-[radial-gradient(circle_at_50%_30%,rgba(145,94,255,0.2)_0%,transparent_70%)]">
        <div className="relative h-full flex flex-col justify-evenly -mt-8 lg:mt-0">
          {/* text */}
          <div className="w-full h-fit flex gap-4 px-6">
            <div
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0"
              data-aos-duration="1500"
              className="flex flex-col items-center pt-5"
            >
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 h-full violet-gradient" />
            </div>

            <div>
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="500"
                data-aos-offset="0"
                data-aos-duration="2000"
                className="text-[42px] xs:text-[50px] sm:text-[60px] lg:text-[80px] font-black text-white mt-2"
              >
                Hi, I&apos;m&nbsp;
                <span className="bg-linear-to-r from-[#915EFF] via-[#d8b4fe] to-[#915EFF] bg-size-[200%_auto] bg-clip-text text-transparent animate-gradient-flow">
                  Zihang
                </span>
              </div>
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="500"
                data-aos-offset="0"
                data-aos-duration="2500"
                className={`font-medium text-lg xs:text-xl sm:text-2xl lg:text-3xl leading-relaxed lg:leading-10 mt-5 text-white-100`}
              >
                <div>
                  I develop scalable, high-performance web applications with
                  modular, maintainable frontend architectures.
                </div>
              </div>
            </div>
          </div>

          {/* 3d model */}
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="1000"
            data-aos-offset="0"
            data-aos-duration="3000"
            className="w-full aspect-2/1 xl:[@media_(max-height:736px)]:h-120 xl:[@media_(min-height:737px)_and_(max-height:920px)]:h-150"
          >
            <ComputersCanvas />
          </div>

          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="800"
            data-aos-offset="0"
            data-aos-duration="2500"
            className="lg:hidden w-full flex items-center justify-center px-6"
          >
            <button className="w-full max-w-xs py-5 bg-[#915EFF] text-white font-bold rounded-2xl shadow-xl shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg">
              Explore My Work <FaLocationArrow />
            </button>
          </div>

          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="1000"
            data-aos-offset="0"
            data-aos-duration="2500"
            className="absolute -bottom-10 w-full flex justify-center items-center"
          >
            <a href="#about">
              <div className="w-9 h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                <div
                  className={`w-3 h-3 rounded-full bg-secondary mb-1 animate-bounceY`}
                />
              </div>
            </a>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Hero;
