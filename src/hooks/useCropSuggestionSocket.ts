// hooks/useCropSuggestionSocket.ts
import { getSocket } from "@/lib/socket";
import { useEffect, useState } from "react";

interface ProgressUpdate {
  status:
    | "initiated"
    | "analyzing"
    | "generatingData"
    | "savingToDB"
    | "completed"
    | "failed";
  progress: number;
  message?: string;
  timestamp: string;
}

interface CompletedData {
  resultId: string;
}

export interface CropDetailsUpdate {
  status: "success" | "failed" | "pending";
  slug?: string;
  detailsId: string;
  timestamp: string;
}

interface GardenAddingStatus {
  success: boolean;
  message: string;
  cropId:string;
  timestamp: string;
}

export const useCropSuggestionSocket = () => {
  const [progress, setProgress] = useState<ProgressUpdate | null>(null);
  const [completed, setCompleted] = useState<CompletedData | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [gardenAddingStatus, setGardenAddingStatus] =
    useState<GardenAddingStatus | null>(null);
  const [cropDetails, setCropDetails] = useState<CropDetailsUpdate | null>(
    null
  );

  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinCropSuggestionRoom");

    socket.on("cropSuggestionProgressUpdate", setProgress);
    socket.on("cropSuggestionCompleted", ({ data }) => setCompleted(data));
    socket.on("cropSuggestionFailed", ({ message }) => setFailed(message));
    socket.on("individualCropDetailsUpdate", setCropDetails);
    socket.on("gardenAddingStatus", setGardenAddingStatus);

    return () => {
      socket.emit("leaveCropSuggestionRoom");
      socket.off("cropSuggestionProgressUpdate");
      socket.off("cropSuggestionCompleted");
      socket.off("cropSuggestionFailed");
      socket.off("individualCropDetailsUpdate");
    };
  }, []);

  return { progress, completed, failed, cropDetails, gardenAddingStatus };
};
