"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  CropSuggestionHistory as corpHistory,
  insertCropSuggestion,
  updateCropDetails,
} from "@/redux/features/cropSuggestions/cropSuggestionSlice";
import {
  CropSuggestionProgress,
  CropSuggestionResponse,
  CropUpdateDetails,
} from "@/types/cropSuggestion";
import CropSuggestionHistory from "@/components/crop-suggestions/CropSuggestionHistory";

export const DEFAULT_WEATHER_DATA = {
  avgMaxTemp: 0,
  avgMinTemp: 0,
  avgHumidity: 0,
  avgRainfall: 0,
  avgWindSpeed: 0,
  dominantWindDirection: "",
};

export const EmptySuggestion = () => (
  <div className="text-center py-8 space-y-2">
    <CardTitle className="text-primary">Fill out the form!</CardTitle>
    <CardDescription className="text-primary/80">
      Get personalized recommendations by submitting farm details.
    </CardDescription>
  </div>
);

interface FarmDetailsCardProps {
  onSubmit: (formData: z.infer<typeof formSchema>) => Promise<void>;
  isLoading: boolean;
  cropSuggestionData: CropSuggestionResponse | null;
}

function FarmDetailsCard({
  onSubmit,
  isLoading,
  cropSuggestionData,
}: FarmDetailsCardProps) {
  return (
    <Card className="shadow-sm md:col-span-1 h-min md:sticky md:top-24.5">
      <CardHeader>
        <CardTitle className="text-primary">Enter Your Details</CardTitle>
        <CardDescription className="text-primary/80">
          Provide your farm&#39;s location, soil and irrigation info
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FarmDetailsForm
          defaultValues={
            cropSuggestionData
              ? {
                  location: `${cropSuggestionData?.location?.latitude ?? ""}, ${
                    cropSuggestionData?.location?.longitude ?? ""
                  }`,
                  soilType: cropSuggestionData.soilType ?? "",
                  farmSize: String(cropSuggestionData.farmSize),
                  irrigation: cropSuggestionData.irrigationAvailability ?? "",
                }
              : {
                  location: "",
                  soilType: "",
                  farmSize: "",
                  irrigation: "",
                }
          }
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}

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

  const { data } = useCropSuggestionResultQuery(id ?? "", {
    skip: !id || cropSuggestions.some((c) => c._id === id),
  });

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

  // Always load from Redux store or fallback to API result
  useEffect(() => {
    if (id) {
      const local = cropSuggestions.find((c) => c._id === id);
      if (local) {
        setCropSuggestionData(local);
      } else {
        setCropSuggestionData(null); // fallback handled below
      }
    }
  }, [id, cropSuggestions]);

  // Fallback: load from API query result
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
          <FarmDetailsCard
            onSubmit={handleSubmit}
            isLoading={isLoading}
            cropSuggestionData={cropSuggestionData}
          />

          <Card className="shadow-sm md:col-span-2">
            <CardHeader className="flex justify-between items-center z-20">
              <div className="flex-grow">
                {cropSuggestionData && (
                  <>
                    <CardTitle className="text-primary">
                      Crop Recommendations
                    </CardTitle>
                    <CardDescription className="text-primary/80">
                      Based on your farm&#39;s soil, irrigation, and weather.
                    </CardDescription>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleToggleHistory}
                  variant="outline"
                  size="sm"
                  className="text-primary !p-0 border-none shadow-none active:bg-transparent hover:bg-transparent"
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
                  className="text-primary !p-0 border-none shadow-none active:bg-transparent hover:bg-transparent"
                  onClick={() => {
                    setCropSuggestionData(null);
                    router.push("/crop-suggestions"); // id remove korbe
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
                <CropSuggestionHistory
                  history={history as corpHistory[]}
                  router={router}
                  handleToggleHistory={handleToggleHistory}
                  handleLoadMore={handleLoadMore}
                />
              ) : cropSuggestionData ? (
                <>
                  <WeatherConditions
                    weatherData={
                      cropSuggestionData.recommendations?.weathers?.[0] ??
                      DEFAULT_WEATHER_DATA
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
                <EmptySuggestion />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
