"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Heart, Leaf, Calendar as CalendarIcon } from "lucide-react";
import { Calendar as UiCalendar } from "@/components/ui/calendar";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import PlantingGuideDisplay from "@/components/garden/PlantingGuideDisplay";

interface PlantingStep {
  _id?: string;
  id: number;
  title: string;
  description: string;
  instructions: string[];
  tips?: string;
  completed: boolean;
}

interface Task {
  _id: string;
  taskName: string;
  dueDate: string; // Assuming date string
  status: "pending" | "completed";
  type: "water" | "fertilize" | "diagnosis" | "maintenance";
}

interface CropDetailsData {
  _id: string;
  cropName: string;
  scientificName: string;
  healthScore: number;
  status: "active" | "pending" | "removed";
  currentStage: string;
  plantingDate: string;
  image: {
    url: string;
  };
  plantingGuide: {
    plantingSteps: PlantingStep[];
  };
  tasks: Task[];
}

export default function CropDetailsPage() {
  const params = useParams();
  const cropId = params.id as string;

  const [cropDetails, setCropDetails] = useState<CropDetailsData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [plantingSteps, setPlantingSteps] = useState<PlantingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/garden/crops/${cropId}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const data: CropDetailsData = result.data;

        setCropDetails(data);
        setTasks(data.tasks);
        setPlantingSteps(data.plantingGuide.plantingSteps);
        console.log("Fetched crop details:", data);
        console.log("Planting Date:", data.plantingDate);
        console.log(
          "Tasks due dates:",
          data.tasks.map((task) => task.dueDate)
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (cropId) {
      fetchCropData();
    }
  }, [cropId]);

  const isPlantingComplete = cropDetails?.status === "active";

  const handleCompleteStep = async (stepObjectId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/garden/complete-planting-step`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gardenCropId: cropId, stepId: stepObjectId }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const { plantingGuide, gardenCropStatus } = result.data;

      setPlantingSteps(plantingGuide.plantingSteps);
      setCropDetails((prev) =>
        prev ? { ...prev, status: gardenCropStatus } : null
      );
    } catch (err) {
      console.error("Failed to complete planting step:", err);
      setError("Failed to complete planting step.");
    }
  };

  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return tasks.filter(
      (task) => format(new Date(task.dueDate), "yyyy-MM-dd") === dateKey
    );
  }, [selectedDate, tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50">
        <p className="text-green-700 text-lg">Loading crop details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!cropDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50">
        <p className="text-gray-700 text-lg">No crop details found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Crop Overview */}
        <Card className="mb-6 bg-white border-green-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={cropDetails.image?.url || "/placeholder.svg"}
                alt={cropDetails.cropName}
                width={200}
                height={200}
                className="rounded-lg object-cover mx-auto md:mx-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold text-green-800">
                    {cropDetails.cropName}
                  </h2>
                  <Badge className="bg-green-100 text-green-800">
                    {cropDetails.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Stage</p>
                    <p className="font-medium text-green-700">
                      {cropDetails.currentStage}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Health Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${cropDetails.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-green-700">
                        {cropDetails.healthScore}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Planted Date</p>
                    <p className="font-medium text-green-700">
                      {cropDetails.plantingDate
                        ? format(new Date(cropDetails.plantingDate), "PPP")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Scientific Name</p>
                    <p className="font-medium text-green-700">
                      {cropDetails.scientificName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isPlantingComplete ? (
          <>
            {/* Next Task Highlight */}
            {tasks.length > 0 && (
              <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Droplets className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {tasks[0].taskName}
                        </h3>
                        <p className="text-blue-100">
                          Due: {format(new Date(tasks[0].dueDate), "PPP")}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Mark Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar and Tasks for Selected Date */}
              <div className="lg:col-span-1">
                <Card className="bg-white border-green-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <UiCalendar
                        mode="single"
                        selected={selectedDate || undefined}
                        onSelect={(date) => setSelectedDate(date || null)}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Tasks for{" "}
                        {selectedDate
                          ? format(selectedDate, "MMM d, yyyy")
                          : "No date selected"}
                      </h4>
                      {tasksForSelectedDate.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                          No tasks for this date.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {tasksForSelectedDate.map((task) => (
                            <div
                              key={task._id}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  task.status === "completed"
                                    ? "bg-green-500"
                                    : "bg-blue-500"
                                }`}
                              ></span>
                              {task.taskName} (
                              {format(new Date(task.dueDate), "p")})
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Task Timeline - Takes 2 columns on desktop */}
              <div className="lg:col-span-2">
                {/* Search Input */}
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                {/* Task Timeline Card */}
                <Card className="bg-white border-green-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <CalendarIcon className="h-5 w-5" />
                      Task Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredTasks.length === 0 ? (
                        <p className="text-gray-500 text-sm">No tasks found.</p>
                      ) : (
                        filteredTasks.map((task) => (
                          <div
                            key={task._id}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${
                                task.status === "completed"
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p
                                  className={`text-sm font-medium ${
                                    task.status === "completed"
                                      ? "text-gray-500 line-through"
                                      : "text-green-800"
                                  }`}
                                >
                                  {task.taskName}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {format(new Date(task.dueDate), "p")}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {format(new Date(task.dueDate), "PPP")}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {task.type === "water" && (
                                <Droplets className="h-4 w-4 text-blue-500" />
                              )}
                              {task.type === "fertilize" && (
                                <Leaf className="h-4 w-4 text-green-500" />
                              )}
                              {task.type === "diagnosis" && (
                                <Heart className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <PlantingGuideDisplay
            plantingSteps={plantingSteps}
            onCompleteStep={handleCompleteStep}
          />
        )}
      </div>
    </div>
  );
}
