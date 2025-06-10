import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Droplets, Thermometer, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Crop } from "@/types/cropDetails";
import MatchPercentage from "./MatchPercentage";

interface CropOverviewProps {
  crop: Crop;
}

const CropOverview: React.FC<CropOverviewProps> = ({ crop }) => {
  return (
    <Card className="border-green-100 shadow-sm overflow-hidden pt-0">
      <div className="bg-green-100 p-6 flex items-center justify-center">
        <Image
          src={crop.img || "/placeholder.svg"}
          alt={crop.name}
          width={300}
          height={300}
          className="h-48 w-48 object-contain"
        />
      </div>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold text-green-800 mb-1">{crop.name}</h1>
        <p className="text-sm italic text-green-600 mb-4">
          {crop.scientificName}
        </p>

        <MatchPercentage />

        <div className="space-y-3">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Growing Season</p>
              <p className="font-medium text-green-800">
                {crop.season.planting} to {crop.season.harvesting}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Duration</p>
              <p className="font-medium text-green-800">
                {crop.season.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Temperature Range</p>
              <p className="font-medium text-green-800">
                {crop.climate.temperature}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Water Requirement</p>
              <p className="font-medium text-green-800">
                {crop.water.requirements}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-green-800 mb-2">
            Suitable Soil Types
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
              {crop.soil.types}
            </Badge>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-green-800 mb-2">Alternative Crops</h3>
          <div className="flex flex-wrap gap-2">
            {crop.alternatives.map((alt: string, index: number) => (
              <Link href={`/crop-details/${alt.toLowerCase()}`} key={index}>
                <Badge className="bg-white border-green-200 text-green-700 hover:bg-green-50 cursor-pointer">
                  {alt}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropOverview;
