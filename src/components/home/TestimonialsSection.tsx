import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Testimonial } from "@/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const testimonials: Testimonial[] = [
  {
    name: "Rahul Das",
    location: "West Bengal, India",
    image: "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20middle-aged%20South%20Asian%20male%20farmer%20with%20weathered%20face%20and%20kind%20eyes%2C%20wearing%20traditional%20clothing%2C%20natural%20lighting%2C%20earthy%20background%2C%20professional%20headshot%20style%2C%20authentic%20expression&width=100&height=100&seq=7&orientation=squarish",
    quote: "Mati'r Sathi helped me identify a fungal infection in my rice paddy before it spread. The treatment recommendations saved my entire harvest!",
  },
  {
    name: "Fatima Begum",
    location: "Dhaka, Bangladesh",
    image: "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20middle-aged%20South%20Asian%20female%20farmer%20with%20confident%20expression%2C%20wearing%20colorful%20traditional%20clothing%20with%20headscarf%2C%20natural%20lighting%2C%20earthy%20background%2C%20professional%20headshot%20style%2C%20authentic%20expression&width=100&height=100&seq=8&orientation=squarish",
    quote: "The crop suggestion feature recommended I try growing mustard alongside my usual crops. This diversification has increased my income by 30%.",
  },
  {
    name: "Mohammad Ali",
    location: "Chittagong, Bangladesh",
    image: "https://readdy.ai/api/search-image?query=Portrait%20of%20an%20elderly%20South%20Asian%20male%20farmer%20with%20white%20beard%20and%20wise%20expression%2C%20wearing%20traditional%20cap%2C%20natural%20lighting%2C%20earthy%20background%2C%20professional%20headshot%20style%2C%20authentic%20expression&width=100&height=100&seq=9&orientation=squarish",
    quote: "I was skeptical about technology, but the Bengali chatbot made it easy to get answers to my farming questions without language barriers.",
  },
  {
    name: "Priya Sharma",
    location: "Kolkata, India",
    image: "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20young%20South%20Asian%20female%20farmer%20with%20determined%20expression%2C%20wearing%20colorful%20traditional%20clothing%2C%20natural%20lighting%2C%20earthy%20background%2C%20professional%20headshot%20style%2C%20authentic%20expression&width=100&height=100&seq=10&orientation=squarish",
    quote: "As a new farmer, Mati'r Sathi has been like having an experienced mentor. The soil analysis feature helped me understand what my land needed.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#F5F7FA]">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
            Success Stories
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Trusted by Farmers Across the Region
          </h2>
          <p className="text-lg text-gray-600">
            Hear from farmers who have transformed their agricultural practices
            with Mati'r Sathi.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Card className="h-full border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6 space-x-4">
                    <Avatar className="w-12 h-12 border-2 border-[#2E7D32]">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-[#E8F5E9] text-[#2E7D32]">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 text-yellow-500">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                  </div>
                  <p className="italic text-gray-700">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;