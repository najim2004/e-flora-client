import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSeedling,
  faComments,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { JSX } from "react";
import Link from "next/link";

interface Feature {
  title: string;
  icon: typeof faSearch | typeof faSeedling | typeof faComments;
  iconColor: string;
  description: string;
  image: string;
  href: string;
}

const features: Feature[] = [
  {
    title: "Crop Disease Detection",
    icon: faSearch,
    iconColor: "#81C784",
    description:
      "Upload photos of your crops to instantly identify diseases and get treatment recommendations tailored to your specific conditions.",
    image: "/f-disease-detection.jpg",
    href: "/disease-detection",
  },
  {
    title: "Smart Crop Suggestions",
    icon: faSeedling,
    iconColor: "#81C784",
    description:
      "Receive AI-powered recommendations on which crops to plant based on your soil type, climate conditions, and market demand.",
    image: "/f-crop-suggestion.jpg",
    href: "/crop-suggestions",
  },
  {
    title: "Bengali AI Chatbot",
    icon: faComments,
    iconColor: "#81C784",
    description:
      "Access agricultural knowledge in Bengali through our conversational AI assistant, designed to understand local farming terminology.",
    image: "/f-chat-bot.jpg",
    href: "/chat-bot",
  },
];

export const FeaturesSection = (): JSX.Element => {
  return (
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
            Discover how Mati&apos;r Sathi can transform your farming practices
            with our innovative features designed specifically for farmers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-[#2E7D32] flex items-center">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="mr-2"
                    style={{ color: feature.iconColor }}
                  />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <Link href={feature.href || "/"} className="size-fit">
                    Try Now
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
