import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";

function DiseaseDetectionDemo() {
  return (
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
              Our advanced AI can identify over 50 different crop diseases with
              95% accuracy. Simply upload a photo and get instant results.
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
          <Image
            src="/demo-disease-detection.jpg"
            alt="Disease Detection Demo"
            width={600}
            height={400}
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default DiseaseDetectionDemo;
