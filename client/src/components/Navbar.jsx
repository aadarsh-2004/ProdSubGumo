import { useState, useCallback, memo, useEffect } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { NavbarLinks } from "../utils/constants";

const Logo = memo(() => (
  <NavLink to="/" className="relative group">
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
      Sab
      <span className="text-orange-500 inline-block group-hover:rotate-12 transition-transform duration-300">
        G
      </span>
      umo
    </h3>
    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300" />
  </NavLink>
));

const SocialButton = memo(({ href, icon: Icon, gradientFrom, gradientTo, label, shadowColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      aria-label={label}
    >
      <div
        className="absolute -inset-3 rounded-full opacity-20 group-hover:opacity-0 transition-opacity duration-300 animate-bounce-slow"
      />
      <div
        className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
        
      />
      <div
        className={`relative p-3 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
        
      >
        {/* Ping animation layer */}
        <div
          className="absolute -inset-3 rounded-full opacity-20 animate-ping"
          style={{ backgroundColor: gradientFrom }}
        />

        {/* Hover glow effect */}
        <div
          className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-10 blur"
          style={{
            background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
          }}
        />

        {/* Button content */}
        <div className="relative flex items-center justify-center">
          <Icon
            className="w-6 h-6 transition-transform group-hover:scale-125"
            style={{ color: gradientFrom }}
          />
        </div>
      </div>
    </a>
  );
});

const NavbarLink = memo(({ navlink, onClick }) => (
  <NavLink
    to={navlink.href}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-6 py-3 lg:px-4 lg:py-2  relative group transition-colors duration-300
      ${
        navlink.name === "Inquire Now"
          ? "font-bold  rounded-md border-2 border-purple-500  bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-clip-border text-transparent  hover:scale-105  "
          : isActive
          ? " bg-gradient-to-r from-orange-600 to bg-orange-500 bg-clip-text text-transparent font-bold"
      : " text-gray-900 hover:bg-gradient-to-r  "
      }`
    }
  >
    {navlink.name}
    <span className="absolute bottom-0 left-0 w-0 h-0.5  group-hover:w-full transition-all duration-300" />
  </NavLink>
));

const Navbar = () => {
  const [navbarState, setNavbarState] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = useCallback(() => {
    setNavbarState((prev) => !prev);
  }, []);

  const closeNavbar = useCallback(() => {
    setNavbarState(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <nav
      className={` w-full fixed z-50 transition-all duration-300 font-poppins   font-semibold
      ${scrolled ? "   py-4 bg-transparent backdrop-blur-3xl shadow-lg" : "py-3 bg-transparent backdrop-blur-2xl"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 max-w-7xl">
        <Logo />

        <button
          className="lg:hidden relative z-50 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          onClick={toggleNavbar}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative  flex flex-col justify-between">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                  navbarState && index === 0
                    ? "rotate-45 translate-y-2"
                    : navbarState && index === 1
                    ? "opacity-0"
                    : navbarState && index === 2
                    ? "-rotate-45 -translate-y-2"
                    : ""
                }`}
              />
            ))}
          </div>
        </button>

        <div
          className={`fixed inset-0 lg:static lg:flex lg:items-center lg:gap-8 transition-all duration-300
          ${
            navbarState
              ? "visible opacity-100 bg-white backdrop-blur-md"
              : "invisible lg:visible opacity-0 lg:opacity-100"
          }`}
        >
          <ul
            className={`b flex flex-col lg:flex-row items-center gap-6 pt-20 lg:pt-0 transition-all duration-500
            ${navbarState ? "translate-x-0 bg-white backdrop-blur-md" : "-translate-x-full lg:translate-x-0"}`}
          >
            {NavbarLinks.map((navlink) => (
              <li key={navlink.id} className="w-full lg:w-auto">
                <NavbarLink navlink={navlink} onClick={closeNavbar} />
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-6 mt-8 lg:mt-0 lg:ml-6 transition-all duration-500">
            <SocialButton
              href="https://wa.me/918239498447"
              icon={IoLogoWhatsapp}
              gradientFrom="#4ade80"
              gradientTo="#16a34a"
              shadowColor="#22c55e"
              label="WhatsApp"
            />
            <SocialButton
              href="https://www.instagram.com/sabgumo/"
              icon={FaInstagram}
              gradientFrom="#ec4899"
              gradientTo="#a855f7"
              shadowColor="#ec4899"
              label="Instagram"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);