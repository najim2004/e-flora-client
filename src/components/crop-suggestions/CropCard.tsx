import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, Droplets, Clock, Plus, Loader } from "lucide-react";
import { MdOutlineErrorOutline } from "react-icons/md";

import Image from "next/image";
import { CropCardType } from "@/types/cropSuggestion";

interface CropCardProps {
  crop: CropCardType;
  getSunlightColor: (sunlight: string) => string;
  getWaterColor: (water: string) => string;
  getDifficultyColor: (difficulty: string) => string;
}

const CropCard: React.FC<CropCardProps> = ({
  crop,
  getSunlightColor,
  getWaterColor,
  getDifficultyColor,
}) => {
  return (
    <Card
      key={crop.name}
      className="hover:shadow-lg transition-shadow border-green-100"
    >
      <CardHeader className="pb-4">
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-green-50">
          <Image
            src={crop?.image?.url || "/placeholder.svg"}
            alt={crop.name}
            fill
            className="object-cover"
          />
          {crop?.image?.index == "default_image" && (
            <span className="absolute bottom-5 mx-auto text-center w-full text-gray-400 text-lg md:text-2xl font-medium z-20">
              Image Not Found
            </span>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-800">{crop.name}</CardTitle>
            <Badge
              className={
                getDifficultyColor && getDifficultyColor(crop.difficulty)
              }
            >
              {crop.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            {crop.scientificName}
          </p>
          <CardDescription>{crop.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-grow">
        <div className="flex-grow-1">
          {/* Key Info Icons */}
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center space-x-1">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span
                className={`${
                  getSunlightColor && getSunlightColor(crop.sunlight || "")
                } px-1.5 rounded-md`}
              >
                {crop.sunlight}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span
                className={`${
                  getWaterColor && getWaterColor(crop.waterNeed || "")
                } px-1.5 rounded-md`}
              >
                {crop.waterNeed}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-600">{crop.maturityTime}</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-800">Features:</h4>
            <div className="flex flex-wrap gap-1">
              {crop.features?.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            disabled={crop.details.status !== "success"}
            size="sm"
            className={`flex-1 ${
              crop.details.status == "failed"
                ? "bg-destructive hover:bg-destructive text-white hover:text-white"
                : ""
            }`}
          >
            {crop.details.status == "success" ? (
              "Learn More"
            ) : crop.details.status == "failed" ? (
              <>
                <MdOutlineErrorOutline />
                failed
              </>
            ) : (
              <Loader className="size-6 text-primary animate-spin" />
            )}
          </Button>
          <Button
            size="sm"
            disabled={crop.details.status == "pending"}
            className="flex-1 bg-primary/80 hover:bg-primary"
          >
            {crop.details.status == "failed" ? (
              "Regenerate"
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add to Garden
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropCard;
