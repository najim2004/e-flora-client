import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Eye, Trash2, Plus } from "lucide-react";

import type { Crop } from "@/types/Garden";

interface CropListProps {
  crops: Crop[];
}

function CropCard({ crop }: { crop: Crop }) {
  return (
    <Card className="bg-white border-green-100 shadow-md hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 space-y-0 focus-visible:ring-2 focus-visible:ring-green-300">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-green-800">
            {crop.cropName}
          </CardTitle>
          <Badge
            variant={crop.status === "Active" ? "default" : "secondary"}
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
            src={crop.image?.url || "/placeholder.svg"}
            alt={crop.image?.index || "crop"}
            width={80}
            height={80}
            className="rounded-lg size-20 object-cover object-center"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">
              Stage:{" "}
              <Badge
                variant="outline"
                className="text-xs border-green-300 text-green-700"
              >
                {crop.currentStage}
              </Badge>
            </p>

            <span className="text-sm font-medium text-green-700">
              Next task: {crop.nextTask || "No task found"}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${crop.healthScore}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Health: {crop?.healthScore}%
        </p>
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
          >
            <Link href={`/garden/crops/${crop._id}`}>
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
  );
}

export default function CropList({ crops }: CropListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-green-800">Your Crops</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Crop
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crops?.map((crop) => (
          <CropCard key={crop._id} crop={crop} />
        ))}
      </div>
    </div>
  );
}
