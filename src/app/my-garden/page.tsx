"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Eye,
  Plus,
  TrendingUp,
  Trash2,
  Droplets,
  RotateCcw,
  Gift,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cropData = [
  {
    id: 1,
    name: "Cherry Tomatoes",
    stage: "Flowering",
    lastWatered: "2 days ago",
    nextTask: "Water tomorrow",
    status: "Active",
    image: "/placeholder.svg?height=120&width=120",
    health: 95,
  },
  {
    id: 2,
    name: "Spinach",
    stage: "Mature",
    lastWatered: "1 day ago",
    nextTask: "Harvest ready",
    status: "Active",
    image: "/placeholder.svg?height=120&width=120",
    health: 88,
  },
  {
    id: 3,
    name: "Basil",
    stage: "Growing",
    lastWatered: "6 hours ago",
    nextTask: "Fertilize in 3 days",
    status: "Active",
    image: "/placeholder.svg?height=120&width=120",
    health: 92,
  },
  {
    id: 4,
    name: "Lettuce",
    stage: "Seedling",
    lastWatered: "Just now",
    nextTask: "Check growth",
    status: "Pending",
    image: "/placeholder.svg?height=120&width=120",
    health: 78,
  },
];

const removedCrops = [
  {
    id: 5,
    name: "Bell Peppers",
    removedDate: "2024-01-20",
    reason: "Poor growth",
    recoverable: true,
  },
  {
    id: 6,
    name: "Mint",
    removedDate: "2024-01-15",
    reason: "Completed harvest",
    recoverable: false,
  },
];

const todaysTasks = [
  { crop: "Cherry Tomatoes", task: "Water", time: "8:00 AM" },
  { crop: "Basil", task: "Check pests", time: "6:00 PM" },
  { crop: "Spinach", task: "Harvest", time: "7:00 AM" },
];

export default function MyGardenPage() {
  const [showRemoved, setShowRemoved] = useState(false);

  const activeCrops = cropData.filter(
    (crop) => crop.status === "Active"
  ).length;
  const pendingCrops = cropData.filter(
    (crop) => crop.status === "Pending"
  ).length;
  const removedCount = removedCrops.length;

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Summary Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border-green-200 shadow-md p-0">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div className="text-center w-full md:text-start">
                  <p className="text-sm font-medium text-green-600">
                    Active Crops
                  </p>
                  <p className="text-3xl font-bold text-green-800">
                    {activeCrops}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-xl hidden md:flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-yellow-200 shadow-md p-0">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div className="text-center w-full md:text-start">
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-800">
                    {pendingCrops}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-xl hidden md:flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-md p-0">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div className="text-center w-full md:text-start">
                  <p className="text-sm font-medium text-gray-600">Removed</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {removedCount}
                  </p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-xl hidden md:flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Promotional Card */}
            <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 text-white shadow-lg">
              <CardContent className="md:p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-4">
                    <div className="h-12 min-w-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Gift className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        🌱 Premium Organic Fertilizer
                      </h3>
                      <p className="text-green-100">
                        Boost your crop growth with 20% off premium fertilizers!
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-white text-green-600 hover:bg-green-50"
                  >
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Crop Cards */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-green-800">
                Your Crops
              </h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Crop
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cropData.map((crop) => (
                <Card
                  key={crop.id}
                  className="bg-white border-green-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-green-800">
                        {crop.name}
                      </CardTitle>
                      <Badge
                        variant={
                          crop.status === "Active" ? "default" : "secondary"
                        }
                        className={
                          crop.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {crop.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={crop.image || "/placeholder.svg"}
                        alt={crop.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                          Stage:{" "}
                          <span className="font-medium text-green-700">
                            {crop.stage}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <Droplets className="h-3 w-3 inline mr-1" />
                          Last watered: {crop.lastWatered}
                        </p>
                        <Badge
                          variant="outline"
                          className="text-xs border-green-300 text-green-700"
                        >
                          {crop.nextTask}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${crop.health}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      Health: {crop.health}%
                    </p>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                      >
                        <Link href={`/my-garden/crops/${crop.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Removed Section */}
            <Card className="bg-white border-gray-200 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-800">
                    Removed Crops
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowRemoved(!showRemoved)}
                    className="text-gray-600"
                  >
                    {showRemoved ? "Hide" : "Show"} ({removedCount})
                  </Button>
                </div>
              </CardHeader>
              {showRemoved && (
                <CardContent>
                  <div className="space-y-3">
                    {removedCrops.map((crop) => (
                      <div
                        key={crop.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {crop.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Removed: {crop.removedDate}
                          </p>
                          <p className="text-xs text-gray-500">
                            Reason: {crop.reason}
                          </p>
                        </div>
                        {crop.recoverable && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-200 text-green-700"
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Recover
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Tasks */}
            <Card className="bg-white border-green-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Calendar className="h-5 w-5" />
                  Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysTasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">
                          {task.task}
                        </p>
                        <p className="text-xs text-green-600">
                          {task.crop} • {task.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                >
                  <Link href="/calendar">View Full Calendar</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mini Calendar */}
            <Card className="bg-white border-green-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-green-800">January 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="p-2 font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                    <div
                      key={date}
                      className={`p-2 rounded ${
                        date === 25
                          ? "bg-green-600 text-white"
                          : [26, 27, 28].includes(date)
                          ? "bg-green-100 text-green-800"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
