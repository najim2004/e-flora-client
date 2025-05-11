import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;