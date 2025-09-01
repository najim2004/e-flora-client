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
import { DiseaseDetectionResult } from "@/types/diseaseDetection";
import { cookies } from "next/headers";
import ImagePreview from "@/components/common/ImagePreview";
import React from "react";
import { notFound } from "next/navigation";

const fetchDetails = async (
  id: string
): Promise<DiseaseDetectionResult | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/crops/disease-detection/result/${id}`,
      {
        cache: "force-cache",
        headers: {
          Cookie: (await cookies()).toString() || "", // client cookie pass kora holo
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      console.error("Failed to fetch details:", res.status, res.statusText);
      return notFound();
    }
    const data = await res.json();
    if (!data?.success || !data?.data) {
      console.warn("Data not successful or data missing:", data);
      return notFound();
    }
    return data as DiseaseDetectionResult;
  } catch (error) {
    console.error("Error fetching details:", error);
    return notFound();
  }
};

export default async function DiseaseDetectionResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = (await fetchDetails(id)) as DiseaseDetectionResult;
  if (!result?.data) {
    return (
      <main className="flex-1 container mx-auto px-4 py-8">
        <p>Loading...</p>
      </main>
    );
  }

  const { image, detectedDisease } = result.data;

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/disease-detection"
          className="inline-flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-green-50"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-green-50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-green-50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
      <div className="md:grid md:grid-cols-6 md:gap-8">
        <div className="md:col-span-2 md:relative">
          <Card className="border-border shadow-sm md:sticky md:top-24.5">
            <CardHeader>
              <CardTitle className="text-primary">Detected Disease</CardTitle>
              <CardDescription className="text-primary/80">
                Analysis of your uploaded image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <ImagePreview imageUrl={image.url || "/placeholder.svg"} />
                <div className="mt-6">
                  <p className="text-primary/80 text-sm italic">
                    <em>Crop:</em> {result?.data?.cropName}
                  </p>
                  <p className="text-primary/80 text-sm italic">
                    <em>Description:</em> {result?.data?.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary">Disease Details</CardTitle>
              <CardDescription className="text-primary/80">
                Details of the detected disease
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-primary/80">
                <li>
                  <strong>Crop Name:</strong> {detectedDisease?.cropName}
                </li>
                <li>
                  <strong>Disease Name:</strong> {detectedDisease?.diseaseName}
                </li>
                <li>
                  <strong>Description:</strong> {detectedDisease?.description}
                </li>
                <li>
                  <strong>Symptoms:</strong>
                  <ul>
                    {detectedDisease?.symptoms?.map((symptom, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary/80 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Causes:</strong>
                  <ul>
                    {detectedDisease?.causes?.map((cause, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary/80 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Preventive Tips:</strong>
                  <ul>
                    {detectedDisease?.preventiveTips?.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary/80 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Treatment:</strong>
                  <ul>
                    {detectedDisease?.treatment?.map((treatment, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary/80 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/80">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Report
                </Button>
                <Link href="/disease-detection">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-green-50"
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
