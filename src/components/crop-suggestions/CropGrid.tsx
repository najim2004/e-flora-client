"use client";
import { useEffect, useState } from "react";
import CropCard from "./CropCard";
import { CropCardType } from "@/types/cropSuggestion";
import { useCropSuggestionSocket } from "@/hooks/useCropSuggestionSocket";
import { errorToast, successToast } from "../common/CustomToast";
import { useRouter } from "next/navigation";

export default function CropGrid({ crops }: { crops: CropCardType[] }) {
  const [allCrops, setAllCrops] = useState(crops);
  const [loadings, setLoadings] = useState<string[]>([]);
  const { cropDetails, gardenAddingStatus } = useCropSuggestionSocket();

  const router = useRouter();

  useEffect(() => {
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
      successToast(gardenAddingStatus.message, {
        level: "View",
        onClick: () => {
          router.push(`/garden`);
        },
      });
    } else {
      errorToast(gardenAddingStatus.message);
    }
    setLoadings((prev) =>
      prev.filter((id) => id !== gardenAddingStatus.cropId)
    );
  }, [gardenAddingStatus, router]);
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
        />
      ))}
    </div>
  );
}
