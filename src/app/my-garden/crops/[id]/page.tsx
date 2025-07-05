"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  Camera,
  Droplets,
  Heart,
  Leaf,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cropDetails = {
  id: 1,
  name: "Cherry Tomatoes",
  stage: "Flowering",
  health: 95,
  status: "Active",
  image: "/placeholder.svg?height=200&width=200",
  plantedDate: "2024-01-15",
  expectedHarvest: "2024-03-20",
};

const nextTask = {
  title: "Water Today",
  description:
    "Your tomatoes need watering. The soil moisture is below optimal level.",
  priority: "high",
  dueTime: "2:00 PM",
};

const taskTimeline = [
  {
    date: "2024-01-26",
    task: "Water plants",
    type: "water",
    completed: false,
    time: "2:00 PM",
  },
  {
    date: "2024-01-27",
    task: "Apply fertilizer",
    type: "fertilize",
    completed: false,
    time: "10:00 AM",
  },
  {
    date: "2024-01-28",
    task: "Check for pests",
    type: "diagnosis",
    completed: false,
    time: "6:00 PM",
  },
  {
    date: "2024-01-24",
    task: "Pruned lower leaves",
    type: "maintenance",
    completed: true,
    time: "4:00 PM",
  },
  {
    date: "2024-01-22",
    task: "Watered plants",
    type: "water",
    completed: true,
    time: "8:00 AM",
  },
];

const plantingSteps = [
  {
    id: 1,
    title: "Prepare soil mixture",
    description: "Mix potting soil with compost (3:1 ratio)",
    completed: true,
  },
  {
    id: 2,
    title: "Plant seeds",
    description: "Plant seeds 1/4 inch deep, 2 inches apart",
    completed: true,
  },
  {
    id: 3,
    title: "Initial watering",
    description: "Water gently until soil is moist",
    completed: true,
  },
  {
    id: 4,
    title: "Provide support",
    description: "Install stakes or cages for support",
    completed: false,
  },
  {
    id: 5,
    title: "Monitor growth",
    description: "Check daily for germination and growth",
    completed: false,
  },
];

export default function CropDetailsPage() {
  const [completedSteps, setCompletedSteps] = useState(
    plantingSteps.filter((step) => step.completed).length
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleStepToggle = (stepId: number) => {
    const updatedSteps = plantingSteps.map((step) =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    setCompletedSteps(updatedSteps.filter((step) => step.completed).length);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const progressPercentage = (completedSteps / plantingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Crop Overview */}
        <Card className="mb-6 bg-white border-green-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={cropDetails.image || "/placeholder.svg"}
                alt={cropDetails.name}
                width={200}
                height={200}
                className="rounded-lg object-cover mx-auto md:mx-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold text-green-800">
                    {cropDetails.name}
                  </h2>
                  <Badge className="bg-green-100 text-green-800">
                    {cropDetails.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Stage</p>
                    <p className="font-medium text-green-700">
                      {cropDetails.stage}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Health Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${cropDetails.health}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-green-700">
                        {cropDetails.health}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Planted Date</p>
                    <p className="font-medium text-green-700">
                      {cropDetails.plantedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Harvest</p>
                    <p className="font-medium text-green-700">
                      {cropDetails.expectedHarvest}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Task Highlight */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Droplets className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{nextTask.title}</h3>
                  <p className="text-blue-100">{nextTask.description}</p>
                  <p className="text-sm text-blue-200 mt-1">
                    Due: {nextTask.dueTime}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Timeline */}
          <Card className="bg-white border-green-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Calendar className="h-5 w-5" />
                Task Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taskTimeline.map((task, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        task.completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium ${
                            task.completed
                              ? "text-gray-500 line-through"
                              : "text-green-800"
                          }`}
                        >
                          {task.task}
                        </p>
                        <span className="text-xs text-gray-500">
                          {task.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{task.date}</p>
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
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Planting Guide */}
          <Card className="bg-white border-green-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-800">
                Planting Guide Progress
              </CardTitle>
              <div className="flex items-center gap-2">
                <Progress value={progressPercentage} className="flex-1" />
                <span className="text-sm text-green-600">
                  {completedSteps}/{plantingSteps.length}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {plantingSteps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <Checkbox
                      checked={step.completed}
                      onCheckedChange={() => handleStepToggle(step.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          step.completed
                            ? "text-gray-500 line-through"
                            : "text-green-800"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
