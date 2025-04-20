import { useState, useEffect, memo } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Define NavbarLinks here directly or import if you prefer ---
// Assuming the structure is an array of objects like: { id: number, name: string, href: string }
const NavbarLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Destinations", href: "/destinations" }, // <-- Added Destinations Link
  { id: 3, name: "About Us", href: "/about" },
  { id: 4, name: "Inquire Now", href: "/IForm" }, 
];

const Logo = memo(() => (
  <NavLink to="/" className="relative group">
    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
      Sab
      <span className="text-orange-500 inline-block group-hover:rotate-12 group-hover:scale-125 transition-all duration-300">
        G
      </span>
      umo
    </h3>
    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
  </NavLink>
));

const NavbarLink = ({ navlink, active, className }) => {
  return (
    <NavLink
      to={navlink.href}
      className={cn(
        "relative px-3 py-1.5 font-medium text-sm transition-all duration-200 rounded-md",
        active
          ? "text-orange-600 font-semibold"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80",
        className
      )}
    >
      {navlink.name}
      {active && (
        <span className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-orange-500" />
      )}
    </NavLink>
  );
};

const SocialButton = ({ href, icon: Icon, color, label }) => (
  <Button
    size="sm"
    variant="ghost"
    className={cn(
      "rounded-full w-9 h-9 p-0 transition-all hover:scale-105",
      color === "green" && "text-green-600 hover:text-green-700 hover:bg-green-50",
      color === "pink" && "text-pink-600 hover:text-pink-700 hover:bg-pink-50"
    )}
    asChild
  >
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon className="h-5 w-5" />
    </a>
  </Button>
);

const MobileNavLink = ({ navlink, active, onClick }) => {
  return (
    <NavLink
      to={navlink.href}
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-4 py-3 text-base transition-colors rounded-md",
        active
          ? "bg-orange-50 text-orange-600 font-medium"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      {navlink.name}
    </NavLink>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseSheet = () => setSheetOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={cn(
        "w-full fixed z-50 transition-all duration-300 h-16",
        scrolled 
          ? "bg-white shadow-sm border-b" 
          : "bg-white/80 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <nav className="flex items-center mr-4 space-x-1">
            {/* Filter out the Inquire button for the nav list, render it separately */}
            {NavbarLinks.filter(link => link.name !== "Inquire Now").map((navlink) => (
              <NavbarLink 
                key={navlink.id}
                navlink={navlink} 
                active={isActive(navlink.href)}
              />
            ))}
          </nav>
          
          {/* Inquire Button for Desktop */}
          <Button 
            variant="default"
            size="sm" 
            className="bg-orange-600 text-white hover:bg-orange-700 font-medium px-4"
          >
            <NavLink to="/IForm">Inquire Now</NavLink>
          </Button>
          
          {/* Social Media Links */}
          <div className="flex items-center space-x-1 ml-2 border-l pl-3 border-gray-200">
            <SocialButton
              href="https://wa.me/918239498447"
              icon={IoLogoWhatsapp}
              color="green"
              label="WhatsApp"
            />
            <SocialButton
              href="https://www.instagram.com/sabgumo/"
              icon={FaInstagram}
              color="pink"
              label="Instagram"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-3">
          <Button
            variant="default"
            size="sm"
            className="bg-orange-600 text-white hover:bg-orange-700 px-3 text-sm"
          >
            <NavLink to="/IForm">Inquire</NavLink>
          </Button>
          
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-md">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="pb-6">
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1">
                {NavbarLinks.map((navlink) => (
                  <MobileNavLink
                    key={navlink.id}
                    navlink={navlink}
                    active={isActive(navlink.href)}
                    onClick={handleCloseSheet}
                  />
                ))}
              </nav>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
                <div className="flex justify-center space-x-4">
                  <SocialButton 
                    href="https://wa.me/918239498447"
                    icon={IoLogoWhatsapp}
                    color="green"
                    label="WhatsApp"
                  />
                  <SocialButton
                    href="https://www.instagram.com/sabgumo/"
                    icon={FaInstagram}
                    color="pink"
                    label="Instagram"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default memo(Navbar);