"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FarmDetailsForm, {
  FormData,
} from "@/components/crop-suggestions/FarmDetailsForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { errorToast } from "@/components/customToast";
import { useRequestCropSuggestionMutation } from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
import { CropSuggestionPayload } from "@/types/cropSuggestion";

export default function CropSuggestionsPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const [requestCropSuggestion, { isLoading }] =
    useRequestCropSuggestionMutation();

  const handleSubmit = async (formData: FormData) => {
    if (!isAuthenticated) return;

    try {
      if (formData.forMyGarden) {
        const body: CropSuggestionPayload = {
          mode: "auto",
          plantType: formData.plantType,
          avoidCurrentCrops: formData.avoidCurrentCrops ?? false,
        };
        await requestCropSuggestion(body);
      } else {
        if (
          !formData.location ||
          !formData.latitude ||
          !formData.longitude ||
          !formData.sunlight ||
          !formData.purpose ||
          !formData.area ||
          !formData.waterSource ||
          !formData.soilType ||
          !formData.gardenType ||
          !formData.gardenerType
        ) {
          errorToast(
            "Please provide a valid location with latitude and longitude"
          );
          return;
        }
        const body: CropSuggestionPayload = {
          mode: "manual",
          gardenerType: formData.gardenerType,
          gardenType: formData.gardenType,
          plantType: formData.plantType,
          currentCrops: formData.currentCrops
            ? formData.currentCrops.split(",").map((c: string) => c.trim())
            : [],
          sunlight: formData.sunlight,
          purpose: formData.purpose,
          area: formData.area,
          waterSource: formData.waterSource,
          soilType: formData.soilType,
          location: {
            country: formData.location?.split(",")[2]?.trim() || "",
            state: formData.location?.split(",")[1]?.trim() || "",
            city: formData.location?.split(",")[0]?.trim() || "",
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
        };
        const res = await requestCropSuggestion(body).unwrap();
        console.log(res);
      }
    } catch {
      errorToast("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="shadow-sm md:col-span-1 h-min md:sticky md:top-24.5 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-primary">Enter Your Details</CardTitle>
            <CardDescription className="text-primary/80">
              Provide your garden&#39;s info
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FarmDetailsForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
