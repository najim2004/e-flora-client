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
import { useRequestCropSuggestionMutation } from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [cropSuggestionData, setCropSuggestionData] =
    useState<CropSuggestionResponse | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinCropSuggestionRoom");

    const handleProgress = (data: CropSuggestionProgress) => {
      console.log("Progress:", data);
      setProgress(data);
    };

    const handleCompleted = (payload: {
      data: CropSuggestionResponse;
      timestamp: Date;
    }) => {
      /*{
    "data": {
        "_id": "6845769473558b4d57d4ee47",
        "soilType": "clay",
        "location": {
            "latitude": 22.3752075,
            "longitude": 91.8348606
        },
        "farmSize": 2,
        "irrigationAvailability": "full",
        "recommendations": {
            "_id": "6845749b73558b4d57d4ee35",
            "crops": [
                {
                    "cropDetails": {
                        "status": "success",
                        "id": "684574a473558b4d57d4ee3e",
                        "slug": "abelmoschus-esculentus"
                    },
                    "icon": "okra.png",
                    "name": "Okra",
                    "scientificName": "Abelmoschus esculentus",
                    "description": "Okra thrives in warm, humid conditions with full sun. Clay soil with good drainage is suitable, and full irrigation will support high yields.",
                    "match": 95
                },
                {
                    "cropDetails": {
                        "status": "success",
                        "id": "684574a673558b4d57d4ee41",
                        "slug": "ipomoea-batatas"
                    },
                    "icon": "sweet_potato.png",
                    "name": "Sweet Potato",
                    "scientificName": "Ipomoea batatas",
                    "description": "Sweet potatoes perform well in warm climates and tolerate clay soils. Full irrigation is beneficial, especially during initial growth stages.",
                    "match": 90
                },
                {
                    "cropDetails": {
                        "status": "failed"
                    },
                    "icon": "amaranth.png",
                    "name": "Amaranth",
                    "scientificName": "Amaranthus spp.",
                    "description": "Amaranth is drought-tolerant and adapts well to various soil types. It benefits from irrigation during dry spells and can handle humid conditions.",
                    "match": 85
                }
            ],
            "cultivationTips": [
                {
                    "title": "Soil Management",
                    "tips": [
                        "Improve clay soil drainage by adding organic matter.",
                        "Conduct regular soil tests to determine nutrient requirements.",
                        "Consider raised beds to improve drainage and aeration."
                    ]
                },
                {
                    "title": "Irrigation Practices",
                    "tips": [
                        "Implement drip irrigation to conserve water and minimize fungal diseases.",
                        "Monitor soil moisture levels regularly to avoid over or under-watering.",
                        "Water deeply and less frequently to encourage deep root growth."
                    ]
                },
                {
                    "title": "Pest and Disease Control",
                    "tips": [
                        "Practice crop rotation to reduce pest and disease buildup.",
                        "Use organic pest control methods like neem oil or insecticidal soap.",
                        "Monitor plants regularly for signs of pests or diseases and take prompt action."
                    ]
                }
            ],
            "weathers": [
                {
                    "avgMaxTemp": 29.34,
                    "avgMinTemp": 27.56,
                    "avgHumidity": 84.86,
                    "avgRainfall": 3.61,
                    "avgWindSpeed": 17.54,
                    "dominantWindDirection": "178.64"
                }
            ]
        }
    },
    "timestamp": "2025-06-08T11:40:04.231Z"
} */
      console.log("Completed:", payload);
      if (payload?.data) {
        dispatch(insertCropSuggestion(payload.data));
        router.push(`/crop-suggestions?id=${payload?.data?._id}`);
      }
      setProgress(null);
    };

    const handleFailed = (error: { message: string; timestamp: Date }) => {
      console.log("Failed:", error);
      errorToast("Failed to generating!");
    };

    const handleCropDetails = (data: CropUpdateDetails) => {
      console.log("Crop details:", data);
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
    const fetchData = async () => {
      if (id) {
        try {
          const isExits = cropSuggestions?.find(
            (suggestion) => suggestion._id === id
          );
          if (isExits) {
            setCropSuggestionData(isExits);
            return;
          }
          const response = await fetch(`/api/crop-suggestions/${id}`);
          const data = await response.json();
          setCropSuggestionData(data);
        } catch (error) {
          console.error("Error fetching crop suggestions:", error);
        }
      }
    };

    fetchData();
  }, [id, cropSuggestions]);

  const [suggestionRequestMutation, { isLoading }] =
    useRequestCropSuggestionMutation();

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!isAuthenticated || isLoading) return;
    console.log(formData);
    try {
      const [latitude, longitude] = formData.location.split(",").map(Number);
      const res = await suggestionRequestMutation({
        location: {
          latitude,
          longitude,
        },
        soilType: formData.soilType,
        farmSize: parseFloat(formData.farmSize),
        irrigationAvailability: formData.irrigation,
      }).unwrap();
      if (res?.success) {
        successToast(
          res.message || "Your request accepted! Please wait now progressing"
        );
      } else {
        errorToast(
          res.error.message || "Failed send request! Please try again latter"
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
            {progress ? (
              <CropSuggestionProgressComponent
                progress={{
                  userId: progress.userId,
                  status: progress.status,
                  progress: progress.progress,
                  message: progress.message,
                  timestamp: progress.timestamp,
                }}
              />
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Crop Recommendations
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Based on your location and soil conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WeatherConditions
                    weatherData={cropSuggestionData?.recommendations?.weathers?.[0] || {
                      avgMaxTemp: 0,
                      avgMinTemp: 0,
                      avgHumidity: 0,
                      avgRainfall: 0,
                      dominantWindDirection: "",
                    }}
                  />
                  <CropRecommendations
                    cropData={cropSuggestionData?.recommendations?.crops || []}
                  />
                  <CultivationTips
                    cultivationTips={
                      cropSuggestionData?.recommendations?.cultivationTips || []
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
