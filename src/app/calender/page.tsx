"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Leaf,
  Heart,
  Plus,
  Check,
  Trash2,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const taskTypes = {
  water: {
    icon: Droplets,
    color: "bg-blue-500",
    label: "Water",
    lightColor: "bg-blue-50 text-blue-800",
  },
  fertilize: {
    icon: Leaf,
    color: "bg-green-500",
    label: "Fertilize",
    lightColor: "bg-green-50 text-green-800",
  },
  diagnosis: {
    icon: Heart,
    color: "bg-red-500",
    label: "Check Health",
    lightColor: "bg-red-50 text-red-800",
  },
  harvest: {
    icon: CalendarIcon,
    color: "bg-yellow-500",
    label: "Harvest",
    lightColor: "bg-yellow-50 text-yellow-800",
  },
  maintenance: {
    icon: CalendarIcon,
    color: "bg-purple-500",
    label: "Maintenance",
    lightColor: "bg-purple-50 text-purple-800",
  },
} as const;

type TaskType = keyof typeof taskTypes;

const calendarTasks = {
  "2024-01-25": [
    {
      id: 1,
      crop: "Cherry Tomatoes",
      task: "Water plants",
      time: "8:00 AM",
      type: "water" as TaskType,
      completed: false,
    },
    {
      id: 2,
      crop: "Spinach",
      task: "Harvest leaves",
      time: "7:00 AM",
      type: "harvest" as TaskType,
      completed: false,
    },
    {
      id: 3,
      crop: "Basil",
      task: "Check for pests",
      time: "6:00 PM",
      type: "diagnosis" as TaskType,
      completed: true,
    },
  ],
  "2024-01-26": [
    {
      id: 4,
      crop: "Basil",
      task: "Apply fertilizer",
      time: "10:00 AM",
      type: "fertilize" as TaskType,
      completed: false,
    },
    {
      id: 5,
      crop: "Lettuce",
      task: "Water seedlings",
      time: "8:30 AM",
      type: "water" as TaskType,
      completed: false,
    },
  ],
  "2024-01-27": [
    {
      id: 6,
      crop: "Lettuce",
      task: "Check growth progress",
      time: "6:00 PM",
      type: "diagnosis" as TaskType,
      completed: false,
    },
    {
      id: 7,
      crop: "Cherry Tomatoes",
      task: "Water plants",
      time: "8:00 AM",
      type: "water" as TaskType,
      completed: false,
    },
  ],
  "2024-01-28": [
    {
      id: 8,
      crop: "Spinach",
      task: "Water plants",
      time: "8:00 AM",
      type: "water" as TaskType,
      completed: false,
    },
  ],
  "2024-01-30": [
    {
      id: 9,
      crop: "Basil",
      task: "Harvest fresh leaves",
      time: "9:00 AM",
      type: "harvest" as TaskType,
      completed: false,
    },
    {
      id: 10,
      crop: "Cherry Tomatoes",
      task: "Check for diseases",
      time: "6:00 PM",
      type: "diagnosis" as TaskType,
      completed: false,
    },
  ],
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string>("2024-01-25");
  const [filterType, setFilterType] = useState<string>("all");
  const [currentMonth, setCurrentMonth] = useState("January 2024");
  const [tasks, setTasks] = useState(calendarTasks);

  const getDaysInMonth = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };

  const getTasksForDate = (date: number) => {
    const dateKey = `2024-01-${date.toString().padStart(2, "0")}`;
    const dateTasks = tasks[dateKey] || [];

    if (filterType === "all") return dateTasks;
    return dateTasks.filter((task) => task.type === filterType);
  };

  const hasTasksOnDate = (date: number) => {
    return getTasksForDate(date).length > 0;
  };

  const getTaskTypesForDate = (date: number) => {
    const dateTasks = getTasksForDate(date);
    const types = [...new Set(dateTasks.map((task) => task.type))];
    return types;
  };

  const handleTaskComplete = (taskId: number, dateKey: string) => {
    setTasks((prev) => ({
      ...prev,
      [dateKey]:
        prev[dateKey]?.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        ) || [],
    }));
  };

  const handleTaskDelete = (taskId: number, dateKey: string) => {
    setTasks((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey]?.filter((task) => task.id !== taskId) || [],
    }));
  };

  const selectedDateTasks = tasks[selectedDate] || [];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-green-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-800">
              Garden Calendar
            </h1>
            <p className="text-sm text-green-600">
              Track your garden activities
            </p>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Calendar Controls */}
        <Card className="bg-white border-green-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-200 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold text-green-800">
                  {currentMonth}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-200 bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full border-green-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="water">Water Only</SelectItem>
                <SelectItem value="fertilize">Fertilize Only</SelectItem>
                <SelectItem value="diagnosis">Health Check</SelectItem>
                <SelectItem value="harvest">Harvest Only</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Full-Width Calendar */}
        <Card className="bg-white border-green-200 shadow-sm">
          <CardContent className="p-2">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day Headers */}
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div
                  key={day}
                  className="p-2 text-center font-medium text-gray-600 text-sm"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {getDaysInMonth().map((date) => {
                const taskTypesForDate = getTaskTypesForDate(date);
                const dateKey = `2024-01-${date.toString().padStart(2, "0")}`;
                const isSelected = selectedDate === dateKey;
                const isToday = date === 25;

                return (
                  <div
                    key={date}
                    className={`
                      p-2 min-h-[60px] border rounded-lg cursor-pointer transition-all
                      ${
                        isSelected
                          ? "bg-green-100 border-green-300 shadow-sm"
                          : "bg-white border-gray-200 hover:bg-green-50"
                      }
                      ${isToday ? "ring-2 ring-green-500" : ""}
                    `}
                    onClick={() => setSelectedDate(dateKey)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isToday ? "text-green-800" : "text-gray-700"
                        }`}
                      >
                        {date}
                      </span>
                      {isToday && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>

                    {/* Task Indicators */}
                    <div className="flex flex-wrap gap-1">
                      {taskTypesForDate.slice(0, 3).map((type) => {
                        const taskConfig = taskTypes[type];
                        if (!taskConfig) return null;
                        return (
                          <div
                            key={type}
                            className={`w-1.5 h-1.5 rounded-full ${taskConfig.color}`}
                            title={taskConfig.label}
                          />
                        );
                      })}
                      {taskTypesForDate.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{taskTypesForDate.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Tasks */}
        <Card className="bg-white border-green-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDateTasks.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  No tasks scheduled for this date
                </p>
                <Button
                  variant="outline"
                  className="mt-3 border-green-200 text-green-700 bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            ) : (
              selectedDateTasks.map((task) => {
                const taskConfig = taskTypes[task.type];
                if (!taskConfig) return null;
                const TaskIcon = taskConfig.icon;

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-all ${
                      task.completed
                        ? "bg-gray-50 border-gray-200 opacity-75"
                        : "bg-white border-green-200 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${taskConfig.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <TaskIcon className="h-5 w-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4
                              className={`font-medium ${
                                task.completed
                                  ? "line-through text-gray-500"
                                  : "text-green-800"
                              }`}
                            >
                              {task.task}
                            </h4>
                            <p className="text-sm text-gray-600">{task.crop}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={taskConfig.lightColor}
                          >
                            {task.time}
                          </Badge>
                        </div>

                        {!task.completed && (
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 flex-1"
                              onClick={() =>
                                handleTaskComplete(task.id, selectedDate)
                              }
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Done
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                              onClick={() =>
                                handleTaskDelete(task.id, selectedDate)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                            >
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        {task.completed && (
                          <div className="flex items-center gap-2 mt-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">
                              Completed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Task Legend */}
        <Card className="bg-white border-green-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-sm">Task Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(taskTypes).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${config.color} flex items-center justify-center`}
                    >
                      <Icon className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-sm text-green-700">
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
