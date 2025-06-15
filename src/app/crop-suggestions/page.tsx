"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Plus, X } from "lucide-react";
import * as z from "zod";

import FarmDetailsForm, {
  formSchema,
} from "@/components/crop-suggestions/FarmDetailsForm";
import WeatherConditions from "@/components/crop-suggestions/WeatherConditions";
import CropRecommendations from "@/components/crop-suggestions/CropRecommendations";
import CultivationTips from "@/components/crop-suggestions/CultivationTips";
import CropSuggestionProgressComponent from "@/components/crop-suggestions/CropSuggestionProgressComponent";
import {
  useCropSuggestionHistoryMutation,
  useCropSuggestionResultQuery,
  useRequestCropSuggestionMutation,
} from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { errorToast, successToast } from "@/components/customToast";
import { getSocket } from "@/lib/socket";
import {
  insertCropSuggestion,
  updateCropDetails,
} from "@/redux/features/cropSuggestions/cropSuggestionSlice";
import {
  CropSuggestionProgress,
  CropSuggestionResponse,
  CropUpdateDetails,
} from "@/types/cropSuggestion";

export default function CropSuggestionsPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const cropSuggestions = useSelector(
    (state: RootState) => state.cropSuggestion.cropSuggestions
  );
  const history = useSelector(
    (state: RootState) => state.cropSuggestion.history
  );

  const [progress, setProgress] = useState<CropSuggestionProgress | null>(null);
  const [cropSuggestionData, setCropSuggestionData] =
    useState<CropSuggestionResponse | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [getHistories] = useCropSuggestionHistoryMutation();
  const [requestSuggestion, { isLoading }] = useRequestCropSuggestionMutation();

  const { data, isLoading: isQueryLoading } = useCropSuggestionResultQuery(
    id ?? "",
    {
      skip: !id || cropSuggestions.some((c) => c._id === id),
    }
  );

  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinCropSuggestionRoom");

    socket.on("cropSuggestionProgressUpdate", setProgress);

    socket.on("cropSuggestionCompleted", ({ data }) => {
      if (data) {
        dispatch(insertCropSuggestion(data));
        setCropSuggestionData(null);
        router.push(`/crop-suggestions?id=${data._id}`);
      }
      setProgress(null);
    });

    socket.on("cropSuggestionFailed", ({ message }) => {
      errorToast(message || "Suggestion failed");
      setProgress(null);
    });

    socket.on("individualCropDetailsUpdate", (data: CropUpdateDetails) => {
      if (id) dispatch(updateCropDetails({ id, details: data }));
    });

    return () => {
      socket.emit("leaveCropSuggestionRoom");
      socket.removeAllListeners();
    };
  }, [dispatch, router, id]);

  useEffect(() => {
    if (id) {
      const local = cropSuggestions.find((c) => c._id === id);
      if (local) setCropSuggestionData(local);
    }
  }, [id, cropSuggestions]);

  useEffect(() => {
    if (data?.success && data.data) {
      setCropSuggestionData(data.data);
    }
  }, [data]);

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!isAuthenticated || isLoading) return;

    try {
      const [latitude, longitude] = formData.location.split(",").map(Number);
      const res = await requestSuggestion({
        location: { latitude, longitude },
        soilType: formData.soilType,
        farmSize: parseFloat(formData.farmSize),
        irrigationAvailability: formData.irrigation,
      }).unwrap();

      if (res.success) {
        successToast(res.message || "Processing request...");
        setCropSuggestionData(null);
      } else {
        errorToast(res.error?.message || "Submission failed");
      }
    } catch {
      errorToast("Something went wrong");
    }
  };

  const fetchHistory = async (newPage: number) => {
    try {
      await getHistories({ page: newPage, limit }).unwrap();
    } catch (err) {
      console.error(err);
      errorToast("Failed to fetch history!");
    }
  };

  const handleToggleHistory = () => {
    setShowHistory((prev) => !prev);
    if (!showHistory && history.length === 0) {
      fetchHistory(1);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchHistory(nextPage);
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 md:relative">
          <Card className="shadow-sm md:col-span-1 h-min md:sticky md:top-24.5">
            <CardHeader>
              <CardTitle className="text-primary">Enter Your Details</CardTitle>
              <CardDescription className="text-primary/80">
                Provide your farm's location, soil and irrigation info
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

          <Card className="shadow-sm md:col-span-2">
            <CardHeader className="flex justify-between items-center z-20">
              <div className="flex-grow">
                {cropSuggestionData && (
                  <>
                    <CardTitle className="text-primary">
                      Crop Recommendations
                    </CardTitle>
                    <CardDescription className="text-primary/80">
                      Based on your farm’s soil, irrigation, and weather.
                    </CardDescription>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleToggleHistory}
                  variant="outline"
                  size="sm"
                  className="text-primary flex items-center gap-1"
                >
                  {showHistory ? (
                    <>
                      <X size={16} />
                      <span className="sr-only">Close</span>
                    </>
                  ) : (
                    <>
                      <History size={16} />
                      <span className="sr-only">History</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary"
                  onClick={() => {
                    setCropSuggestionData(null);
                    router.push("/crop-suggestions");
                  }}
                >
                  <Plus />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {progress ? (
                <CropSuggestionProgressComponent progress={progress} />
              ) : showHistory ? (
                <div className="space-y-3">
                  {history.map((item) => (
                    <Card
                      onClick={() => {
                        router.push(`/crop-suggestions?id=${item._id}`);
                        handleToggleHistory()
                      }}
                      key={item._id}
                      className="bg-white hover:shadow-md transition p-4 rounded-xl border border-muted"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm text-primary font-medium flex items-center gap-1">
                          📍 {item.location.latitude}, {item.location.longitude}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Soil:{" "}
                        <span className="font-medium text-foreground">
                          {item.soilType}
                        </span>
                        , Size:{" "}
                        <span className="font-medium">
                          {item.farmSize} acres
                        </span>
                        , Irrigation:{" "}
                        <span className="font-medium">
                          {item.irrigationAvailability}
                        </span>
                      </div>
                    </Card>
                  ))}
                  <Button
                    onClick={handleLoadMore}
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 text-primary"
                  >
                    Load More
                  </Button>
                </div>
              ) : cropSuggestionData ? (
                <>
                  <WeatherConditions
                    weatherData={
                      cropSuggestionData.recommendations?.weathers?.[0] ?? {
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
                </>
              ) : (
                <div className="text-center py-8 space-y-2">
                  <CardTitle className="text-primary">
                    Fill out the form!
                  </CardTitle>
                  <CardDescription className="text-primary/80">
                    Get personalized recommendations by submitting farm details.
                  </CardDescription>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
