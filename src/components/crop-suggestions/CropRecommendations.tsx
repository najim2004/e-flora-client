"use client";

"use client";

import { Crop } from "@/types/cropSuggestion";
import CropRecommendationCard from "./CropRecommendationCard";

interface CropRecommendationsProps {
  cropData: Crop[];
}

export default function CropRecommendations({
  cropData,
}: CropRecommendationsProps) {
  return (
    <div className="space-y-4">
      {cropData?.map((crop) => (
        <CropRecommendationCard
          key={crop.name}
          name={crop.name}
          description={crop.description}
          matchPercentage={crop.match}
          imageSrc={`/${crop.icon}`}
          imageAlt={crop.name}
          cropDetails={crop.cropDetails}
        />
      ))}
    </div>
  );
}
