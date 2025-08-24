"use client";
import { useEffect, useState } from "react";
import CropCard from "./CropCard";
import { CropCardType } from "@/types/cropSuggestion";
import { useCropSuggestionSocket } from "@/hooks/useCropSuggestionSocket";

const colorMap = {
  sunlight: {
    "Full Sun": "text-yellow-600 bg-yellow-100",
    "Partial Sun": "text-orange-600 bg-orange-100",
    default: "text-blue-600 bg-blue-100",
  },
  water: {
    High: "text-blue-600 bg-blue-100",
    Moderate: "text-green-600 bg-green-100",
    default: "text-gray-600 bg-gray-100",
  },
  difficulty: {
    Easy: "text-green-600 bg-green-100",
    Moderate: "text-yellow-600 bg-yellow-100",
    default: "text-red-600 bg-red-100",
  },
};

const getColor = (type: keyof typeof colorMap, value: string) =>
  colorMap[type][value as keyof (typeof colorMap)[typeof type]] ||
  colorMap[type].default;

export default function CropGrid({ crops }: { crops: CropCardType[] }) {
  const [allCrops, setAllCrops] = useState(crops);
  const { cropDetails } = useCropSuggestionSocket();

  useEffect(() => {
    console.log(cropDetails);
    if (!cropDetails) return;
    setAllCrops((prev) =>
      prev.map((c) =>
        c.details._id === cropDetails.detailsId
          ? {
              ...c,
              details: {
                ...c.details,
                status: cropDetails.status,
                slug: cropDetails.slug,
              },
            }
          : c
      )
    );
  }, [cropDetails]);
  const handleAddToGarden = async (cropId: string) => {
    console.log(cropId);
  };
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allCrops.map((crop) => (
        <CropCard
          key={crop.scientificName}
          onAddToGarden={handleAddToGarden}
          crop={crop}
          getSunlightColor={(v) => getColor("sunlight", v)}
          getWaterColor={(v) => getColor("water", v)}
          getDifficultyColor={(v) => getColor("difficulty", v)}
        />
      ))}
    </div>
  );
}
