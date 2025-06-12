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
  Bookmark,
  Check,
  Download,
  Printer,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DiseaseDetectionResult } from "@/types/diseaseDetection";
import { cookies } from "next/headers";
import ImagePreview from "@/components/ImagePreview";
import React from "react";

const fetchDetails = async (
  id: string
): Promise<DiseaseDetectionResult | undefined> => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/crops/disease-detection/result/${id}`,
      {
        headers: {
          Cookie: (await cookies()).toString() || "", // client cookie pass kora holo
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      console.error("Failed to fetch details:", res.status, res.statusText);
      return undefined;
    }
    const data = await res.json();
    if (!data?.success || !data?.data) {
      console.warn("Data not successful or data missing:", data);
      return undefined;
    }
    return data as DiseaseDetectionResult;
  } catch (error) {
    console.error("Error fetching details:", error);
    return undefined;
  }
};

export default async function DiseaseDetectionResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = await fetchDetails(id);
  console.log(result);

  if (!result?.data) {
    return (
      <main className="flex-1 container mx-auto px-4 py-8">
        <p>Loading...</p>
      </main>
    );
  }

  const { image, detectedDisease } = result.data;
  const disease = detectedDisease.id;

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
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save
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
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div className="md:col-span-1">
          <Card className="border-green-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-800">Detected Disease</CardTitle>
              <CardDescription className="text-green-700">
                Analysis of your uploaded image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <ImagePreview imageUrl={image.url || "/placeholder.svg"} />
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {disease.diseaseName}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-700">
                    Crop: {disease.cropName}
                  </Badge>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-green-800 mb-2">Description:</h3>
                <p className="text-green-700 text-sm">{disease.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
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
                {disease.treatment.map((rec, index) => (
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
      </div>
    </main>
  );
}
