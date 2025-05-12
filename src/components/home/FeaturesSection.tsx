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

interface Feature {
  title: string;
  icon: typeof faSearch | typeof faSeedling | typeof faComments;
  iconColor: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    title: "Crop Disease Detection",
    icon: faSearch,
    iconColor: "#81C784",
    description:
      "Upload photos of your crops to instantly identify diseases and get treatment recommendations tailored to your specific conditions.",
    image:
      "https://readdy.ai/api/search-image?query=Close-up%20of%20a%20farmer%20using%20smartphone%20to%20scan%20crop%20leaves%20for%20disease%20detection%2C%20showing%20technology%20in%20agriculture%2C%20with%20soft%20natural%20lighting%2C%20earthy%20tones%2C%20clean%20background%20highlighting%20the%20scanning%20process%2C%20professional%20photography%20style&width=400&height=200&seq=3&orientation=landscape",
  },
  {
    title: "Smart Crop Suggestions",
    icon: faSeedling,
    iconColor: "#81C784",
    description:
      "Receive AI-powered recommendations on which crops to plant based on your soil type, climate conditions, and market demand.",
    image:
      "https://readdy.ai/api/search-image?query=Aerial%20view%20of%20a%20diverse%20farm%20with%20different%20crop%20sections%20showing%20smart%20crop%20rotation%20and%20planning%2C%20vibrant%20colors%20of%20various%20crops%2C%20with%20soft%20natural%20lighting%2C%20earthy%20tones%2C%20clean%20background%20highlighting%20the%20farming%20patterns%2C%20professional%20photography%20style&width=400&height=200&seq=4&orientation=landscape",
  },
  {
    title: "Bengali AI Chatbot",
    icon: faComments,
    iconColor: "#81C784",
    description:
      "Access agricultural knowledge in Bengali through our conversational AI assistant, designed to understand local farming terminology.",
    image:
      "https://readdy.ai/api/search-image?query=Farmer%20using%20smartphone%20with%20chatbot%20interface%20in%20Bengali%20language%20while%20standing%20in%20a%20field%2C%20showing%20technology%20bridging%20language%20barriers%20in%20agriculture%2C%20with%20soft%20natural%20lighting%2C%20earthy%20tones%2C%20clean%20background%20highlighting%20the%20mobile%20interface%2C%20professional%20photography%20style&width=400&height=200&seq=5&orientation=landscape",
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
                  Learn More
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
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
