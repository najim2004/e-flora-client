"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crop } from "@/types/cropSuggestion";
import { ArrowRight, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CropRecommendationCardProps {
  name: string;
  description: string;
  matchPercentage: number;
  imageSrc: string;
  imageAlt: string;
  cropDetails: Crop["cropDetails"];
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
    <Card className="border-border">
      <CardContent className="p-4 flex items-center">
        <div className="w-16 h-16 bg-secondary/60 rounded-full flex items-center justify-center mr-4">
          <Image src={imageSrc} alt={imageAlt} width={64} height={64} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-primary">{name}</h4>
          <p className="text-sm text-primary/80">{description}</p>
          <div className="flex items-center mt-1">
            <div className="h-1.5 w-full max-w-[100px] bg-secondary/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${matchPercentage}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs text-primary/80">
              {matchPercentage}% match
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="ml-4 border-border text-primary hover:bg-secondary"
        >
          {cropDetails.status === "pending" ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : cropDetails.status === "success" ? (
            <Link
              href={`/crop-details/${cropDetails?.slug}?match=${matchPercentage}`}
              className="size-fit flex justify-center items-center"
            >
              Details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          ) : (
            "Retry"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
