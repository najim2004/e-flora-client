import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CloudRain,
  Droplets,
  Leaf,
  Shovel,
  Sun,
  Thermometer,
} from "lucide-react";
import { Crop } from "@/types/cropDetails";

interface AboutCropProps {
  crop: Crop;
}

const AboutCrop: React.FC<AboutCropProps> = ({ crop }) => {
  return (
    <Card className="border-green-100 shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="text-green-800">
          About {crop.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-green-700">{crop.description}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Climate Requirements
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Thermometer className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Temperature</p>
                  <p className="font-medium text-green-800">
                    {crop.climate.temperature}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CloudRain className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Rainfall</p>
                  <p className="font-medium text-green-800">
                    {crop.climate.rainfall}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Sun className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Humidity</p>
                  <p className="font-medium text-green-800">
                    {crop.climate.humidity}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Soil Requirements
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Shovel className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Soil Types</p>
                  <p className="font-medium text-green-800">
                    {crop.soil.types.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Soil pH</p>
                  <p className="font-medium text-green-800">
                    {crop.soil.ph}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Droplets className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Drainage</p>
                  <p className="font-medium text-green-800">
                    {crop.soil.drainage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutCrop;
