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
  Printer,
  Share2,
  CalendarPlus,
  Loader2,
  Microscope,
  Thermometer,
  Cloud,
  Shield,
  PillIcon,
} from "lucide-react";
import Link from "next/link";
import { DiseaseDetectionResult } from "@/types/diseaseDetection";
import { cookies } from "next/headers";
import ImagePreview from "@/components/common/ImagePreview";
import React from "react";
import { notFound } from "next/navigation";
import { DiseaseDetailCard } from "@/components/disease-detection/DiseaseDetailCard"; // Import the new component

const fetchDetails = async (
  id: string
): Promise<DiseaseDetectionResult | undefined> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/crops/disease-detection/result/${id}`,
    {
      cache: "force-cache",
      headers: {
        Cookie: (await cookies()).toString() || "",
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
};

export default async function DiseaseDetectionResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = await fetchDetails(id);

  if (!result?.data) {
    return (
      <main className="flex-1 container mx-auto px-4 py-8 text-center text-primary/80">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading disease detection results...</p>
      </main>
    );
  }

  const { image, detectedDisease, cta } = result.data;
  const disease = detectedDisease; // Use detectedDisease directly as it's populated now

  return (
    <div className="bg-gray-50 min-h-screen">
      {" "}
      {/* Added bg-gray-50 and min-h-screen */}
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${image.url || "/placeholder.svg"})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          {" "}
          {/* Darker overlay, subtle blur */}
          <div className="text-center text-white p-4">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">
              {" "}
              {/* Larger, bolder text */}
              {disease.diseaseName}
            </h1>
            <p className="text-xl sm:text-2xl italic drop-shadow-lg">
              {" "}
              {/* Larger italic text */}
              {result.data.cropName}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {" "}
        {/* Increased padding */}
        {/* Header with Navigation and Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          {" "}
          {/* Increased margin-bottom */}
          <Link
            href="/disease-detection"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Detection
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {cta && ( // Conditionally render "Add Treatment Task" button
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-secondary"
              >
                <CalendarPlus className="h-4 w-4 mr-2" />
                Add Treatment Task
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-secondary"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Save Result
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-secondary"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-secondary"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          {" "}
          {/* Changed to md:grid-cols-7, gap-8 */}
          {/* Left Column: Image and Summary */}
          <div className="md:col-span-2">
            {" "}
            {/* Adjusted col-span */}
            <Card className="border-border shadow-lg md:sticky md:top-24.5">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary text-xl">
                  Image Details
                </CardTitle>
                <CardDescription className="text-primary/80">
                  Context of the detected image
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <div className="mb-6 rounded-lg overflow-hidden border border-border">
                  <ImagePreview imageUrl={image.url || "/placeholder.svg"} />
                </div>
                <p className="font-medium text-primary/80">
                  Crop:{" "}
                  <span className="font-normal">{result.data.cropName}</span>
                </p>
                {result.data.description && (
                  <p className="font-medium text-primary/80">
                    Description:{" "}
                    <span className="font-normal">
                      {result.data.description}
                    </span>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Right Column: Disease Details - Now in separate cards */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {" "}
            {/* Added flex flex-col gap-6 */}
            {/* Disease Overview Card */}
            <Card className="border-border shadow-lg">
              <CardHeader className="pb-4 flex flex-row items-center gap-3">
                <Microscope className="h-6 w-6 text-primary" />
                <CardTitle className="text-primary text-xl">
                  Disease Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2 text-foreground">
                {" "}
                {/* Changed text-primary/80 to text-foreground */}
                <p>
                  <strong className="text-gray-600">Disease Name:</strong>{" "}
                  {disease.diseaseName}
                </p>
                <p>
                  <strong className="text-gray-600">Description:</strong>{" "}
                  {disease.description}
                </p>
              </CardContent>
            </Card>
            {/* Symptoms Card */}
            <DiseaseDetailCard
              title="Symptoms"
              icon={Thermometer}
              items={disease.symptoms}
            />
            {/* Causes Card */}
            <DiseaseDetailCard
              title="Causes"
              icon={Cloud}
              items={disease.causes}
            />
            {/* Preventive Measures Card */}
            <DiseaseDetailCard
              title="Preventive Measures"
              icon={Shield}
              items={disease.preventiveTips}
            />
            {/* Treatment Card */}
            <DiseaseDetailCard
              title="Treatment"
              icon={PillIcon}
              items={disease.treatment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
