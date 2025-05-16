import React from "react";
import { Badge } from "../ui/badge";
import {
  UserPlus,
  Camera,
  Brain,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

function HowItWorks() {
  return (
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
            Our platform is designed to be intuitive and easy to use, even for
            farmers with limited digital experience.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="relative p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-[#2E7D32] rounded-full">
              <UserPlus className="w-8 h-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Sign Up
            </h3>
            <p className="text-gray-600">
              Create your free account with basic information about your farm
            </p>
            <div className="absolute top-1/2 right-0 hidden transform translate-x-1/2 -translate-y-1/2 md:block">
              <ChevronRight className="w-8 h-8 text-[#81C784]" />
            </div>
          </div>
          <div className="relative p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-[#2E7D32] rounded-full">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Upload Photos
            </h3>
            <p className="text-gray-600">
              Take pictures of your crops or issues you&#39;re experiencing
            </p>
            <div className="absolute top-1/2 right-0 hidden transform translate-x-1/2 -translate-y-1/2 md:block">
              <ChevronRight className="w-8 h-8 text-[#81C784]" />
            </div>
          </div>
          <div className="relative p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-[#2E7D32] rounded-full">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Get Analysis
            </h3>
            <p className="text-gray-600">
              Our AI analyzes your data and provides personalized insights
            </p>
            <div className="absolute top-1/2 right-0 hidden transform translate-x-1/2 -translate-y-1/2 md:block">
              <ChevronRight className="w-8 h-8 text-[#81C784]" />
            </div>
          </div>
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-[#2E7D32] rounded-full">
              <CheckCircle className="w-8 h-8" />
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
  );
}

export default HowItWorks;
