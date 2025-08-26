import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

import type { Crop } from '@/types/Garden';

interface ArchivedCropsSectionProps {
  crops: Crop[];
}

function isRecoverable(updatedAt: string): boolean {
  const now = new Date();
  const updated = new Date(updatedAt);
  const diffMilliseconds = now.getTime() - updated.getTime();
  const daysDiff = diffMilliseconds / (1000 * 60 * 60 * 24);
  return daysDiff <= 3;
}

export default function ArchivedCropsSection({ crops }: ArchivedCropsSectionProps) {
  const [showArchived, setShowArchived] = useState(false);
  const archivedCount = crops.length;

  return (
    <Card className="bg-white border-gray-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-800">Archived Crops</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowArchived(!showArchived)}
            className="text-gray-600"
          >
            {showArchived ? "Hide" : "Show"} ({archivedCount})
          </Button>
        </div>
      </CardHeader>
      {showArchived && (
        <CardContent>
          <div className="space-y-3">
            {crops.map((crop) => {
              const recoverable = isRecoverable(crop.updatedAt);
              return (
                <div
                  key={crop._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{crop.cropName}</p>
                    <p className="text-sm text-gray-600">Removed: {new Date(crop.updatedAt).toLocaleDateString()}</p>
                  </div>
                  {recoverable && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 text-green-700"
                    >
                      <RotateCcw className="h-4 w-4 mr-1" /> Recover
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
