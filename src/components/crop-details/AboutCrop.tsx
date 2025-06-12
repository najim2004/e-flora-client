import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="border-border shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="text-primary">About {crop?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-primary/80">{crop?.description}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-primary mb-3">
              Climate Requirements
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Thermometer className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary">Temperature</p>
                  <p className="font-medium text-primary">
                    {crop?.climate?.temperature}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <CloudRain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary">Rainfall</p>
                  <p className="font-medium text-primary">
                    {crop?.climate?.rainfall}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Sun className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary">Humidity</p>
                  <p className="font-medium text-primary">
                    {crop?.climate?.humidity}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-primary mb-3">
              Soil Requirements
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Shovel className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary">Soil Types</p>
                  <p className="font-medium text-primary">
                    {crop?.soil?.types}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary">Soil pH</p>
                  <p className="font-medium text-primary">{crop?.soil?.ph}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary">Drainage</p>
                  <p className="font-medium text-primary">
                    {crop?.soil?.drainage}
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
