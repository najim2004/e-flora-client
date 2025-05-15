import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import DiseaseDetectionDemo from "@/components/home/DiseaseDetectionDemo";
import ChatbotPreview from "@/components/home/ChatbotPreview";
import CTASection from "@/components/home/CTASection";
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* How It Works */}
      <HowItWorks />
      {/* Disease Detection Demo */}
      <DiseaseDetectionDemo />
      {/* Testimonials */}
      <TestimonialsSection />
      {/* Chatbot Preview */}
      <ChatbotPreview />
      {/* CTA Section */}
      <CTASection />
      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};
export default Home;
