import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CheckCircle2, MessageCircle } from "lucide-react";

function ChatbotPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="p-4 bg-white rounded-lg shadow-xl">
              <img
                src="https://readdy.ai/api/search-image?query=A%20detailed%20mockup%20of%20a%20mobile%20chatbot%20interface%20in%20Bengali%20language%20showing%20conversation%20about%20agricultural%20topics%2C%20with%20clean%20modern%20UI%20design%20with%20green%20accents%2C%20showing%20both%20text%20bubbles%20and%20suggestion%20buttons%2C%20professional%20UI%20mockup%20style&width=600&height=500&seq=11&orientation=portrait"
                alt="Bengali AI Chatbot"
                className="w-full rounded-lg"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
              AI Chatbot
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Agricultural Knowledge in Your Language
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Our Bengali AI chatbot understands agricultural terminology and
              local farming practices, making it easy to get the information you
              need.
            </p>
            <ul className="mb-8 space-y-4">
              {[
                "Natural language understanding in Bengali",
                "24/7 availability for questions",
                "Voice input option for easier use",
                "Connects to human experts when needed",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-[#2E7D32]" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap">
              Try the Chatbot
              <MessageCircle className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatbotPreview;
