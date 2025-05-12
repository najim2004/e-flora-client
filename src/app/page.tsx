"use client";
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
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CropSuggestionsSection from "@/components/home/CropSuggestionsSection";
import HeroSection from "@/components/home/HeroSection";
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
      <main>
        {/* Hero Section */}
        <HeroSection />
        {/* Crop Recommendations */}
        <CropSuggestionsSection
          location={location}
          soilType={soilType}
          onLocationChange={setLocation}
          cropSuggestions={cropSuggestions}
          isGpsLoading={isGpsLoading}
          onGetLocation={getLocation}
          onSoilTypeChange={setSoilType}
          soilTypes={soilTypes}
          weatherData={weatherData}
        />

        {/* Features Section */}
        <FeaturesSection />
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
        <TestimonialsSection />
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
        <FAQSection />
      </main>
    </div>
  );
};
export default Home;
