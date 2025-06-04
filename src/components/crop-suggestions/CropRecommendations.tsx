'use client'

'use client'

import CropRecommendationCard from "./CropRecommendationCard";

interface Crop {
  name: string;
  description: string;
  matchPercentage: number;
  imageSrc: string;
  imageAlt: string;
}

const crops: Crop[] = [
  {
    name: "Rice (Boro)",
    description: "Ideal for your clay soil and current weather conditions",
    matchPercentage: 95,
    imageSrc: "/placeholder.svg?height=64&width=64",
    imageAlt: "Rice",
  },
  {
    name: "Jute",
    description: "Good for your soil type and current rainfall patterns",
    matchPercentage: 85,
    imageSrc: "/placeholder.svg?height=64&width=64",
    imageAlt: "Jute",
  },
  {
    name: "Mustard",
    description: "Suitable for the upcoming season and your soil conditions",
    matchPercentage: 80,
    imageSrc: "/placeholder.svg?height=64&width=64",
    imageAlt: "Mustard",
  },
];

export default function CropRecommendations() {
  return (
    <div className="space-y-4">
      {crops.map((crop) => (
        <CropRecommendationCard
          key={crop.name}
          name={crop.name}
          description={crop.description}
          matchPercentage={crop.matchPercentage}
          imageSrc={crop.imageSrc}
          imageAlt={crop.imageAlt}
        />
      ))}
    </div>
  );
}
