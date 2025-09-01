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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Loader2, X, Leaf, Package } from "lucide-react";
import { getSocket } from "@/lib/socket";
import { useRequestDiseaseDetectionMutation } from "@/redux/features/diseaseDetection/diseaseDetectionApiSlice";
import { errorToast } from "@/components/common/CustomToast";
import { GardenCropSelector } from "@/components/disease-detection/GardenCropSelector";

interface DetectionProgress {
  status: string;
  progress: number;
  message: string;
}

export default function DiseaseDetectionPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // State
  const [mode, setMode] = useState<"MANUAL" | "GARDEN_CROP">("MANUAL");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropName, setCropName] = useState("");
  const [selectedGardenCropId, setSelectedGardenCropId] = useState<
    string | null
  >(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState<DetectionProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [requestDetection, { isLoading }] =
    useRequestDiseaseDetectionMutation();

  // Socket.IO effect
  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinDiseaseDetectionRoom");

    const handleProgress = (data: DetectionProgress) => setProgress(data);
    const handleResult = (payload: { resultId: string }) =>
      router.push(`/disease-detection/result/${payload.resultId}`);
    const handleError = (error: { message?: string }) => {
      errorToast(error.message || "Disease detection failed!");
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

  // File handling logic
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
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // Submission logic
  const handleSubmit = async () => {
    if (!imageFile) return errorToast("Please select an image first.");

    if (mode === "MANUAL" && !cropName.trim()) {
      return errorToast("Crop name is required for Manual mode.");
    } else if (mode === "GARDEN_CROP" && !selectedGardenCropId) {
      return errorToast("Please select a crop from your garden.");
    }

    try {
      await requestDetection({
        image: imageFile,
        description,
        mode,
        cropName: mode === "MANUAL" ? cropName.trim() : undefined,
        gardenCropId:
          mode === "GARDEN_CROP" ? selectedGardenCropId! : undefined,
      }).unwrap();
    } catch {
      errorToast("Failed to start disease detection process.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Image Upload */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary text-xl md:text-2xl">
                Upload Plant Image
              </CardTitle>
              <CardDescription className="text-primary/80">
                Provide a clear photo of the affected plant part.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onClick={!previewUrl ? handleUploadClick : undefined}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  !previewUrl ? "cursor-pointer" : ""
                } ${
                  dragOver
                    ? "bg-secondary/60 border-primary/80"
                    : "bg-gray-50/80 border-border"
                }`}
              >
                {previewUrl ? (
                  <div className="relative w-full max-w-md mx-auto">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={500}
                      height={500}
                      className="mx-auto rounded-md object-contain max-h-96 w-full"
                    />
                    {isLoading && ( // Progress indicator integrated into image preview
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/60 p-4 text-white transition-opacity duration-300 opacity-100">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p className="font-semibold text-lg">
                          {progress?.status || "Initiating..."}
                        </p>
                        <p className="text-sm mt-1 text-gray-200">
                          {progress?.message || "Please wait"}
                        </p>
                        {progress && (
                          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                            <div
                              className="bg-green-400 h-2.5 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${progress.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 rounded-full h-8 w-8 bg-red-500/80 hover:bg-red-600/90"
                      aria-label="Remove Image"
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    {" "}
                    {/* Default upload state */}
                    <Upload className="h-12 w-12 text-primary/80 mx-auto mb-4" />
                    <p className="text-primary/80 mb-2 font-semibold">
                      Drag & drop or click to browse
                    </p>
                    <p className="text-sm text-primary/60">
                      Max file size: 5MB
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      ref={inputRef}
                      onChange={handleFileInput}
                    />
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Detection Mode and Details */}
          <div className="flex flex-col gap-6">
            {/* Mode Selection Tabs */}
            <Tabs
              value={mode}
              onValueChange={(v) => setMode(v as "MANUAL" | "GARDEN_CROP")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="MANUAL">
                  <Leaf className="h-4 w-4 mr-2" />
                  Manual Input
                </TabsTrigger>
                <TabsTrigger value="GARDEN_CROP">
                  <Package className="h-4 w-4 mr-2" />
                  From My Garden
                </TabsTrigger>
              </TabsList>
              <TabsContent value="MANUAL">
                {" "}
                {/* Manual Input Tab Content */}
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Crop Details</CardTitle>
                    <CardDescription>
                      Enter the details of the crop shown in the image.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary/80">
                        Crop Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        placeholder="e.g., Tomato, Rice, Wheat"
                        className="w-full border border-border focus:border-primary/80 rounded-md px-3 py-2 text-sm text-green-900"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="GARDEN_CROP">
                {" "}
                {/* From My Garden Tab Content */}
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Select from Your Garden</CardTitle>
                    <CardDescription>
                      Choose the crop from your garden that is shown in the
                      image.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GardenCropSelector
                      selectedCropId={selectedGardenCropId}
                      onCropSelect={setSelectedGardenCropId}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Shared Fields and Submit Button */}
            <Card className="border-border shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary/80">
                    Additional Description (Optional)
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe any additional details..."
                    className="border-border focus:border-primary/80 resize-none"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/80 w-full mt-6"
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
