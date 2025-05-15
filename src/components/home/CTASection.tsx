import React from "react";
import { Button } from "../ui/button";

function CTASection() {
  return (
    <section className="py-20 text-white bg-[#2E7D32]">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Farming?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Join thousands of farmers who are already using Mati&#39;r Sathi to
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
  );
}

export default CTASection;
