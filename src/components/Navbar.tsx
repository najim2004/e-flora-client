"use client";
import { Button } from "@/components/ui/button";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hamburger from "./hamburger";
import NavLink from "./ui/navlink";
import Link from "next/link";

const Navbar: React.FC = () => {
  const navItems = [
    { id: "home", href: "/", label: "Home" },
    { id: "features", href: "/", label: "Features" },
    { id: "chatbot", href: "/", label: "Chatbot" },
    { id: "support", href: "/", label: "Support" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        <div className="flex items-center space-x-2">
          <img
            src="https://readdy.ai/api/search-image?query=A%20minimalist%20logo%20for%20Matir%20Sathi%20agricultural%20platform%20with%20a%20simple%20leaf%20or%20plant%20sprout%20icon%20in%20green%20and%20brown%20earthy%20tones%2C%20modern%20clean%20design%20suitable%20for%20an%20app%20icon%2C%20transparent%20background%2C%20professional&width=50&height=50&seq=1&orientation=squarish"
            alt="Mati'r Sathi Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold text-[#2E7D32]">
            Mati&apos;r Sathi
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              href={`/${item.href}`}
              className={`text-base font-medium text-gray-600 cursor-pointer !rounded-button whitespace-nowrap`}
              activeClass="text-[#2E7D32]"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-x-4">
          <Button
            variant="outline"
            className="hidden md:flex items-center space-x-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] cursor-pointer !rounded-button whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faGlobe} className="text-sm" />
            <span>English</span>
          </Button>

          <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap">
            <Link href="/signin">Sign In</Link>
          </Button>

          <Hamburger />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
