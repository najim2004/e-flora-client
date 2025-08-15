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

interface CropDetailsUpdate {
  status: "success" | "failed";
  slug?: string;
  scientificName: string;
  timestamp: string;
}

export const useCropSuggestionSocket = () => {
  const [progress, setProgress] = useState<ProgressUpdate | null>(null);
  const [completed, setCompleted] = useState<CompletedData | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
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

    return () => {
      socket.emit("leaveCropSuggestionRoom");
      socket.off("cropSuggestionProgressUpdate");
      socket.off("cropSuggestionCompleted");
      socket.off("cropSuggestionFailed");
      socket.off("individualCropDetailsUpdate");
    };
  }, []);

  return { progress, completed, failed, cropDetails };
};
