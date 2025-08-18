"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Leaf,
  MapPin,
  Target,
  Sun,
  Layers,
  Square,
  Droplets,
  Trees,
  Home,
} from "lucide-react";
import { Input } from "@/types/cropSuggestion";

export interface GardenDetailsProps {
  data: Input
}

const GardenDetails: React.FC<GardenDetailsProps> = ({ data }) => {
  const fields = [
    {
      icon: MapPin,
      label: "Location",
      value: `${data?.location?.city}, ${data?.location?.state}, ${
        data?.location?.country
      }${data?.location?.zipCode ? ` (${data?.location?.zipCode})` : ""}`,
    },
    { icon: Target, label: "Purpose", value: data?.purpose },
    { icon: Sun, label: "Sunlight", value: data?.sunlight },
    { icon: Layers, label: "Soil Type", value: data?.soilType },
    { icon: Square, label: "Area", value: `${data?.area} SQF` },
    { icon: Droplets, label: "Water Source", value: data?.waterSource },
    { icon: Trees, label: "Plant Type", value: data?.plantType.join(", ") },
    { icon: Home, label: "Garden Type", value: data?.gardenType },
  ];

  return (
    <Card className="mb-8 border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center text-green-800">
          <Leaf className="h-5 w-5 mr-2" />
          Garden Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 *:flex *:justify-between *:items-center *:text-wrap *:gap-4 text-end">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {value}
              </CardDescription>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GardenDetails;
