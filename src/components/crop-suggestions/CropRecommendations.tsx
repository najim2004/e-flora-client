'use client'

'use client'

import CropRecommendationCard from "./CropRecommendationCard";

interface CropRecommendationsProps {
  cropData: {
    name: string;
    scientificName: string;
    description: string;
    match: number;
    icon: string;
  }[];
}

export default function CropRecommendations({ cropData }: CropRecommendationsProps) {
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
        />
      ))}
    </div>
  );
}
