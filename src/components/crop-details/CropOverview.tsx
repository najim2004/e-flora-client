import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Droplets, Thermometer, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crop } from "@/types/cropDetails";
import MatchPercentage from "./MatchPercentage";

interface CropOverviewProps {
  crop: Crop;
}

const CropOverview: React.FC<CropOverviewProps> = ({ crop }) => {
  return (
    <Card className="border-border shadow-sm overflow-hidden pt-0">
      <div className="bg-secondary p-6 flex items-center justify-center">
        <Image
          src={crop.img || "/placeholder.svg"}
          alt={crop.name}
          width={300}
          height={300}
          className="h-48 w-48 object-contain"
        />
      </div>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-1">{crop.name}</h1>
        <p className="text-sm italic text-primary mb-4">
          {crop.scientificName}
        </p>

        <MatchPercentage />

        <div className="space-y-3">
          <div className="flex items-center">
            <Calendar className="min-h-5 min-w-5 text-primary mr-3" />
            <div>
              <p className="text-primary font-medium">Growing Season</p>
              <p className="text-sm text-primary/80">
                {crop.season.planting} to {crop.season.harvesting}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="min-h-5 min-w-5 text-primary mr-3" />
            <div>
              <p className="text-primary font-medium">Duration</p>
              <p className="text-sm text-primary/80">{crop.season.duration}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Thermometer className="min-h-5 min-w-5 text-primary mr-3" />
            <div>
              <p className="text-primary font-medium">Temperature Range</p>
              <p className="text-sm text-primary/80">
                {crop.climate.temperature}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Droplets className="min-h-5 min-w-5 text-primary mr-3" />
            <div>
              <p className="text-primary font-medium">Water Requirement</p>
              <p className="text-sm text-primary/80">
                {crop.water.requirements}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-primary font-medium mb-2">Suitable Soil Types</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-secondary/60 text-primary hover:bg-green-200">
              {crop.soil.types}
            </Badge>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-primary mb-2">Alternative Crops</h3>
          <div className="flex flex-wrap gap-2">
            {crop.alternatives.map((alt: string, index: number) => (
              <Link href={`/crop-details/${alt.toLowerCase()}`} key={index}>
                <Badge className="bg-white border-border text-primary hover:bg-secondary cursor-pointer">
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
