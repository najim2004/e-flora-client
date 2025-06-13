import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10" />
      <div className="relative w-full h-[600px]">
        <Image
          src="/hero.jpg"
          alt="Farmers in field"
          fill
          priority
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-xl text-white">
            <Badge className="mb-4 bg-white text-primary hover:bg-white/90 cursor-pointer whitespace-nowrap">
              Agriculture Support Platform
            </Badge>
            <h1 className="mb-4 text-5xl font-bold leading-tight">
              Empowering Farmers with Smart Solutions
            </h1>
            <p className="mb-8 text-lg">
              Mati&apos;r Sathi helps farmers detect crop diseases, get smart
              crop suggestions, and access agricultural support through our
              AI-powered Bengali chatbot.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="text-base bg-white text-primary hover:bg-white/90 cursor-pointer whitespace-nowrap rounded-[3px]"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base bg-transparent border-white text-white hover:text-white hover:bg-white/10 cursor-pointer whitespace-nowrap rounded-[3px]"
              >
                <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
