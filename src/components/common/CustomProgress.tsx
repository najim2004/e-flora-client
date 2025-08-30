"use client";

import { useState, useEffect } from "react";
import {
  X,
  Play,
  Search,
  Database,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProgressStatus =
  | "initiated"
  | "analyzing"
  | "generatingData"
  | "savingToDB"
  | "completed"
  | "failed";

export interface ProgressData {
  status: ProgressStatus;
  progress: number;
  message?: string;
}

interface ProgressModalProps {
  data: ProgressData;
  isOpen: boolean;
  onClose?: () => void;
}

const statusConfig = {
  initiated: {
    icon: Play,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    progressColor: "bg-blue-500",
    title: "Started",
    description: "Process has started...",
  },
  analyzing: {
    icon: Search,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    progressColor: "bg-purple-500",
    title: "Analyzing",
    description: "Analyzing data...",
  },
  generatingData: {
    icon: Database,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/20",
    progressColor: "bg-indigo-500",
    title: "Generating Data",
    description: "Generating recommendations...",
  },
  savingToDB: {
    icon: Save,
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    progressColor: "bg-orange-500",
    title: "Saving",
    description: "Saving data to database...",
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    progressColor: "bg-green-500",
    title: "Completed",
    description: "Process completed successfully!",
  },
  failed: {
    icon: AlertCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    progressColor: "bg-red-500",
    title: "Failed",
    description: "Process failed due to some issues.",
  },
};

export function ProgressModal({ data, isOpen, onClose }: ProgressModalProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const config = statusConfig[data.status];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(data.progress), 100);
    return () => clearTimeout(timer);
  }, [data.progress]);

  if (!isOpen) return null;

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className={cn("px-6 py-8 text-center", config.bgColor)}>
          <div
            className={cn("inline-flex p-4 rounded-full mb-4", config.bgColor)}
          >
            <Icon className={cn("w-8 h-8", config.color)} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {config.title}
          </h2>
          <p className="text-muted-foreground">
            {data.message || config.description}
          </p>
        </div>

        <div className="px-6 py-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                Progress
              </span>
              <span className="text-sm font-bold text-foreground">
                {Math.round(data.progress)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out",
                  config.progressColor
                )}
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Last updated: {formatTime(new Date())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
