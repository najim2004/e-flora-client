"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { faBars, faTimes, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavItem {
  href: string;
  label: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/disease-detection", label: "Disease Detection" },
  { href: "/crop-suggestions", label: "Crop Suggestions" },
  { href: "/chatbot", label: "AI Assistant" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("features");
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        <div className="flex items-center space-x-2">
          <img
            src="https://readdy.ai/api/search-image?query=A%20minimalist%20logo%20for%20Matir%20Sathi%20agricultural%20platform%20with%20a%20simple%20leaf%20or%20plant%20sprout%20icon%20in%20green%20and%20brown%20earthy%20tones%2C%20modern%20clean%20design%20suitable%20for%20an%20app%20icon%2C%20transparent%20background%2C%20professional&width=50&height=50&seq=1&orientation=squarish"
            alt="Mati'r Sathi Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold text-[#2E7D32]">Mati'r Sathi</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Button
            variant="link"
            className={`text-base font-medium ${
              activeTab === "home" ? "text-[#2E7D32]" : "text-gray-600"
            } cursor-pointer !rounded-button whitespace-nowrap`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </Button>
          <Button
            variant="link"
            className={`text-base font-medium ${
              activeTab === "features" ? "text-[#2E7D32]" : "text-gray-600"
            } cursor-pointer !rounded-button whitespace-nowrap`}
            onClick={() => setActiveTab("features")}
          >
            Features
          </Button>
          <Button
            variant="link"
            className={`text-base font-medium ${
              activeTab === "chatbot" ? "text-[#2E7D32]" : "text-gray-600"
            } cursor-pointer !rounded-button whitespace-nowrap`}
            onClick={() => setActiveTab("chatbot")}
          >
            Chatbot
          </Button>
          <Button
            variant="link"
            className={`text-base font-medium ${
              activeTab === "support" ? "text-[#2E7D32]" : "text-gray-600"
            } cursor-pointer !rounded-button whitespace-nowrap`}
            onClick={() => setActiveTab("support")}
          >
            Support
          </Button>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="hidden md:flex items-center space-x-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] cursor-pointer !rounded-button whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faGlobe} className="text-sm" />
            <span>English</span>
          </Button>
          <Button
            id="sign-in-button"
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap"
            onClick={() => setIsSignInOpen(true)}
          >
            Sign In
          </Button>
          <Button
            variant="ghost"
            className="md:hidden text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
            onClick={toggleMobileMenu}
            id="mobile-menu-button"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </Button>
          {isMobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out"
                onClick={closeMobileMenu}
              />
              <div
                className={`fixed top-0 right-0 w-[280px] h-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
                  isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-bold text-[#2E7D32]">Menu</h2>
                  <Button
                    variant="ghost"
                    className="text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
                    onClick={closeMobileMenu}
                    id="mobile-menu-close"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-xl" />
                  </Button>
                </div>
                <nav className="p-4">
                  <div className="flex flex-col space-y-4">
                    <Button
                      variant="ghost"
                      className={`justify-start text-base font-medium ${
                        activeTab === "home"
                          ? "text-[#2E7D32]"
                          : "text-gray-600"
                      } cursor-pointer !rounded-button whitespace-nowrap`}
                      onClick={() => {
                        setActiveTab("home");
                        closeMobileMenu();
                      }}
                    >
                      Home
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start text-base font-medium ${
                        activeTab === "features"
                          ? "text-[#2E7D32]"
                          : "text-gray-600"
                      } cursor-pointer !rounded-button whitespace-nowrap`}
                      onClick={() => {
                        setActiveTab("features");
                        closeMobileMenu();
                      }}
                    >
                      Features
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start text-base font-medium ${
                        activeTab === "chatbot"
                          ? "text-[#2E7D32]"
                          : "text-gray-600"
                      } cursor-pointer !rounded-button whitespace-nowrap`}
                      onClick={() => {
                        setActiveTab("chatbot");
                        closeMobileMenu();
                      }}
                    >
                      Chatbot
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start text-base font-medium ${
                        activeTab === "support"
                          ? "text-[#2E7D32]"
                          : "text-gray-600"
                      } cursor-pointer !rounded-button whitespace-nowrap`}
                      onClick={() => {
                        setActiveTab("support");
                        closeMobileMenu();
                      }}
                    >
                      Support
                    </Button>
                    <Separator className="my-4" />
                    <Button
                      variant="outline"
                      className="justify-start border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="text-sm mr-2"
                      />
                      English
                    </Button>
                  </div>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
