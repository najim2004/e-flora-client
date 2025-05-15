import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
  );
}

export default DiseaseDetectionDemo;
