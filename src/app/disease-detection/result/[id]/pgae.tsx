"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Check,
  Download,
  Share2,
  Printer,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DiseaseDetectionResultPage({
  params,
}: {
  params: { resultId: string };
}) {
  // In a real application, you would fetch the result data based on params.resultId
  // For this example, we'll use hardcoded data.
  const result = {
    id: params.resultId,
    detectedDisease: "Rice Blast (Magnaporthe oryzae)",
    confidence: 85,
    uploadedImage: "/placeholder.svg?height=400&width=600", // Placeholder for the uploaded image
    recommendations: [
      "Apply fungicide containing tricyclazole or isoprothiolane",
      "Ensure proper drainage in the field",
      "Avoid excessive nitrogen fertilization",
      "Remove and destroy infected plant debris",
    ],
    severity: "Moderate",
    dateDetected: "2023-05-15",
    location: "North Field, Dhaka",
    notes:
      "Early detection is crucial for effective management. Monitor surrounding plants closely.",
  };

  const [saved, setSaved] = useState(false);

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/disease-detection"
          className="inline-flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => setSaved(!saved)}
          >
            {saved ? (
              <Bookmark className="h-4 w-4 mr-2 fill-green-600" />
            ) : (
              <Bookmark className="h-4 w-4 mr-2" />
            )}
            {saved ? "Saved" : "Save"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
        Disease Detection Result
      </h1>
      <p className="text-lg text-green-700 mb-8">
        Here are the detailed results and recommendations for your uploaded crop
        image.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800">Detected Disease</CardTitle>
            <CardDescription className="text-green-700">
              Analysis of your uploaded image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <img
                src={result.uploadedImage || "/placeholder.svg"}
                alt="Uploaded crop for analysis"
                className="w-full h-auto rounded-lg object-cover mb-4 border border-green-100"
              />
              <h3 className="text-xl font-bold text-green-800 mb-2">
                {result.detectedDisease}
              </h3>
              <div className="flex items-center">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-green-700 font-medium">
                  {result.confidence}% confidence
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-700">
                  Severity: {result.severity}
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  Detected On: {result.dateDetected}
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  Location: {result.location}
                </Badge>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-green-800 mb-2">
                Additional Notes:
              </h3>
              <p className="text-green-700 text-sm">{result.notes}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800">
              Treatment Recommendations
            </CardTitle>
            <CardDescription className="text-green-700">
              Steps to manage and treat the detected disease
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-green-700">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Download Full Report
              </Button>
              <Link href="/disease-detection">
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Upload Another Image
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
