"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface HeaderSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

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
            <i className="fas fa-globe text-sm"></i>
            <span>English</span>
          </Button>
          <Button
            id="sign-in-button"
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap"
            onClick={() => setIsSignInOpen(true)}
          >
            Sign In
          </Button>
          {isSignInOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                  <Button
                    id="close-sign-in-modal"
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsSignInOpen(false)}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Email or Username
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email or username"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded text-[#2E7D32] focus:ring-[#2E7D32]"
                      />
                      <label
                        htmlFor="remember-me"
                        className="block ml-2 text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <Button
                      id="forgot-password"
                      variant="link"
                      className="text-sm text-[#2E7D32] hover:text-[#1B5E20]"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Button
                    id="sign-in-submit"
                    type="submit"
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white !rounded-button whitespace-nowrap"
                  >
                    Sign In
                  </Button>
                </form>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-gray-500 bg-white">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {[
                      { icon: "fa-google", label: "Google" },
                      { icon: "fa-facebook-f", label: "Facebook" },
                      { icon: "fa-twitter", label: "Twitter" },
                    ].map((social, index) => (
                      <Button
                        key={index}
                        id={`sign-in-${social.label.toLowerCase()}`}
                        variant="outline"
                        className="flex items-center justify-center w-full px-4 py-2 space-x-2 border hover:bg-gray-50 !rounded-button whitespace-nowrap"
                      >
                        <i className={`fab ${social.icon}`}></i>
                        <span className="sr-only">{social.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <span className="text-sm text-gray-600">
                    Don't have an account?{" "}
                  </span>
                  <Button
                    id="sign-up-link"
                    variant="link"
                    className="text-sm text-[#2E7D32] hover:text-[#1B5E20]"
                    onClick={() => {
                      setIsSignInOpen(false);
                      setIsSignUpOpen(true);
                    }}
                  >
                    Sign up now
                  </Button>
                </div>
              </div>
            </div>
          )}
          {isSignUpOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                  <Button
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsSignUpOpen(false)}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signup-email"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signup-password"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded text-[#2E7D32] focus:ring-[#2E7D32]"
                    />
                    <label
                      htmlFor="terms"
                      className="block ml-2 text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <Button
                        variant="link"
                        className="p-0 text-[#2E7D32] hover:text-[#1B5E20]"
                      >
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button
                        variant="link"
                        className="p-0 text-[#2E7D32] hover:text-[#1B5E20]"
                      >
                        Privacy Policy
                      </Button>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white !rounded-button whitespace-nowrap"
                  >
                    Sign Up
                  </Button>
                </form>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-gray-500 bg-white">
                        Or sign up with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {[
                      { icon: "fa-google", label: "Google" },
                      { icon: "fa-facebook-f", label: "Facebook" },
                      { icon: "fa-twitter", label: "Twitter" },
                    ].map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="flex items-center justify-center w-full px-4 py-2 space-x-2 border hover:bg-gray-50 !rounded-button whitespace-nowrap"
                      >
                        <i className={`fab ${social.icon}`}></i>
                        <span className="sr-only">{social.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <span className="text-sm text-gray-600">
                    Already have an account?{" "}
                  </span>
                  <Button
                    variant="link"
                    className="text-sm text-[#2E7D32] hover:text-[#1B5E20]"
                    onClick={() => {
                      setIsSignUpOpen(false);
                      setIsSignInOpen(true);
                    }}
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            className="md:hidden text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
            onClick={toggleMobileMenu}
            id="mobile-menu-button"
          >
            <i className="fas fa-bars text-xl"></i>
          </Button>
          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={closeMobileMenu}
              />
              <div className="fixed top-0 right-0 w-[280px] h-full bg-white z-50 shadow-xl transform transition-transform">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-bold text-[#2E7D32]">Menu</h2>
                  <Button
                    variant="ghost"
                    className="text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
                    onClick={closeMobileMenu}
                    id="mobile-menu-close"
                  >
                    <i className="fas fa-times text-xl"></i>
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
                      <i className="fas fa-globe text-sm mr-2"></i>
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

export default HeaderSection;
