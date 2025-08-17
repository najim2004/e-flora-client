"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import FarmDetailsForm, {
  FormData,
} from "@/components/crop-suggestions/FarmDetailsForm";
import { errorToast } from "@/components/customToast";
import { useRequestCropSuggestionMutation } from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
import { RootState } from "@/redux/store";
import { CropSuggestionPayload } from "@/types/cropSuggestion";
import { useCropSuggestionSocket } from "@/hooks/useCropSuggestionSocket";
import { ProgressModal } from "@/components/custom-progress";

export default function CropSuggestionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const [requestCropSuggestion, { isLoading: requestLoading }] =
    useRequestCropSuggestionMutation();
  const { progress, failed, completed } = useCropSuggestionSocket();

  // Redirect on completion
  useEffect(() => {
    if (completed?.resultId) {
      router.push(`/crop-suggestions/${completed.resultId}`);
    }
  }, [completed, router]);

  const handleSubmit = async (formData: FormData) => {
    if (!isAuthenticated) return;

    try {
      let body: CropSuggestionPayload;

      if (formData.forMyGarden) {
        body = {
          mode: "auto",
          plantType: formData.plantType,
          avoidCurrentCrops: formData.avoidCurrentCrops ?? false,
        };
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
          errorToast("Please provide all required fields");
          return;
        }

        body = {
          mode: "manual",
          gardenerType: formData.gardenerType,
          gardenType: formData.gardenType,
          plantType: formData.plantType,
          currentCrops: formData.currentCrops
            ? formData.currentCrops.split(",").map((c) => c.trim())
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
      }

      await requestCropSuggestion(body).unwrap();
    } catch {
      errorToast("Something went wrong while requesting crop suggestion");
    }
  };

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (progress || failed) setIsOpen(true);
    else setIsOpen(false);
  }, [progress, failed]);
  useEffect(() => {
    if (
      requestLoading ||
      (progress &&
        progress.status !== "completed" &&
        progress.status !== "failed")
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoading, requestLoading, progress]);

  return (
    <div className="min-h-screen bg-green-50 relative">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="shadow-sm max-w-2xl mx-auto">
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

      {(progress || failed) && (
        <ProgressModal
          isOpen={isOpen}
          onClose={handleClose}
          data={
            progress || { status: "failed", progress: 0, message: failed ?? "" }
          }
        />
      )}
    </div>
  );
}
