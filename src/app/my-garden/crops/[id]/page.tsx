"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplets, Heart, Leaf, Calendar } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { format } from "date-fns";

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
    title: "Prepare Soil Mixture",
    description: "Mix potting soil with compost in a 3:1 ratio",
    details: [
      "Get high-quality potting soil and organic compost",
      "Mix 3 parts potting soil with 1 part compost",
      "Add perlite for better drainage (optional)",
      "Ensure the mixture is well combined",
    ],
    tips: "Use well-draining soil to prevent root rot",
    completed: false,
  },
  {
    id: 2,
    title: "Prepare Planting Container",
    description: "Set up the proper container with drainage",
    details: [
      "Choose a container at least 12 inches deep",
      "Ensure drainage holes are present",
      "Add gravel at the bottom for drainage",
      "Fill container with prepared soil mix",
    ],
    tips: "Container size affects plant growth and yield",
    completed: false,
  },
  {
    id: 3,
    title: "Plant Seeds Correctly",
    description: "Plant seeds at proper depth and spacing",
    details: [
      "Make holes 1/4 inch deep",
      "Space seeds 2 inches apart",
      "Place 2-3 seeds per hole",
      "Cover lightly with soil",
    ],
    tips: "Don't plant too deep - seeds need warmth to germinate",
    completed: false,
  },
  {
    id: 4,
    title: "Initial Care Setup",
    description: "Provide optimal conditions for germination",
    details: [
      "Water gently until soil is moist",
      "Place in warm location (70-75°F)",
      "Ensure 6-8 hours of sunlight",
      "Cover with clear plastic to retain moisture",
    ],
    tips: "Remove plastic cover once sprouts appear",
    completed: false,
  },
  {
    id: 5,
    title: "Support Structure",
    description: "Install support system for growing plants",
    details: [
      "Install stakes or cages",
      "Place supports without disturbing roots",
      "Ensure supports are sturdy",
      "Prepare plant ties",
    ],
    tips: "Install supports early to avoid root damage later",
    completed: false,
  },
];

export default function CropDetailsPage() {
  const [steps, setSteps] = useState(plantingSteps);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const completedStepsCount = useMemo(
    () => steps.filter((s) => s.completed).length,
    [steps]
  );
  const totalSteps = steps.length;
  const isPlantingComplete = completedStepsCount === totalSteps;
  const progressPercentage = (completedStepsCount / totalSteps) * 100;

  const currentStep = useMemo(() => steps.find((s) => !s.completed), [steps]);

  const handleCompleteStep = (stepId: number) => {
    const newSteps = steps.map((step) =>
      step.id === stepId ? { ...step, completed: true } : step
    );
    setSteps(newSteps);
  };

  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return taskTimeline.filter((task) => task.date === dateKey);
  }, [selectedDate]);

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

        {isPlantingComplete ? (
          <>
            {/* Next Task Highlight */}
            <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Droplets className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {nextTask.title}
                      </h3>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar and Tasks for Selected Date */}
              <div className="lg:col-span-1">
                <Card className="bg-white border-green-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    
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
                          {tasksForSelectedDate.map((task, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  task.completed ? "bg-green-500" : "bg-blue-500"
                                }`}
                              ></span>
                              {task.task} ({task.time})
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
                {/* Task Timeline Card */}
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
              </div>

              {/* Weather Updates - Takes 1 column */}
              <div>
                {/* New Weather Card goes here */}
                <Card className="bg-white border-green-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      </svg>
                      Weather Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-blue-50">
                        <p className="text-sm text-blue-600 mb-1">
                          Temperature
                        </p>
                        <p className="text-xl font-semibold text-blue-700">
                          24°C
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-blue-50">
                        <p className="text-sm text-blue-600 mb-1">Humidity</p>
                        <p className="text-xl font-semibold text-blue-700">
                          65%
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-blue-50">
                        <p className="text-sm text-blue-600 mb-1">Rainfall</p>
                        <p className="text-xl font-semibold text-blue-700">
                          0mm
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Growth Analytics - Takes 2 columns */}
              <div className="lg:col-span-2">
                {/* New Growth Analytics Card goes here */}
                <Card className="bg-white border-green-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      Growth Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-green-800">
                            Height
                          </span>
                          <span className="text-sm text-gray-600">15cm</span>
                        </div>
                        <Progress value={60} className="h-2 bg-green-100" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-green-800">
                            Leaf Count
                          </span>
                          <span className="text-sm text-gray-600">
                            12 leaves
                          </span>
                        </div>
                        <Progress value={75} className="h-2 bg-green-100" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-green-800">
                            Fruit Development
                          </span>
                          <span className="text-sm text-gray-600">
                            4 fruits
                          </span>
                        </div>
                        <Progress value={40} className="h-2 bg-green-100" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <Card className="bg-white border-green-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Planting Guide
                </CardTitle>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Complete these steps in order to ensure successful growth
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={progressPercentage}
                      className="flex-1 h-2 bg-green-100"
                    />
                    <span className="text-sm font-medium text-green-600">
                      {completedStepsCount} of {totalSteps} steps completed
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`rounded-lg border ${
                      step.completed
                        ? "bg-green-50 border-green-200"
                        : currentStep?.id === step.id
                        ? "bg-white border-green-500 shadow-lg"
                        : "bg-gray-50 border-gray-200"
                    } transition-all duration-300`}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {step.completed ? (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              step.id
                            )}
                          </div>
                          <div>
                            <h3
                              className={`text-lg font-semibold ${
                                step.completed
                                  ? "text-green-800"
                                  : "text-gray-800"
                              }`}
                            >
                              {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                        {currentStep?.id === step.id && (
                          <Button
                            onClick={() => handleCompleteStep(step.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Complete Step
                          </Button>
                        )}
                      </div>
                      {currentStep?.id === step.id && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-medium text-green-800 mb-2">
                              Step Details:
                            </h4>
                            <ul className="space-y-2">
                              {step.details.map((detail, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-green-500 mt-1">•</span>
                                  <span className="text-gray-700">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 flex items-start gap-2 bg-yellow-50 p-3 rounded-lg">
                              <svg
                                className="w-5 h-5 text-yellow-600 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <p className="text-sm text-yellow-800">
                                {step.tips}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
