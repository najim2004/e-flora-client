"use client";
import { useEffect, useState } from "react";
import CropCard from "./CropCard";
import { CropCardType } from "@/types/cropSuggestion";
import { useCropSuggestionSocket } from "@/hooks/useCropSuggestionSocket";
import { errorToast, successToast } from "../customToast";

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
  const [loadings, setLoadings] = useState<string[]>([]);
  const { cropDetails, gardenAddingStatus } = useCropSuggestionSocket();

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
  useEffect(() => {
    if (!gardenAddingStatus) return;
    if (gardenAddingStatus.success) {
      successToast(gardenAddingStatus.message);
    } else {
      errorToast(gardenAddingStatus.message);
    }
    setLoadings((prev) =>
      prev.filter((id) => id !== gardenAddingStatus.cropId)
    );
  }, [gardenAddingStatus]);
  const handleAddToGarden = async (cropId: string) => {
    try {
      setLoadings((prev) => [...prev, cropId]);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/garden/add-crop/${cropId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to add crop to garden");
      }
      const data = await res.json();
      if (!data?.success)
        throw new Error(
          "Failed to send adding request, please try again later"
        );
    } catch (error) {
      setLoadings((prev) => prev.filter((id) => id !== cropId));
      console.log(error);
      errorToast("Failed to add crop to garden. Please try again.");
    }
  };
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allCrops.map((crop) => (
        <CropCard
          key={crop.scientificName}
          onAddToGarden={handleAddToGarden}
          crop={crop}
          loadings={loadings}
          getSunlightColor={(v) => getColor("sunlight", v)}
          getWaterColor={(v) => getColor("water", v)}
          getDifficultyColor={(v) => getColor("difficulty", v)}
        />
      ))}
    </div>
  );
}
