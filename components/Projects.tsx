"use client";

import { projects } from "@/constants";
import ThreeDCard from "./ui/ThreeDCard";
import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import GithubImg from "@/public/assets/icons/github.png";
import SectionContainer from "./SectionContainer";

const Projects = () => {
  return (
    <SectionContainer>
      <div className="w-full h-full px-5">
        <h1 className="heading">
          A small selection of{" "}
          <span className="headingWords">recent projects</span>
        </h1>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => {
            const { id, title, des, img, iconLists, link, github } = project;
            return (
              <ThreeDCard
                key={id}
                className="h-full flex flex-col card-bg card-border p-5 rounded-2xl overflow-hidden"
              >
                {/* top */}
                <div className="relative">
                  <Image
                    src={img}
                    alt="project_image"
                    width={320}
                    height={230}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    onClick={() => window.open(github, "_blank")}
                    className="absolute top-1 right-1 black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer z-10"
                  >
                    <Image
                      src={GithubImg}
                      alt="source code"
                      width={20}
                      height={20}
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>

                {/* center */}
                <div className="mt-5 flex-1">
                  <h3 className="text-white font-bold text-[24px]">{title}</h3>
                  <p className="mt-2 text-secondary text-[14px]">{des}</p>
                </div>

                {/* bottom */}
                <div className="flex items-center justify-between mt-7 mb-3">
                  <div className="flex items-center">
                    {iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/20 rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}
                      >
                        <img src={icon} alt={`icon-${index}`} className="p-2" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    <p className="flex lg:text-xl md:text-xs text-sm headingWords cursor-pointer">
                      Check Live Site
                    </p>
                    <FaLocationArrow className="ms-3" color="#915EFF" />
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Projects;
