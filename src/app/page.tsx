"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("features");
  const [location, setLocation] = useState("");
  const [soilType, setSoilType] = useState("");
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temperature: "24°C",
    humidity: "65%",
    rainfall: "80mm",
    forecast: [
      { day: "Monday", temp: "24°C", icon: "sun" },
      { day: "Tuesday", temp: "23°C", icon: "cloud-sun" },
      { day: "Wednesday", temp: "25°C", icon: "sun" },
      { day: "Thursday", temp: "22°C", icon: "cloud-rain" },
      { day: "Friday", temp: "23°C", icon: "cloud-sun" },
    ],
  });

  const cropSuggestions = [
    {
      name: "Rice",
      confidence: 95,
      image:
        "https://readdy.ai/api/search-image?query=Close%20up%20of%20fresh%20green%20rice%20paddy%20in%20a%20field%20during%20golden%20hour%2C%20showing%20the%20detailed%20texture%20of%20the%20rice%20grains%2C%20with%20natural%20sunlight%2C%20clean%20agricultural%20background%2C%20professional%20photography&width=300&height=200&seq=20&orientation=landscape",
      tips: [
        "Ideal planting depth: 2-3cm",
        "Water requirement: High",
        "Growing season: 100-150 days",
      ],
      suitability: [
        "High rainfall areas",
        "Clay-loam soil",
        "Tropical climate",
      ],
    },
    {
      name: "Wheat",
      confidence: 88,
      image:
        "https://readdy.ai/api/search-image?query=Golden%20wheat%20field%20ready%20for%20harvest%20under%20blue%20sky%2C%20showing%20ripe%20wheat%20ears%20in%20detail%2C%20natural%20agricultural%20scene%2C%20clean%20background%2C%20professional%20photography&width=300&height=200&seq=21&orientation=landscape",
      tips: [
        "Ideal planting depth: 4-5cm",
        "Water requirement: Moderate",
        "Growing season: 120-150 days",
      ],
      suitability: ["Cool climate", "Well-drained soil", "Moderate rainfall"],
    },
    {
      name: "Potato",
      confidence: 82,
      image:
        "https://readdy.ai/api/search-image?query=Fresh%20potatoes%20being%20harvested%20from%20rich%20soil%2C%20showing%20both%20the%20plant%20and%20tubers%2C%20natural%20agricultural%20scene%2C%20clean%20earthy%20background%2C%20professional%20photography&width=300&height=200&seq=22&orientation=landscape",
      tips: [
        "Ideal planting depth: 10cm",
        "Water requirement: Moderate",
        "Growing season: 90-120 days",
      ],
      suitability: ["Cool climate", "Sandy-loam soil", "Good drainage"],
    },
  ];

  const soilTypes = [
    { value: "clay", label: "Clay Soil" },
    { value: "sandy", label: "Sandy Soil" },
    { value: "loamy", label: "Loamy Soil" },
    { value: "silt", label: "Silty Soil" },
    { value: "peat", label: "Peat Soil" },
  ];

  const getLocation = () => {
    setIsGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude}, ${position.coords.longitude}`
          );
          setIsGpsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsGpsLoading(false);
        }
      );
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const swiperModules = [Pagination, Autoplay];
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
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
                    <h2 className="text-2xl font-bold text-gray-900">
                      Sign In
                    </h2>
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
                    <h2 className="text-2xl font-bold text-gray-900">
                      Sign Up
                    </h2>
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
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32]/90 to-transparent z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=A%20panoramic%20view%20of%20lush%20green%20agricultural%20fields%20with%20farmers%20working%20during%20golden%20hour%2C%20showing%20diverse%20crops%20and%20modern%20farming%20techniques%2C%20soft%20natural%20lighting%2C%20earthy%20tones%2C%20with%20mountains%20in%20the%20background%2C%20professional%20photography%20style%2C%20high%20resolution%2C%20showing%20the%20beauty%20of%20agriculture&width=1440&height=600&seq=2&orientation=landscape"
            alt="Farmers in field"
            className="object-cover w-full h-[600px] object-top"
          />
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container px-4 mx-auto max-w-7xl">
              <div className="max-w-xl text-white">
                <Badge className="mb-4 bg-white text-[#2E7D32] hover:bg-white/90 cursor-pointer whitespace-nowrap">
                  Agriculture Support Platform
                </Badge>
                <h1 className="mb-4 text-5xl font-bold leading-tight">
                  Empowering Farmers with Smart Solutions
                </h1>
                <p className="mb-8 text-lg">
                  Mati'r Sathi helps farmers detect crop diseases, get smart
                  crop suggestions, and access agricultural support through our
                  AI-powered Bengali chatbot.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Button className="text-base bg-white text-[#2E7D32] hover:bg-white/90 cursor-pointer !rounded-button whitespace-nowrap">
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    className="text-base bg-transparent border-white text-white hover:bg-white/10 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="mr-2 fas fa-play-circle"></i>
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Smart Crop Suggestions Page */}
        {activeTab === "features" && (
          <section className="py-12 bg-[#F5F7FA]">
            <div className="container px-4 mx-auto max-w-7xl">
              <div className="max-w-3xl mx-auto mb-12 text-center">
                <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
                  Smart Farming
                </Badge>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Get Personalized Crop Suggestions
                </h2>
                <p className="text-lg text-gray-600">
                  Enter your location and soil details to receive AI-powered
                  crop recommendations
                </p>
              </div>

              {/* Input Section */}
              <div className="grid gap-8 mb-12 md:grid-cols-2">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#2E7D32]">
                      Location Details
                    </CardTitle>
                    <CardDescription>
                      Enter your location or use GPS
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={getLocation}
                        disabled={isGpsLoading}
                        className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        {isGpsLoading ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <i className="fas fa-location-dot"></i>
                        )}
                      </Button>
                    </div>
                    <div>
                      <select
                        value={soilType}
                        onChange={(e) => setSoilType(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                      >
                        <option value="">Select Soil Type</option>
                        {soilTypes.map((soil) => (
                          <option key={soil.value} value={soil.value}>
                            {soil.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Weather Forecast */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#2E7D32]">
                      Weather Forecast
                    </CardTitle>
                    <CardDescription>
                      5-day weather prediction for your area
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="text-center">
                          <p className="text-sm font-medium text-gray-600">
                            {day.day}
                          </p>
                          <i
                            className={`fas fa-${day.icon} text-2xl text-[#2E7D32] my-2`}
                          ></i>
                          <p className="text-sm font-bold">{day.temp}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <i className="mb-2 text-2xl text-[#2E7D32] fas fa-temperature-high"></i>
                        <p className="text-sm text-gray-600">Temperature</p>
                        <p className="font-bold">{weatherData.temperature}</p>
                      </div>
                      <div className="text-center">
                        <i className="mb-2 text-2xl text-[#2E7D32] fas fa-droplet"></i>
                        <p className="text-sm text-gray-600">Humidity</p>
                        <p className="font-bold">{weatherData.humidity}</p>
                      </div>
                      <div className="text-center">
                        <i className="mb-2 text-2xl text-[#2E7D32] fas fa-cloud-rain"></i>
                        <p className="text-sm text-gray-600">Rainfall</p>
                        <p className="font-bold">{weatherData.rainfall}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Crop Recommendations */}
              <div className="mb-12">
                <h3 className="mb-6 text-2xl font-bold text-center text-gray-900">
                  Recommended Crops
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {cropSuggestions.map((crop, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-[#2E7D32]">
                            {crop.name}
                          </CardTitle>
                          <Badge className="bg-[#E8F5E9] text-[#2E7D32]">
                            {crop.confidence}% Match
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="mb-2 font-semibold text-gray-900">
                            Cultivation Tips:
                          </h4>
                          <ul className="pl-5 space-y-1 text-sm text-gray-600 list-disc">
                            {crop.tips.map((tip, i) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold text-gray-900">
                            Best Suited For:
                          </h4>
                          <ul className="pl-5 space-y-1 text-sm text-gray-600 list-disc">
                            {crop.suitability.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap">
                          View Detailed Guide
                          <i className="ml-2 fas fa-arrow-right"></i>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <Button className="px-8 py-3 text-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap">
                  Get More Recommendations
                  <i className="ml-2 fas fa-seedling"></i>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
                Our Features
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Comprehensive Tools for Agricultural Success
              </h2>
              <p className="text-lg text-gray-600">
                Discover how Mati'r Sathi can transform your farming practices
                with our innovative features designed specifically for farmers.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Close-up%20of%20a%20farmer%20using%20smartphone%20to%20scan%20crop%20leaves%20for%20disease%20detection%2C%20showing%20technology%20in%20agriculture%2C%20with%20soft%20natural%20lighting%2C%20earthy%20tones%2C%20clean%20background%20highlighting%20the%20scanning%20process%2C%20professional%20photography%20style&width=400&height=200&seq=3&orientation=landscape"
                    alt="Crop Disease Detection"
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-[#2E7D32]">
                    <i className="mr-2 fas fa-search text-[#81C784]"></i>
                    Crop Disease Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Upload photos of your crops to instantly identify diseases
                    and get treatment recommendations tailored to your specific
                    conditions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Learn More
                    <i className="ml-2 fas fa-arrow-right"></i>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Aerial%20view%20of%20a%20diverse%20farm%20with%20different%20crop%20sections%20showing%20smart%20crop%20rotation%20and%20planning%2C%20vibrant%20colors%20of%20various%20crops%2C%20with%20soft%20natural%20lighting%2C%20earthy%20tones%2C%20clean%20background%20highlighting%20the%20farming%20patterns%2C%20professional%20photography%20style&width=400&height=200&seq=4&orientation=landscape"
                    alt="Smart Crop Suggestions"
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-[#2E7D32]">
                    <i className="mr-2 fas fa-seedling text-[#81C784]"></i>
                    Smart Crop Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive AI-powered recommendations on which crops to plant
                    based on your soil type, climate conditions, and market
                    demand.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Learn More
                    <i className="ml-2 fas fa-arrow-right"></i>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Farmer%20using%20smartphone%20with%20chatbot%20interface%20in%20Bengali%20language%20while%20standing%20in%20a%20field%2C%20showing%20technology%20bridging%20language%20barriers%20in%20agriculture%2C%20with%20soft%20natural%20lighting%2C%20earthy%20tones%2C%20clean%20background%20highlighting%20the%20mobile%20interface%2C%20professional%20photography%20style&width=400&height=200&seq=5&orientation=landscape"
                    alt="Bengali AI Chatbot"
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-[#2E7D32]">
                    <i className="mr-2 fas fa-comments text-[#81C784]"></i>
                    Bengali AI Chatbot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access agricultural knowledge in Bengali through our
                    conversational AI assistant, designed to understand local
                    farming terminology.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Learn More
                    <i className="ml-2 fas fa-arrow-right"></i>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        {/* How It Works */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
                How It Works
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Simple Steps to Transform Your Farming
              </h2>
              <p className="text-lg text-gray-600">
                Our platform is designed to be intuitive and easy to use, even
                for farmers with limited digital experience.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="relative p-6 text-center bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-[#2E7D32] rounded-full">
                  <i className="text-2xl fas fa-user-plus"></i>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Sign Up
                </h3>
                <p className="text-gray-600">
                  Create your free account with basic information about your
                  farm
                </p>
                <div className="absolute top-1/2 right-0 hidden transform translate-x-1/2 -translate-y-1/2 md:block">
                  <i className="text-3xl text-[#81C784] fas fa-chevron-right"></i>
                </div>
              </div>
              <div className="relative p-6 text-center bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-[#2E7D32] rounded-full">
                  <i className="text-2xl fas fa-camera"></i>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Upload Photos
                </h3>
                <p className="text-gray-600">
                  Take pictures of your crops or issues you're experiencing
                </p>
                <div className="absolute top-1/2 right-0 hidden transform translate-x-1/2 -translate-y-1/2 md:block">
                  <i className="text-3xl text-[#81C784] fas fa-chevron-right"></i>
                </div>
              </div>
              <div className="relative p-6 text-center bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-[#2E7D32] rounded-full">
                  <i className="text-2xl fas fa-robot"></i>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Get Analysis
                </h3>
                <p className="text-gray-600">
                  Our AI analyzes your data and provides personalized insights
                </p>
                <div className="absolute top-1/2 right-0 hidden transform translate-x-1/2 -translate-y-1/2 md:block">
                  <i className="text-3xl text-[#81C784] fas fa-chevron-right"></i>
                </div>
              </div>
              <div className="p-6 text-center bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-[#2E7D32] rounded-full">
                  <i className="text-2xl fas fa-check-circle"></i>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Implement Solutions
                </h3>
                <p className="text-gray-600">
                  Follow the recommendations to improve your crop yield
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Disease Detection Demo */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
                  Disease Detection
                </Badge>
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                  Identify Crop Issues in Seconds
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Our advanced AI can identify over 50 different crop diseases
                  with 95% accuracy. Simply upload a photo and get instant
                  results.
                </p>
                <ul className="mb-8 space-y-4">
                  {[
                    "Instant disease identification",
                    "Treatment recommendations",
                    "Preventive measures",
                    "Works offline for remote areas",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <i className="mr-3 text-[#2E7D32] fas fa-check-circle"></i>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap">
                  Try Disease Detection
                  <i className="ml-2 fas fa-arrow-right"></i>
                </Button>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-xl">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20detailed%20demonstration%20of%20a%20mobile%20app%20interface%20showing%20crop%20disease%20detection%20process%20with%20before%20and%20after%20images%2C%20AI%20analysis%20overlay%2C%20with%20soft%20natural%20lighting%2C%20clean%20interface%20design%20with%20green%20accents%2C%20professional%20UI%20mockup%20style%2C%20showing%20technology%20in%20agriculture&width=600&height=400&seq=6&orientation=landscape"
                  alt="Disease Detection Demo"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
                Success Stories
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Trusted by Farmers Across the Region
              </h2>
              <p className="text-lg text-gray-600">
                Hear from farmers who have transformed their agricultural
                practices with Mati'r Sathi.
              </p>
            </div>
            <Swiper
              modules={swiperModules}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-12"
            >
              {[
                {
                  name: "Rahul Das",
                  location: "West Bengal, India",
                  image:
                    "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20middle-aged%20South%20Asian%20male%20farmer%20with%20weathered%20face%20and%20kind%20eyes%2C%20wearing%20traditional%20clothing%2C%20natural%20lighting%2C%20earthy%20background%2C%20professional%20headshot%20style%2C%20authentic%20expression&width=100&height=100&seq=7&orientation=squarish",
                  quote:
                    "Mati'r Sathi helped me identify a fungal infection in my rice paddy before it spread. The treatment recommendations saved my entire harvest!",
                },
                {
                  name: "Fatima Begum",
                  location: "Dhaka, Bangladesh",
                  image:
                    "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20middle-aged%20South%20Asian%20female%20farmer%20with%20confident%20expression%2C%20wearing%20colorful%20traditional%20clothing%20with%20headscarf%2C%20natural%20lighting%2C%20earthy%20background%2C%20professional%20headshot%20style%2C%20authentic%20expression&width=100&height=100&seq=8&orientation=squarish",
                  quote:
                    "The crop suggestion feature recommended I try growing mustard alongside my usual crops. This diversification has increased my income by 30%.",
                },
                {
                  name: "Mohammad Ali",
                  location: "Chittagong, Bangladesh",
                  image:
                    "https://readdy.ai/api/search-image?query=Portrait%20of%20an%20elderly%20South%20Asian%20male%20farmer%20with%20white%20beard%20and%20wise%20expression%2C%20wearing%20traditional%20cap%2C%20natural%20lighting%2C%20earthy%20background%2C%20professional%20headshot%20style%2C%20authentic%20expression&width=100&height=100&seq=9&orientation=squarish",
                  quote:
                    "I was skeptical about technology, but the Bengali chatbot made it easy to get answers to my farming questions without language barriers.",
                },
                {
                  name: "Priya Sharma",
                  location: "Kolkata, India",
                  image:
                    "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20young%20South%20Asian%20female%20farmer%20with%20determined%20expression%2C%20wearing%20colorful%20traditional%20clothing%2C%20natural%20lighting%2C%20earthy%20background%2C%20professional%20headshot%20style%2C%20authentic%20expression&width=100&height=100&seq=10&orientation=squarish",
                  quote:
                    "As a new farmer, Mati'r Sathi has been like having an experienced mentor. The soil analysis feature helped me understand what my land needed.",
                },
              ].map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <Card className="h-full border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6 space-x-4">
                        <Avatar className="w-12 h-12 border-2 border-[#2E7D32]">
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback className="bg-[#E8F5E9] text-[#2E7D32]">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4 text-yellow-500">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                      </div>
                      <p className="italic text-gray-700">
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* Chatbot Preview */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <div className="p-4 bg-white rounded-lg shadow-xl">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20detailed%20mockup%20of%20a%20mobile%20chatbot%20interface%20in%20Bengali%20language%20showing%20conversation%20about%20agricultural%20topics%2C%20with%20clean%20modern%20UI%20design%20with%20green%20accents%2C%20showing%20both%20text%20bubbles%20and%20suggestion%20buttons%2C%20professional%20UI%20mockup%20style&width=600&height=500&seq=11&orientation=portrait"
                    alt="Bengali AI Chatbot"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
                  AI Chatbot
                </Badge>
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                  Agricultural Knowledge in Your Language
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Our Bengali AI chatbot understands agricultural terminology
                  and local farming practices, making it easy to get the
                  information you need.
                </p>
                <ul className="mb-8 space-y-4">
                  {[
                    "Natural language understanding in Bengali",
                    "24/7 availability for questions",
                    "Voice input option for easier use",
                    "Connects to human experts when needed",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <i className="mr-3 text-[#2E7D32] fas fa-check-circle"></i>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap">
                  Try the Chatbot
                  <i className="ml-2 fas fa-comments"></i>
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 text-white bg-[#2E7D32]">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Ready to Transform Your Farming?
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Join thousands of farmers who are already using Mati'r Sathi to
                improve their yields and increase their income.
              </p>
              <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button className="text-base bg-white text-[#2E7D32] hover:bg-white/90 cursor-pointer !rounded-button whitespace-nowrap">
                  Get Started for Free
                </Button>
                <Button
                  variant="outline"
                  className="text-base bg-transparent border-white text-white hover:bg-white/10 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
                FAQ
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Find answers to common questions about Mati'r Sathi and how it
                can help your farming.
              </p>
            </div>
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {[
                {
                  question: "Do I need internet access to use all features?",
                  answer:
                    "While internet connection is required for initial setup and updates, the disease detection feature can work offline once the model is downloaded to your device. The chatbot and crop suggestions require internet connectivity.",
                },
                {
                  question:
                    "Is Mati'r Sathi available in languages other than Bengali?",
                  answer:
                    "Currently, Mati'r Sathi is available in Bengali and English. We're working on adding more regional languages to better serve farmers across South Asia.",
                },
                {
                  question: "How accurate is the disease detection?",
                  answer:
                    "Our disease detection has a 95% accuracy rate for the 50+ most common crop diseases in the region. The system is continuously learning and improving based on user feedback.",
                },
                {
                  question: "Is there a cost to use Mati'r Sathi?",
                  answer:
                    "Mati'r Sathi offers a free basic plan with limited features. Premium features like advanced soil analysis and personalized crop planning are available through affordable subscription plans.",
                },
                {
                  question: "Can I use Mati'r Sathi on basic smartphones?",
                  answer:
                    "Yes, Mati'r Sathi is optimized to work on entry-level smartphones with minimal storage and processing power. We also offer SMS-based services for farmers without smartphones.",
                },
              ].map((item, index) => (
                <div key={index} className="py-6">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h3 className="text-xl font-medium text-gray-900">
                        {item.question}
                      </h3>
                      <span className="flex items-center justify-center w-8 h-8 ml-2 text-[#2E7D32] bg-[#E8F5E9] rounded-full group-open:rotate-180 transition-transform">
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    </summary>
                    <p className="mt-4 text-gray-600">{item.answer}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="py-12 text-white bg-[#1B5E20]">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid gap-8 mb-8 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-4 space-x-2">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20minimalist%20logo%20for%20Matir%20Sathi%20agricultural%20platform%20with%20a%20simple%20leaf%20or%20plant%20sprout%20icon%20in%20white%20color%20on%20transparent%20background%2C%20modern%20clean%20design%20suitable%20for%20an%20app%20icon%2C%20professional&width=40&height=40&seq=12&orientation=squarish"
                  alt="Mati'r Sathi Logo"
                  className="w-8 h-8"
                />
                <h3 className="text-xl font-bold">Mati'r Sathi</h3>
              </div>
              <p className="mb-4 text-white/80">
                Empowering farmers with technology to improve agricultural
                practices and increase crop yields.
              </p>
              <div className="flex space-x-4">
                {[
                  "fa-facebook-f",
                  "fa-twitter",
                  "fa-instagram",
                  "fa-youtube",
                ].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-white/10 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <i className={`fab ${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Features</h4>
              <ul className="space-y-2">
                {[
                  "Disease Detection",
                  "Crop Suggestions",
                  "AI Chatbot",
                  "Weather Forecasts",
                  "Market Prices",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={
                        item === "AI Chatbot"
                          ? "https://readdy.ai/home/81acdc8d-cd37-4661-bff2-6bd285f940af/747e2064-3e20-4bde-9556-1dd748a6b04e"
                          : "#"
                      }
                      data-readdy={item === "AI Chatbot" ? "true" : undefined}
                      className="text-white/80 hover:text-white cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Resources</h4>
              <ul className="space-y-2">
                {[
                  "Blog",
                  "Knowledge Base",
                  "Community Forum",
                  "Video Tutorials",
                  "Success Stories",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={
                        item === "AI Chatbot"
                          ? "https://readdy.ai/home/81acdc8d-cd37-4661-bff2-6bd285f940af/747e2064-3e20-4bde-9556-1dd748a6b04e"
                          : "#"
                      }
                      data-readdy={item === "AI Chatbot" ? "true" : undefined}
                      className="text-white/80 hover:text-white cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="mt-1 mr-3 fas fa-map-marker-alt"></i>
                  <span className="text-white/80">
                    123 Agri Tech Park, Dhaka, Bangladesh
                  </span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 fas fa-phone"></i>
                  <span className="text-white/80">+880 1234 567890</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 fas fa-envelope"></i>
                  <span className="text-white/80">info@matirsathi.com</span>
                </li>
              </ul>
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
          <Separator className="mb-8 bg-white/20" />
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-white/70">
              © 2025 Mati'r Sathi. All rights reserved.
            </p>
            <div className="flex flex-wrap space-x-4 text-sm text-white/70">
              <a href="#" className="hover:text-white cursor-pointer">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white cursor-pointer">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white cursor-pointer">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
