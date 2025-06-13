import React from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CheckCircle2, MessageCircle } from "lucide-react";

function ChatbotPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <Image
              src="/chat-bot-preview.jpg"
              alt="Bengali AI Chatbot"
              width={600}
              height={500}
              className="w-full rounded-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <Badge className="mb-4 bg-[#E8F5E9] text-primary/80 hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
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
                  <CheckCircle2 className="w-5 h-5 mr-3 text-primary/80" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="bg-primary/80 hover:bg-primary text-white cursor-pointer !rounded-button whitespace-nowrap">
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
