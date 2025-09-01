"use client";

import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"; // Added CheckCircle2
import { errorToast } from "../common/CustomToast";
import { Crop } from "@/types/Garden";

// Define a more specific type for the crops we expect from our new endpoint
type ActiveCrop = Pick<Crop, "_id" | "cropName" | "image">;

interface GardenCropSelectorProps {
  selectedCropId: string | null;
  onCropSelect: (id: string) => void;
}

export function GardenCropSelector({
  selectedCropId,
  onCropSelect,
}: GardenCropSelectorProps) {
  const [crops, setCrops] = useState<ActiveCrop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActiveCrops() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/garden/active-crops`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch garden crops");
        }
        const data = await response.json();
        if (data.success) {
          setCrops(data.data);
        } else {
          throw new Error(data.message || "Could not fetch crops");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        errorToast("Could not load your garden crops.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchActiveCrops();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-primary/80">Loading Your Garden...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-red-600">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>Error loading crops.</p>
      </div>
    );
  }

  if (crops.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-primary/80">
          You have no active crops in your garden.
        </p>
      </div>
    );
  }

  return (
    <RadioGroup
      value={selectedCropId ?? ""}
      onValueChange={onCropSelect}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4"
    >
      {crops.map((crop) => (
        <div key={crop._id}>
          <RadioGroupItem value={crop._id} id={crop._id} className="sr-only" />
          <label
            htmlFor={crop._id}
            className={`relative block rounded-lg border-2 cursor-pointer transition-all duration-200 ease-in-out
              ${
                selectedCropId === crop._id
                  ? "border-primary ring-2 ring-primary/50"
                  : "border-border hover:border-primary/50 hover:shadow-md"
              }
            `}
          >
            <Card className="overflow-hidden shadow-none border-none">
              <CardContent className="p-0">
                <Image
                  src={crop.image?.url || "/placeholder.svg"}
                  alt={crop.cropName}
                  width={150}
                  height={150}
                  className="object-cover w-full h-32"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-primary truncate">
                    {crop.cropName}
                  </p>
                </div>
              </CardContent>
            </Card>
            {selectedCropId === crop._id && ( // Added checkmark overlay
              <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
