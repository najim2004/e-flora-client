"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CropSuggestionProgressComponentProps {
  progress: {
    status: string;
    progress: number;
    message?: string;
    timestamp: Date;
  } | null;
}

export default function CropSuggestionProgressComponent({
  progress,
}: CropSuggestionProgressComponentProps) {
  return (
    <div>
      {progress ? (
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <div className="mb-4">
              <p className="text-sm font-medium text-primary/80">
                {progress.message || "Processing..."}
              </p>
              <Progress value={progress.progress} className="h-2 bg-green-200 text-primary/80" />
              <p className="text-xs text-primary/80 mt-1">
                {progress.progress}% Completed
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>No progress to display</div>
      )}
    </div>
  );
}
