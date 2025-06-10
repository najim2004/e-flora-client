import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, AlertCircle, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DiseaseDetectionPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-green-50 flex flex-col justify-center">
      <div className="max-w-7xl w-full mx-auto px-4 py-8">

        <Card className="border-green-100 shadow-sm max-w-2xl mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-green-800">Upload Image</CardTitle>
            <CardDescription className="text-green-700">
              Please upload a clear, well-lit photo of the affected plant part.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-green-200 rounded-lg p-8 text-center bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-green-700 mb-2">
                Drag and drop your image here or click to browse
              </p>
              <p className="text-sm text-green-600">
                Supported formats: JPG, PNG (Max size: 5MB)
              </p>
              <input
                type="file"
                className="hidden"
                accept="image/jpeg, image/png"
              />
              <Button className="mt-6 bg-green-600 hover:bg-green-700">
                Select Image
              </Button>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium text-green-700">
                Additional Description (Optional)
              </label>
              <Textarea
                placeholder="Describe any additional details about the plant condition..."
                className="border-green-200 focus:border-green-500 resize-none"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-green-800 mb-2">
                Guidelines for best results:
              </h3>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Take close-up photos of the affected area</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ensure good lighting (natural daylight is best)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    Include both healthy and diseased parts for comparison
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Avoid shadows and blurry images</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
