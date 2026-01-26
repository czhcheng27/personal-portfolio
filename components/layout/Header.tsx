"use client";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenu?.classList.contains("hidden")) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu?.classList.add("hidden");
    }
  };

  return (
    <header className="absolute w-full flex justify-between items-center px-4 lg:px-20 py-4 z-10">
      <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light m-0">
        Zihang
      </h1>

      <nav className="hidden md:flex items-center gap-12">
        <a
          href="#"
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
        >
          Company
        </a>
        <a
          href="#"
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
        >
          Overview
        </a>
        <a
          href="#"
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
        >
          Experience
        </a>
        <a
          href="#"
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
        >
          Project
        </a>
      </nav>

      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-3xl p-2 z-50"
      >
        <i className="fas fa-bars">=</i>
      </button>

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className="hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur-md"
      >
        <nav className="flex flex-col items-center gap-6">
          <a
            href="#"
            className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Company
          </a>
          <a
            href="#"
            className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Overview
          </a>
          <a
            href="#"
            className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Experience
          </a>
          <a
            href="#"
            className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Project
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
