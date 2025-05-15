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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Crop Disease Detection
        </h1>
        <p className="text-lg text-green-700 mb-8">
          Upload a clear image of your crop to identify diseases and get
          treatment recommendations.
        </p> */}

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-green-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-800">Upload Image</CardTitle>
              <CardDescription className="text-green-700">
                Please upload a clear, well-lit photo of the affected plant
                part.
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

          <Card className="border-green-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-800">Analysis Results</CardTitle>
              <CardDescription className="text-green-700">
                Upload an image to see the disease detection results here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                <AlertCircle className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-green-700">No image analyzed yet</p>
                <p className="text-sm text-green-600 mt-2">
                  Upload an image to detect crop diseases and get treatment
                  recommendations
                </p>
              </div>

              {/* This section would be shown after analysis */}
              <div className="hidden">
                <div className="mt-6">
                  <h3 className="font-medium text-green-800 mb-2">
                    Detected Disease:
                  </h3>
                  <p className="text-green-700 font-bold">
                    Rice Blast (Magnaporthe oryzae)
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <span className="ml-2 text-green-700 font-medium">
                      85% confidence
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-green-800 mb-2">
                    Treatment Recommendations:
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Apply fungicide containing tricyclazole or
                        isoprothiolane
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Ensure proper drainage in the field</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Avoid excessive nitrogen fertilization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Remove and destroy infected plant debris</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Download Report
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Upload Another Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
