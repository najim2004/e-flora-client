import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

interface RemovedCrop {
  id: number;
  name: string;
  removedDate: string;
  reason: string;
  recoverable?: boolean;
}

interface RemovedCropsSectionProps {
  crops: RemovedCrop[];
}

export default function RemovedCropsSection({ crops }: RemovedCropsSectionProps) {
  const [showRemoved, setShowRemoved] = useState(false);
  const removedCount = crops.length;

  return (
    <Card className="bg-white border-gray-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-800">Removed Crops</CardTitle>
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
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{crop.name}</p>
                  <p className="text-sm text-gray-600">Removed: {crop.removedDate}</p>
                  <p className="text-xs text-gray-500">Reason: {crop.reason}</p>
                </div>
                {crop.recoverable && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-200 text-green-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" /> Recover
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
