import { getSocket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { ProgressUpdate } from "./useCropSuggestionSocket";
interface DetectionResult {
  resultId: string;
}

interface DetectionError {
  message?: string;
}

export const useDiseaseDetectionSocket = () => {
  const [progress, setProgress] = useState<ProgressUpdate | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<DetectionError | null>(null);

  // Function to reset all states
  const reset = () => {
    setProgress(null);
    setResult(null);
    setError(null);
  };

  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinDiseaseDetectionRoom");

    const handleProgress = (data: ProgressUpdate) => setProgress(data);
    const handleResult = (payload: DetectionResult) => setResult(payload);
    const handleError = (err: DetectionError) => setError(err);

    socket.on("diseaseDetection:progressUpdate", handleProgress);
    socket.on("diseaseDetection:result", handleResult);
    socket.on("diseaseDetection:error", handleError);

    return () => {
      socket.emit("leaveDiseaseDetectionRoom");
      socket.off("diseaseDetection:progressUpdate");
      socket.off("diseaseDetection:result");
      socket.off("diseaseDetection:error");
    };
  }, []);

  return { progress, result, error, reset };
};