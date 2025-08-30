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
import { errorToast } from "@/components/common/CustomToast";
import { useRequestCropSuggestionMutation } from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
import { RootState } from "@/redux/store";
import { CropSuggestionPayload } from "@/types/cropSuggestion";
import { useCropSuggestionSocket } from "@/hooks/useCropSuggestionSocket";
import { ProgressModal } from "@/components/common/CustomProgress";

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
      const isAuto = formData.forMyGarden;

      // Strictly typed clean helper
      const clean = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
        Object.fromEntries(
          Object.entries(obj).filter(
            ([, v]) => v !== "" && v !== undefined && v !== null
          )
        ) as Partial<T>;

      const body: CropSuggestionPayload = isAuto
        ? {
            mode: "auto",
            plantType: formData.plantType,
            avoidCurrentCrops: formData.avoidCurrentCrops ?? false,
          }
        : (() => {
            const requiredFields: (keyof FormData)[] = [
              "location",
              "latitude",
              "longitude",
              "sunlight",
              "purpose",
              "area",
              "waterSource",
              "soilType",
              "gardenType",
              "gardenerType",
            ];

            if (requiredFields.some((f) => !formData[f])) {
              errorToast("Please provide all required fields");
              throw new Error("Missing fields");
            }

            const [city, state, country] = formData
              .location!.split(",")
              .map((s) => s.trim());

            return {
              mode: "manual",
              gardenerType: formData.gardenerType,
              gardenType: formData.gardenType,
              plantType: formData.plantType,
              currentCrops:
                formData.currentCrops?.split(",").map((c) => c.trim()) || [],
              sunlight: formData.sunlight,
              purpose: formData.purpose,
              area: formData.area,
              waterSource: formData.waterSource,
              soilType: formData.soilType,
              location: clean({
                city,
                state,
                country,
                latitude: formData.latitude,
                longitude: formData.longitude,
              }),
            } as CropSuggestionPayload;
          })();

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
