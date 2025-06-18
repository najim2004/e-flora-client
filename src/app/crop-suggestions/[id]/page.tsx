"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCropSuggestionResultQuery } from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
import {
  insertCropSuggestion,
  updateCropDetails,
} from "@/redux/features/cropSuggestions/cropSuggestionSlice";
import WeatherConditions from "@/components/crop-suggestions/WeatherConditions";
import CropRecommendations from "@/components/crop-suggestions/CropRecommendations";
import CultivationTips from "@/components/crop-suggestions/CultivationTips";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getSocket } from "@/lib/socket";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CropSuggestionResponse } from "@/types/cropSuggestion";

export default function CropSuggestionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const cropSuggestions = useSelector(
    (state: RootState) => state.cropSuggestion.cropSuggestions
  );

  const [cropSuggestionData, setCropSuggestionData] =
    useState<CropSuggestionResponse | null>(null);

  const { data, isLoading } = useCropSuggestionResultQuery(id ?? "", {
    skip: !id,
  });

  useEffect(() => {
    if (!id) {
      setCropSuggestionData(null);
      return;
    }

    const local = cropSuggestions.find((c) => c._id === id);
    if (local) {
      setCropSuggestionData(local);
    } else if (data?.success && data.data) {
      setCropSuggestionData(data.data);
      dispatch(insertCropSuggestion(data.data));
    }
  }, [id, cropSuggestions, data, dispatch]);

  // Socket live update for individual crop detail
  useEffect(() => {
    if (!id) return;
    const socket = getSocket();

    socket.emit("joinCropSuggestionRoom");

    const handleUpdate = (updateData) => {
      if (updateData?._id === id) {
        dispatch(updateCropDetails({ id, details: updateData }));
      }
    };

    socket.on("individualCropDetailsUpdate", handleUpdate);

    return () => {
      socket.emit("leaveCropSuggestionRoom");
      socket.off("individualCropDetailsUpdate", handleUpdate);
    };
  }, [id, dispatch]);

  if (isLoading || !cropSuggestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary text-lg">
        Loading suggestion...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 md:relative">
          {/* Farm Details Card */}
          <Card className="md:col-span-1 md:sticky md:top-24 rounded-sm h-fit">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-primary">
                  Farm Information
                </CardTitle>
                <Button
                  variant="outline"
                  className="!p-1 h-fit border-none shadow-none bg-transparent hover:bg-transparent active:bg-transparent text-primary"
                >
                  <Link
                    href="/crop-suggestions"
                    className="size-full flex justify-center items-center"
                  >
                    <Plus />
                  </Link>
                </Button>
              </div>
              <CardDescription className="text-muted-foreground">
                This information was provided when requesting the crop
                suggestion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Location</p>
                <p className="text-primary font-medium">
                  {cropSuggestionData.location.latitude},{" "}
                  {cropSuggestionData.location.longitude}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Soil Type</p>
                <p className="text-primary font-medium">
                  {cropSuggestionData.soilType}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Irrigation Availability</p>
                <p className="text-primary font-medium">
                  {cropSuggestionData.irrigationAvailability}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Farm Size</p>
                <p className="text-primary font-medium">
                  {cropSuggestionData.farmSize} acre(s)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm md:col-span-2 border-border rounded">
            <CardHeader>
              <CardTitle className="text-primary">
                Crop Recommendations
              </CardTitle>
              <CardDescription className="text-primary/80">
                Based on your farm's soil, irrigation, and weather data.
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
                cropData={cropSuggestionData.recommendations?.crops ?? []}
              />
              <CultivationTips
                cultivationTips={
                  cropSuggestionData.recommendations?.cultivationTips ?? []
                }
              />
              <button
                className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                onClick={() => router.push("/crop-suggestions")}
              >
                Back to form
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
