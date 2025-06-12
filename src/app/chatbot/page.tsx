import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, User, Bot, Mic, ImageIcon, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ChatbotPage() {
  return (
    <div className="md:min-h-[calc(100vh-64px)] h-[calc(100vh-132px)] md:h-auto bg-green-50 flex flex-col overflow-hidden">
      <div className="max-w-7xl w-full mx-auto md:px-4 md:py-6 flex-1 flex flex-col">
        <Card className="md:border-green-100 md:shadow-sm flex-1 flex flex-col overflow-hidden rounded-none md:rounded-md py-0 gap-0">
          <div className="bg-green-600 text-white p-4 flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            <div>
              <h2 className="font-medium">মাটি&#39;র সাথী AI Assistant</h2>
              <p className="text-xs text-green-100">Online and ready to help</p>
            </div>
          </div>
          <CardContent className="flex-1p-0 max-h-[calc(100vh-297px)] md:h-auto overflow-hidden p-0">
            <div className="space-y-6 overflow-y-auto h-full p-6">
              {/* Welcome message */}
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <Bot className="h-5 w-5 text-green-600" />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
                  <p className="text-primary">
                    স্বাগতম! আমি মাটি&#39;র সাথী AI সহকারী। আপনার কৃষি সম্পর্কিত
                    যেকোনো প্রশ্ন জিজ্ঞাসা করুন।
                  </p>
                  <p className="text-primary mt-2">
                    Welcome! I am Mati&#39;r Sathi AI Assistant. Ask me any
                    questions about farming.
                  </p>
                </div>
              </div>

              {/* User message */}
              <div className="flex items-start justify-end">
                <div className="bg-green-600 text-white rounded-lg rounded-tr-none p-3 shadow-sm max-w-[80%]">
                  <p>আমার ধান গাছে কালো দাগ দেখা যাচ্ছে। এটা কি রোগ?</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center ml-3 flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Bot response */}
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <Bot className="h-5 w-5 text-green-600" />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
                  <p className="text-primary">
                    আপনার বর্ণনা অনুযায়ী, এটি ব্লাস্ট রোগ হতে পারে। এটি একটি
                    ছত্রাকজনিত রোগ যা ধান গাছে কালো দাগ তৈরি করে।
                  </p>
                  <p className="text-primary mt-2">চিকিৎসার জন্য:</p>
                  <ul className="list-disc pl-5 text-primary mt-1">
                    <li>
                      ট্রাইসাইক্লাজোল বা আইসোপ্রোথিওলেন যুক্ত ছত্রাকনাশক প্রয়োগ
                      করুন
                    </li>
                    <li>জমিতে সঠিক জল নিষ্কাশন নিশ্চিত করুন</li>
                    <li>অতিরিক্ত নাইট্রোজেন সার ব্যবহার এড়িয়ে চলুন</li>
                  </ul>
                  <p className="text-primary mt-2">
                    আপনি কি আক্রান্ত গাছের ছবি আপলোড করতে পারেন? তাহলে আমি আরও
                    নির্ভুলভাবে রোগ নির্ণয় করতে পারব।
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <Bot className="h-5 w-5 text-green-600" />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
                  <p className="text-primary">
                    স্বাগতম! আমি মাটি&#39;র সাথী AI সহকারী। আপনার কৃষি সম্পর্কিত
                    যেকোনো প্রশ্ন জিজ্ঞাসা করুন।
                  </p>
                  <p className="text-primary mt-2">
                    Welcome! I am Mati&#39;r Sathi AI Assistant. Ask me any
                    questions about farming.
                  </p>
                </div>
              </div>

              {/* User message */}
              <div className="flex items-start justify-end">
                <div className="bg-green-600 text-white rounded-lg rounded-tr-none p-3 shadow-sm max-w-[80%]">
                  <p>আমার ধান গাছে কালো দাগ দেখা যাচ্ছে। এটা কি রোগ?</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center ml-3 flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Bot response */}
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <Bot className="h-5 w-5 text-green-600" />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
                  <p className="text-primary">
                    আপনার বর্ণনা অনুযায়ী, এটি ব্লাস্ট রোগ হতে পারে। এটি একটি
                    ছত্রাকজনিত রোগ যা ধান গাছে কালো দাগ তৈরি করে।
                  </p>
                  <p className="text-primary mt-2">চিকিৎসার জন্য:</p>
                  <ul className="list-disc pl-5 text-primary mt-1">
                    <li>
                      ট্রাইসাইক্লাজোল বা আইসোপ্রোথিওলেন যুক্ত ছত্রাকনাশক প্রয়োগ
                      করুন
                    </li>
                    <li>জমিতে সঠিক জল নিষ্কাশন নিশ্চিত করুন</li>
                    <li>অতিরিক্ত নাইট্রোজেন সার ব্যবহার এড়িয়ে চলুন</li>
                  </ul>
                  <p className="text-primary mt-2">
                    আপনি কি আক্রান্ত গাছের ছবি আপলোড করতে পারেন? তাহলে আমি আরও
                    নির্ভুলভাবে রোগ নির্ণয় করতে পারব।
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <div className="border-t border-green-100 p-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-green-200 text-green-600 hover:bg-green-50"
              >
                <Paperclip className="h-5 w-5" />
              </Button>{" "}
              <Input
                placeholder="আপনার প্রশ্ন লিখুন (Type your question)..."
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-green-200 text-green-600 hover:bg-green-50"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button className="bg-green-600 hover:bg-primary/80 rounded-full px-4">
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-green-600 text-center">
              You can type in Bengali or English
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
