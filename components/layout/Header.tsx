"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";
import menu from "@/public/assets/icons/menu.svg";
import close from "@/public/assets/icons/close.svg";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
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
      className={`w-full flex items-center px-4 sm:px-6 md:px-12 py-5 fixed top-0 inset-x-0 z-9999 transition-colors duration-300 ${scrolled ? "bg-primary/95 shadow-lg backdrop-blur-sm" : "bg-transparent"}`}
      style={{ willChange: scrolled ? "auto" : "transform" }}
    >
      <div className="w-full flex justify-between items-center max-w-8xl mx-auto">
        <Link
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1000"
          href="/"
          className="flex items-center"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="flex items-center relative">
            {/* 1. 左侧组：Logo + 名字 - 使用 CSS 动画 */}
            <div className="flex items-center gap-2 z-10 navbar-slide-in">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain relative z-20"
              />
              <p className="text-white text-[18px] font-bold whitespace-nowrap md:logo-text relative z-0">
                Zihang Cheng
              </p>
            </div>

            {/* 2. 右侧组：| Frontend Developer - 使用 CSS 动画 */}
            <div className="hidden md:block navbar-fade-in">
              <span className="text-white text-[18px] font-medium opacity-80 whitespace-nowrap ml-2">
                | Frontend Developer
              </span>
            </div>
          </div>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav, idx) => (
            <li
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration={1500 + idx * 500}
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

export default Header;
