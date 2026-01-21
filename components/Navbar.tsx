"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";
import { logo, menu, close } from "@/public/assets";

interface NavbarProps {}

// 动画配置：强弹力的弹簧效果
const springConfig = {
  type: "spring" as const,
  stiffness: 120, // 劲度
  damping: 17, // 阻尼
  mass: 2, // 质量
};

const Navbar = ({}: NavbarProps) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`paddingX w-full flex items-center py-5 fixed top-0 z-50 bg-primary ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => window.scrollTo(0, 0)}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center relative"
          >
            {/* 1. 左侧组：Logo + 名字 */}
            <motion.div
              className="flex items-center gap-2 z-10"
              initial={{ x: 80, opacity: 0 }} // 初始向右偏移 80px 达到居中视觉
              animate={{ x: 0, opacity: 1 }}
              transition={{
                x: { ...springConfig, delay: 0.6 }, // 位移延迟 0.6s 执行
                opacity: { duration: 0.5 }, // 透明度立即执行（出现）
              }}
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <p className="text-white text-[18px] font-bold whitespace-nowrap">
                Zihang Cheng
              </p>
            </motion.div>

            {/* 2. 右侧组：| Frontend Developer */}
            <motion.div
              className="hidden sm:block"
              initial={{ x: -20, opacity: 0, filter: "blur(5px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                x: { ...springConfig, delay: 0.6 },
                opacity: { duration: 0.5, delay: 0.6 },
                filter: { delay: 0.6 },
              }}
            >
              <span className="text-white text-[18px] font-medium opacity-80 whitespace-nowrap ml-2">
                | Frontend Developer
              </span>
            </motion.div>
          </motion.div>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <Image
            src={toggle ? close : menu}
            alt="menu"
            className="w-7 h-7 object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-35 z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
