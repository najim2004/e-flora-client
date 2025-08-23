"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Calendar,
  Camera,
  CheckCircle,
  Droplets,
  Heart,
  Leaf,
  Trash2,
  Lock,
  Check,
  HelpCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock data - in real app this would come from props/API
const cropDetails = {
  id: 1,
  name: "Cherry Tomatoes",
  stage: "Flowering",
  status: "Active", // Change to "Active" to see timeline view
  image: "/placeholder.svg?height=200&width=200",
  plantedDate: "2024-01-15",
  expectedHarvest: "2024-03-20",
  nextTask: "Water plants - Due tomorrow at 8:00 AM",
}

// Step-by-step cultivation guide for Pending crops
const cultivationSteps = [
  {
    id: 1,
    title: "Prepare the container",
    description: "Use a container at least 12 inches deep with proper drainage holes. Clean thoroughly before use.",
    completed: true,
    unlocked: true,
  },
  {
    id: 2,
    title: "Prepare soil mixture",
    description: "Mix potting soil with compost in a 3:1 ratio. Ensure good drainage and nutrient content.",
    completed: true,
    unlocked: true,
  },
  {
    id: 3,
    title: "Plant seeds or seedlings",
    description: "Plant seeds 1/4 inch deep or transplant seedlings carefully. Space appropriately.",
    completed: false,
    unlocked: true,
  },
  {
    id: 4,
    title: "Initial watering",
    description: "Water gently until soil is evenly moist but not waterlogged. Use a spray bottle for seeds.",
    completed: false,
    unlocked: false,
  },
  {
    id: 5,
    title: "Provide support structure",
    description: "Install tomato cages or stakes when plants reach 6 inches tall.",
    completed: false,
    unlocked: false,
  },
]

// Activity timeline for Active crops
const activityTimeline = [
  {
    id: 1,
    date: "2024-01-26",
    task: "Water plants",
    type: "water",
    completed: false,
    time: "8:00 AM",
    notes: "",
    crop: "Cherry Tomatoes",
  },
  {
    id: 2,
    date: "2024-01-27",
    task: "Apply fertilizer",
    type: "fertilize",
    completed: false,
    time: "10:00 AM",
    notes: "",
    crop: "Cherry Tomatoes",
  },
  {
    id: 3,
    date: "2024-01-24",
    task: "Pruned lower leaves",
    type: "maintenance",
    completed: true,
    time: "4:00 PM",
    notes: "Removed 3 yellowing leaves to improve air circulation",
    crop: "Cherry Tomatoes",
  },
  {
    id: 4,
    date: "2024-01-22",
    task: "Watered plants",
    type: "water",
    completed: true,
    time: "8:00 AM",
    notes: "Soil was dry, watered thoroughly until drainage",
    crop: "Cherry Tomatoes",
  },
]

const taskTypes = {
  water: { icon: Droplets, color: "bg-blue-500", label: "Water" },
  fertilize: { icon: Leaf, color: "bg-green-500", label: "Fertilize" },
  diagnosis: { icon: Heart, color: "bg-red-500", label: "Check Health" },
  harvest: { icon: Calendar, color: "bg-yellow-500", label: "Harvest" },
  maintenance: { icon: CheckCircle, color: "bg-purple-500", label: "Maintenance" },
} as const

export default function CropDetailsPage() {
  const [completedSteps, setCompletedSteps] = useState(cultivationSteps.filter((step) => step.completed).length)
  const [steps, setSteps] = useState(cultivationSteps)
  const [timeline, setTimeline] = useState(activityTimeline)
  const [filterDate, setFilterDate] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const handleStepComplete = (stepId: number) => {
    setSteps((prev) => {
      const newSteps = prev.map((step) => {
        if (step.id === stepId) {
          return { ...step, completed: true }
        }
        return step
      })

      // Unlock next step
      const currentIndex = newSteps.findIndex((step) => step.id === stepId)
      if (currentIndex < newSteps.length - 1) {
        newSteps[currentIndex + 1].unlocked = true
      }

      setCompletedSteps(newSteps.filter((step) => step.completed).length)
      return newSteps
    })
  }

  const handleTaskComplete = (taskId: number) => {
    setTimeline((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))
  }

  const handleTaskDelete = (taskId: number) => {
    setTimeline((prev) => prev.filter((task) => task.id !== taskId))
  }

  const filteredTimeline = timeline.filter((activity) => {
    const matchesDate = filterDate === "all" || activity.date.includes(filterDate)
    const matchesCategory = filterCategory === "all" || activity.type === filterCategory
    return matchesDate && matchesCategory
  })

  const progressPercentage = (completedSteps / steps.length) * 100

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4s bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-green-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="border-green-200 bg-transparent">
            <Link href="/my-garden">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-green-800">{cropDetails.name}</h1>
            <p className="text-sm text-green-600">
              {cropDetails.stage} • {cropDetails.status}
            </p>
          </div>
          <Badge
            className={
              cropDetails.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }
          >
            {cropDetails.status}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Crop Overview */}
        <Card className="bg-white border-green-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Image
                src={cropDetails.image || "/placeholder.svg"}
                alt={cropDetails.name}
                width={100}
                height={100}
                className="rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Planted</p>
                    <p className="font-medium text-green-700">{cropDetails.plantedDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Expected Harvest</p>
                    <p className="font-medium text-green-700">{cropDetails.expectedHarvest}</p>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">Next Task</p>
                  <p className="text-xs text-orange-600">{cropDetails.nextTask}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conditional Content Based on Status */}
        {cropDetails.status === "Pending" ? (
          /* Step-by-Step Cultivation Guide */
          <>
            <Card className="bg-white border-green-200 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-800">Cultivation Progress</CardTitle>
                  <span className="text-sm text-green-600">
                    {completedSteps}/{steps.length}
                  </span>
                </div>
                <Progress value={progressPercentage} className="mt-2" />
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {steps.map((step) => (
                <Card
                  key={step.id}
                  className={`border shadow-sm transition-all ${
                    step.completed
                      ? "bg-green-50 border-green-200"
                      : step.unlocked
                        ? "bg-white border-green-200"
                        : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed
                            ? "bg-green-600 text-white"
                            : step.unlocked
                              ? "bg-green-100 text-green-600 border-2 border-green-300"
                              : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {step.completed ? (
                          <Check className="h-4 w-4" />
                        ) : step.unlocked ? (
                          <span className="text-sm font-semibold">{step.id}</span>
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h4
                          className={`font-medium mb-2 ${
                            step.completed ? "text-green-800" : step.unlocked ? "text-green-800" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p
                          className={`text-sm mb-3 ${
                            step.completed ? "text-green-600" : step.unlocked ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>

                        {step.unlocked && !step.completed && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStepComplete(step.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Mark as Done
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-600 bg-transparent"
                            >
                              <HelpCircle className="h-4 w-4 mr-1" />
                              How to
                            </Button>
                          </div>
                        )}

                        {step.completed && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600 font-medium">Completed</span>
                          </div>
                        )}

                        {!step.unlocked && (
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-400">Complete previous step to unlock</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Activity Timeline for Active Crops */
          <>
            <Card className="bg-white border-green-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-800">Activity Timeline</CardTitle>
                <div className="flex gap-2 mt-3">
                  <Select value={filterDate} onValueChange={setFilterDate}>
                    <SelectTrigger className="flex-1 border-green-200">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="2024-01">This Month</SelectItem>
                      <SelectItem value="2024-01-26">Today</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="flex-1 border-green-200">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="fertilize">Fertilize</SelectItem>
                      <SelectItem value="diagnosis">Health Check</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {filteredTimeline.map((activity) => {
                const taskConfig = taskTypes[activity.type]
                if (!taskConfig) return null
                const TaskIcon = taskConfig.icon

                return (
                  <Card
                    key={activity.id}
                    className={`border shadow-sm ${
                      activity.completed ? "bg-gray-50 border-gray-200" : "bg-white border-green-200"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${taskConfig.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <TaskIcon className="h-5 w-5 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4
                                className={`font-medium ${activity.completed ? "line-through text-gray-500" : "text-green-800"}`}
                              >
                                {activity.task}
                              </h4>
                              <p className="text-sm text-gray-600">{activity.crop}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{activity.date}</p>
                              <p className="text-xs text-gray-400">{activity.time}</p>
                            </div>
                          </div>

                          {activity.notes && (
                            <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-gray-600">{activity.notes}</div>
                          )}

                          {!activity.completed && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleTaskComplete(activity.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Done
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 bg-transparent"
                                onClick={() => handleTaskDelete(activity.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-200 text-blue-600 bg-transparent"
                              >
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          )}

                          {activity.completed && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {/* Quick Actions */}
        <Card className="bg-white border-green-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Camera className="h-4 w-4 mr-2" />
              Upload Progress Photo
            </Button>
            <Button variant="outline" className="w-full border-green-200 text-green-700 bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Task
            </Button>
            <Button variant="outline" className="w-full border-red-200 text-red-600 bg-transparent">
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Crop
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
