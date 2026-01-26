import ComputersCanvas from "@/components/section/Hero/Computer";
import SectionContainer from "@/components/layout/SectionContainer";
import GlowElement from "@/components/common/GlowElement";

interface HeroProps {}

const Hero = ({}: HeroProps) => {
  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center w-full h-screen">
      <SectionContainer className="mt-0! py-20 h-full">
        <div className="relative h-full flex flex-col justify-evenly">
          {/* text */}
          <div className="w-full h-1/2 lg:h-fit flex gap-4">
            <div
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0"
              data-aos-duration="1500"
              className="flex flex-col items-center pt-5"
            >
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 min-h-40 h-full violet-gradient" />
            </div>

            <div>
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="500"
                data-aos-offset="0"
                data-aos-duration="2000"
                className="text-[40px] xs:text-[50px] sm:text-[60px] lg:text-[80px] font-black text-white mt-2"
              >
                Hi, I&apos;m <span className="text-[#915EFF]">Zihang</span>
              </div>
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="500"
                data-aos-offset="0"
                data-aos-duration="2500"
                className={`font-medium xs:text-xl sm:text-2xl lg:text-3xl lg:leading-10 mt-2 text-white-100`}
              >
                <div>
                  I develop scalable, high-performance web applications with
                  modular, maintainable frontend architectures.
                </div>
                <div className="mt-5 lg:hidden">
                  <GlowElement button>Contact Me</GlowElement>
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
