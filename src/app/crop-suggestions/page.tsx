"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useCropSuggestionHistoryMutation,
  useRequestCropSuggestionMutation,
} from "@/redux/features/cropSuggestions/cropSuggestionApiSlice";
import { errorToast, successToast } from "@/components/customToast";
import FarmDetailsForm, {
  formSchema,
} from "@/components/crop-suggestions/FarmDetailsForm";
import CropSuggestionHistory from "@/components/crop-suggestions/CropSuggestionHistory";
import { getSocket } from "@/lib/socket";
import { insertCropSuggestion } from "@/redux/features/cropSuggestions/cropSuggestionSlice";
import type {
  CropSuggestionProgress,
  CropSuggestionResponse,
} from "@/types/cropSuggestion";
import { z } from "zod";

export default function CropSuggestionsPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const history = useSelector(
    (state: RootState) => state.cropSuggestion.history
  );

  const [showHistory, setShowHistory] = useState(false);
  const [page, setPage] = useState(1);
  const [progress, setProgress] = useState<CropSuggestionProgress | null>(null);
  const limit = 10;

  const router = useRouter();
  const dispatch = useDispatch();

  const [getHistories] = useCropSuggestionHistoryMutation();
  const [requestSuggestion, { isLoading }] = useRequestCropSuggestionMutation();

  // Fetch history page
  const fetchHistory = useCallback(
    async (newPage: number) => {
      try {
        await getHistories({ page: newPage, limit }).unwrap();
      } catch {
        errorToast("Failed to fetch history!");
      }
    },
    [getHistories]
  );

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

  // Socket event handlers
  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinCropSuggestionRoom");

    socket.on(
      "cropSuggestionProgressUpdate",
      (progressData: CropSuggestionProgress) => {
        setProgress(progressData);
      }
    );

    socket.on(
      "cropSuggestionCompleted",
      ({ data }: { data: CropSuggestionResponse }) => {
        if (data) {
          dispatch(insertCropSuggestion(data));
          setProgress(null);
          router.push(`/crop-suggestions/${data._id}`);
        }
      }
    );

    socket.on("cropSuggestionFailed", ({ message }: { message: string }) => {
      errorToast(message || "Suggestion failed");
      setProgress(null);
    });

    return () => {
      socket.emit("leaveCropSuggestionRoom");
      socket.off("cropSuggestionProgressUpdate");
      socket.off("cropSuggestionCompleted");
      socket.off("cropSuggestionFailed");
    };
  }, [dispatch, router]);

  // Submit form handler
  const handleSubmit = async (
    formData: z.infer<typeof formSchema>
  ): Promise<void> => {
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
        successToast("Request submitted. Processing...");
        setProgress({ progress: 0, status: "pending", timestamp: new Date() });
      } else {
        errorToast(res.error?.message || "Submission failed");
      }
    } catch {
      errorToast("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 md:relative">
          {/* Farm Details Card */}
          <div className="shadow-sm md:col-span-1 h-min md:sticky md:top-24.5 bg-white rounded p-6">
            <h2 className="text-primary text-xl font-semibold mb-2">
              Enter Your Details
            </h2>
            <p className="text-primary/80 mb-4">
              Provide your farm's location, soil and irrigation info
            </p>
            <FarmDetailsForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* History + Progress Section */}
          <div className="shadow-sm md:col-span-2 bg-white rounded p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-primary font-semibold text-lg">History</h3>
              <button
                onClick={handleToggleHistory}
                className="text-primary underline underline-offset-2"
              >
                {showHistory ? "Hide History" : "Show History"}
              </button>
            </div>

            {progress ? (
              <div className="p-4 bg-green-100 rounded text-green-900 font-semibold">
                Processing: {progress?.progress ?? 0}%
              </div>
            ) : showHistory ? (
              <CropSuggestionHistory
                history={history}
                handleLoadMore={handleLoadMore}
                handleToggleHistory={handleToggleHistory}
              />
            ) : (
              <p className="text-primary/80 italic">
                Submit a farm detail to see history here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
