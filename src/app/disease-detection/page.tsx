"use client";

import { useEffect, useRef, useState, DragEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, Check, Loader2, X } from "lucide-react";
import { getSocket } from "@/lib/socket";
import { useRequestDiseaseDetectionMutation } from "@/redux/features/diseaseDetection/diseaseDetectionApiSlice";
import { errorToast } from "@/components/customToast";
import { CropSuggestionProgress } from "@/types/cropSuggestion";
import ProgressDisplay from "@/components/custom-progress";

export default function DiseaseDetectionPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropName, setCropName] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState<CropSuggestionProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [requestDetection, { isLoading }] =
    useRequestDiseaseDetectionMutation();

  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinDiseaseDetectionRoom");

    const handleProgress = (data: CropSuggestionProgress) => setProgress(data);
    const handleResult = (payload: { resultId: string }) =>
      router.push(`/disease-detection/result/${payload.resultId}`);
    const handleError = (error: unknown) => {
      console.log(error);
      errorToast("Disease detection failed!");
      setProgress(null);
    };

    socket.on("diseaseDetection:progressUpdate", handleProgress);
    socket.on("diseaseDetection:result", handleResult);
    socket.on("diseaseDetection:error", handleError);

    return () => {
      socket.emit("leaveDiseaseDetectionRoom");
      socket.off("diseaseDetection:progressUpdate", handleProgress);
      socket.off("diseaseDetection:result", handleResult);
      socket.off("diseaseDetection:error", handleError);
    };
  }, [router]);

  const handleFileChange = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      errorToast("File size should not exceed 5MB");
      return;
    }
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFileChange(file);
    else errorToast("Only image files are allowed.");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleUploadClick = () => inputRef.current?.click();

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) return errorToast("Please select an image first.");
    if (!cropName.trim()) return errorToast("Crop name is required.");

    try {
      await requestDetection({
        image: imageFile,
        cropName: cropName.trim(),
        description,
      }).unwrap();
    } catch {
      errorToast("Failed to request disease detection.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-green-50 flex flex-col justify-center">
      <div className="max-w-7xl w-full mx-auto px-4 py-8">
        <Card className="border-green-100 shadow-sm max-w-2xl mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-primary text-xl md:text-2xl">
              Upload Image
            </CardTitle>
            <CardDescription className="text-primary/80">
              Please upload a clear, well-lit photo of the affected plant part.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div
              onClick={handleUploadClick}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              className={`relative border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors cursor-pointer
                ${
                  dragOver
                    ? "bg-green-100 border-green-500"
                    : "bg-green-50 border-green-200"
                }`}
            >
              {previewUrl ? (
                <div className="relative w-full max-w-xs mx-auto">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={400}
                    height={400}
                    className="mx-auto rounded-md object-contain max-h-72 w-full"
                  />
                  {progress !== null && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/30 p-4">
                      <ProgressDisplay
                        status={progress.status}
                        progress={progress.progress}
                        message={progress.message}
                        timestamp={progress.timestamp}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded-full hover:bg-primary/80"
                    aria-label="Remove Image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-primary/80 mb-2">
                    Drag & drop image here or click to browse
                  </p>
                  <p className="text-sm text-green-600">
                    Supported formats: JPG, PNG (Max size: 5MB)
                  </p>
                  <Button
                    type="button"
                    className="mt-6 bg-green-600 hover:bg-primary/80"
                  >
                    Select Image
                  </Button>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg, image/png"
                className="hidden"
                ref={inputRef}
                onChange={handleFileInput}
              />
            </div>

            {/* Crop Name Field */}
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium text-primary/80">
                Crop Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g., Tomato, Rice, Wheat"
                className="w-full border border-green-200 focus:border-green-500 rounded-md px-3 py-2 text-sm text-green-900"
                required
              />
            </div>

            {/* Description Field */}
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium text-primary/80">
                Additional Description (Optional)
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe any additional details about the plant condition..."
                className="border-green-200 focus:border-green-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-primary/80 w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  "Start Detection"
                )}
              </Button>
            </div>

            {/* Guidelines */}
            <div className="mt-8">
              <h3 className="font-medium text-primary mb-2">
                Guidelines for best results:
              </h3>
              <ul className="space-y-2 text-primary/80 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Take close-up photos of the affected area
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Ensure good lighting (natural daylight is best)
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Include both healthy and diseased parts for comparison
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Avoid shadows and blurry images
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
