"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CropDetails } from "@/types/cropSuggestion";
import { ArrowRight, LoaderCircle } from "lucide-react";
import Image from "next/image";

interface CropRecommendationCardProps {
  name: string;
  description: string;
  matchPercentage: number;
  imageSrc: string;
  imageAlt: string;
  cropDetails: CropDetails;
}

export default function CropRecommendationCard({
  name,
  description,
  matchPercentage,
  imageSrc,
  imageAlt,
  cropDetails,
}: CropRecommendationCardProps) {
  return (
    <Card className="border-green-100">
      <CardContent className="p-4 flex items-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <Image src={imageSrc} alt={imageAlt} width={64} height={64} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-green-800">{name}</h4>
          <p className="text-sm text-green-700">{description}</p>
          <div className="flex items-center mt-1">
            <div className="h-1.5 w-full max-w-[100px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${matchPercentage}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs text-green-700">
              {matchPercentage}% match
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="ml-4 border-green-600 text-green-600 hover:bg-green-50"
        >
          {cropDetails.status === "pending" ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : cropDetails.status === "success" ? (
            <>
              Details <ArrowRight className="ml-1 h-4 w-4" />
            </>
          ) : (
            "Retry"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
