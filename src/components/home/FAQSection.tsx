import { Badge } from "@/components/ui/badge";
import { FAQ } from "@/types";

const faqs: FAQ[] = [
  {
    question: "Do I need internet access to use all features?",
    answer: "While internet connection is required for initial setup and updates, the disease detection feature can work offline once the model is downloaded to your device. The chatbot and crop suggestions require internet connectivity.",
  },
  {
    question: "Is Mati'r Sathi available in languages other than Bengali?",
    answer: "Currently, Mati'r Sathi is available in Bengali and English. We're working on adding more regional languages to better serve farmers across South Asia.",
  },
  {
    question: "How accurate is the disease detection?",
    answer: "Our disease detection has a 95% accuracy rate for the 50+ most common crop diseases in the region. The system is continuously learning and improving based on user feedback.",
  },
  {
    question: "Is there a cost to use Mati'r Sathi?",
    answer: "Mati'r Sathi offers a free basic plan with limited features. Premium features like advanced soil analysis and personalized crop planning are available through affordable subscription plans.",
  },
  {
    question: "Can I use Mati'r Sathi on basic smartphones?",
    answer: "Yes, Mati'r Sathi is optimized to work on entry-level smartphones with minimal storage and processing power. We also offer SMS-based services for farmers without smartphones.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-[#F5F7FA]">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
            FAQ
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Mati'r Sathi and how it can help
            your farming.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((item, index) => (
            <div key={index} className="py-6">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-medium text-gray-900">
                    {item.question}
                  </h3>
                  <span className="flex items-center justify-center w-8 h-8 ml-2 text-[#2E7D32] bg-[#E8F5E9] rounded-full group-open:rotate-180 transition-transform">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">{item.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;