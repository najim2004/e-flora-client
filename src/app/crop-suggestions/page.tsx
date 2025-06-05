"use client";

import FarmDetailsForm, {
  formSchema,
} from "@/components/crop-suggestions/FarmDetailsForm";
import WeatherConditions from "@/components/crop-suggestions/WeatherConditions";
import CropRecommendations from "@/components/crop-suggestions/CropRecommendations";
import CultivationTips from "@/components/crop-suggestions/CultivationTips";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CropSuggestionBody } from "@/types/cropSuggestion";
import * as z from "zod";
import { useRequestCropSuggestionMutation } from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { errorToast, successToast } from "@/components/customToast";
interface CropSuggestionData {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  soilType: CropSuggestionBody["soilType"] | undefined;
  farmSize: number | undefined;
  irrigationAvailability:
    | CropSuggestionBody["irrigationAvailability"]
    | undefined;
}

export default function CropSuggestionsPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [cropSuggestionData, setCropSuggestionData] =
    useState<CropSuggestionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/crop-suggestions/${id}`);
          const data = await response.json();
          setCropSuggestionData(data);
        } catch (error) {
          console.error("Error fetching crop suggestions:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  const [suggestionRequestMutation, { isLoading }] =
    useRequestCropSuggestionMutation();

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!isAuthenticated || isLoading) return;
    console.log(formData);
    try {
      const [latitude, longitude] = formData.location.split(",").map(Number);
      const { data, error } = await suggestionRequestMutation({
        location: {
          latitude,
          longitude,
        },
        soilType: formData.soilType,
        farmSize: parseFloat(formData.farmSize),
        irrigationAvailability: formData.irrigation,
      }).unwrap();
      if (data.success) {
        successToast(
          data.message || "Your request accepted! Please wait now progressing"
        );
      } else {
        errorToast(
          data.error.message ||
            error.message ||
            "Failed send request! Please try again latter"
        );
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      errorToast(
        error instanceof Error
          ? error.message
          : "Failed send request! Please try again latter"
      );
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 md:relative">
          <Card className="border-green-100 shadow-sm md:col-span-1 h-min md:sticky md:top-24.5">
            <CardHeader>
              <CardTitle className="text-green-800">
                Enter Your Details
              </CardTitle>
              <CardDescription className="text-green-700">
                Provide information about your farm location and soil
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cropSuggestionData ? (
                <FarmDetailsForm
                  defaultValues={{
                    location: `${
                      cropSuggestionData?.location?.latitude ?? ""
                    }, ${cropSuggestionData?.location?.longitude ?? ""}`,
                    soilType: cropSuggestionData.soilType ?? "",
                    farmSize: String(cropSuggestionData.farmSize),
                    irrigation: cropSuggestionData.irrigationAvailability ?? "",
                  }}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              ) : (
                <FarmDetailsForm
                  defaultValues={{
                    location: "",
                    soilType: "",
                    farmSize: "",
                    irrigation: "",
                  }}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              )}
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-green-800">
                Crop Recommendations
              </CardTitle>
              <CardDescription className="text-green-700">
                Based on your location and soil conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherConditions />
              <CropRecommendations />
              <CultivationTips />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
