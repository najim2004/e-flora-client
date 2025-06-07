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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CropSuggestionProgress,
  CropSuggestionResponse,
  CropUpdateDetails,
} from "@/types/cropSuggestion";
import * as z from "zod";
import {
  useCropSuggestionResultQuery,
  useRequestCropSuggestionMutation,
} from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { errorToast, successToast } from "@/components/customToast";
import { getSocket } from "@/lib/socket";
import CropSuggestionProgressComponent from "@/components/crop-suggestions/CropSuggestionProgressComponent";
import {
  insertCropSuggestion,
  updateCropDetails,
} from "@/redux/features/cropSuggestions/cropSuggestionSlice";

export default function CropSuggestionsPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const cropSuggestions = useSelector(
    (state: RootState) => state.cropSuggestion.cropSuggestions
  );

  const [progress, setProgress] = useState<CropSuggestionProgress | null>(null);
  const [cropSuggestionData, setCropSuggestionData] =
    useState<CropSuggestionResponse | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinCropSuggestionRoom");

    const handleProgress = (data: CropSuggestionProgress) => {
      console.log("progress", data);
      setProgress(data);
    };

    const handleCompleted = (payload: {
      data: CropSuggestionResponse;
      timestamp: Date;
    }) => {
      console.log("complete", payload);
      if (payload?.data) {
        dispatch(insertCropSuggestion(payload.data));
        router.push(`/crop-suggestions?id=${payload.data._id}`);
      }
      setProgress(null);
    };

    const handleFailed = (error: { message: string; timestamp: Date }) => {
      errorToast("Failed to generate crop suggestions!");
      console.log("failed", error);
    };

    const handleCropDetails = (data: CropUpdateDetails) => {
      console.log("crop update", data);
      if (id) {
        dispatch(
          updateCropDetails({
            id,
            details: data,
          })
        );
      }
    };

    socket.on("cropSuggestionProgressUpdate", handleProgress);
    socket.on("cropSuggestionCompleted", handleCompleted);
    socket.on("cropSuggestionFailed", handleFailed);
    socket.on("individualCropDetailsUpdate", handleCropDetails);

    return () => {
      socket.emit("leaveCropSuggestionRoom");
      socket.off("cropSuggestionProgressUpdate", handleProgress);
      socket.off("cropSuggestionCompleted", handleCompleted);
      socket.off("cropSuggestionFailed", handleFailed);
      socket.off("individualCropDetailsUpdate", handleCropDetails);
    };
  }, [dispatch, router, id]);

  useEffect(() => {
    if (id) {
      const existing = cropSuggestions.find((c) => c._id === id);
      if (existing) {
        setCropSuggestionData(existing);
      }
    }
  }, [id, cropSuggestions]);

  const {
    data,
    isLoading: isLoadingQuery,
    isError,
  } = useCropSuggestionResultQuery(id ?? "", {
    skip: !id || cropSuggestions.some((c) => c._id === id),
  });

  useEffect(() => {
    if (data && data.data && data.success) {
      setCropSuggestionData(data.data);
    }
  }, [data]);

  const [suggestionRequestMutation, { isLoading }] =
    useRequestCropSuggestionMutation();

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!isAuthenticated || isLoading) return;

    try {
      const [latitude, longitude] = formData.location.split(",").map(Number);
      const res = await suggestionRequestMutation({
        location: { latitude, longitude },
        soilType: formData.soilType,
        farmSize: parseFloat(formData.farmSize),
        irrigationAvailability: formData.irrigation,
      }).unwrap();

      if (res?.success) {
        successToast(
          res.message || "Request accepted! Please wait while we process."
        );

        // Remove `id` param from URL without page reload
        const url = new URL(window.location.href);
        url.searchParams.delete("id");
        window.history.replaceState(null, "", url.toString());

        // Optional: Clear previous data if needed
        setCropSuggestionData(null);
      } else {
        errorToast(res.error.message || "Failed to submit request!");
      }
    } catch (err) {
      console.error("Submit error:", err);
      errorToast(
        err instanceof Error ? err.message : "Something went wrong. Try again."
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
                Provide your farm&#39;s location, soil and irrigation info
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FarmDetailsForm
                defaultValues={
                  cropSuggestionData
                    ? {
                        location: `${
                          cropSuggestionData?.location?.latitude ?? ""
                        }, ${cropSuggestionData?.location?.longitude ?? ""}`,
                        soilType: cropSuggestionData.soilType ?? "",
                        farmSize: String(cropSuggestionData.farmSize),
                        irrigation:
                          cropSuggestionData.irrigationAvailability ?? "",
                      }
                    : {
                        location: "",
                        soilType: "",
                        farmSize: "",
                        irrigation: "",
                      }
                }
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm md:col-span-2">
            {progress ? (
              <CropSuggestionProgressComponent progress={progress} />
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Crop Recommendations
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Based on your farm&#39;s location and soil conditions and
                    weather
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WeatherConditions
                    weatherData={
                      cropSuggestionData?.recommendations?.weathers?.[0] ?? {
                        avgMaxTemp: 0,
                        avgMinTemp: 0,
                        avgHumidity: 0,
                        avgRainfall: 0,
                        avgWindSpeed: 0,
                        dominantWindDirection: "",
                      }
                    }
                  />
                  <CropRecommendations
                    cropData={cropSuggestionData?.recommendations?.crops ?? []}
                  />
                  <CultivationTips
                    cultivationTips={
                      cropSuggestionData?.recommendations?.cultivationTips ?? []
                    }
                  />
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
