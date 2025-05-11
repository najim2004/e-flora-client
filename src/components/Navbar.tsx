"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

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
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, translate } = useLanguage();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <img
                src="/logo.svg"
                alt="Mati'r Sathi Logo"
                className="w-full h-full"
              />
            </div>
            <span className="text-lg font-medium text-[#2E7D32]">
              Mati&apos;r Sathi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#2E7D32] transition-colors"
              >
                {translate(item.label)}
              </Link>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-gray-700 hover:text-[#2E7D32]"
            >
              {language === "en" ? "বাংলা" : "English"}
            </Button>

            <Link href="/login">
              <Button variant="outline" size="sm">
                {translate("Login")}
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
              >
                {translate("Register")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#2E7D32]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-gray-700 hover:text-[#2E7D32] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {translate(item.label)}
                </Link>
              ))}
              <hr className="my-2 border-gray-200" />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="justify-start text-gray-700 hover:text-[#2E7D32]"
              >
                {language === "en" ? "বাংলা" : "English"}
              </Button>
              <Link href="/login" className="block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  {translate("Login")}
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button
                  size="sm"
                  className="w-full justify-start bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                >
                  {translate("Register")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;