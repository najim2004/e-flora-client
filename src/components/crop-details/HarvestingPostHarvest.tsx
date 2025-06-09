import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crop } from "@/types/cropDetails";
import ListItem from "./ListItem";

interface HarvestingPostHarvestProps {
  crop: Crop;
}

const HarvestingPostHarvest: React.FC<HarvestingPostHarvestProps> = ({ crop }) => {
  return (
    <Card className="border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-green-800">
          Harvesting & Post-Harvest
        </CardTitle>
        <CardDescription className="text-green-700">
          When and how to harvest, plus post-harvest handling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Harvesting Indicators
            </h3>
            <ul className="space-y-2 text-green-700">
              <ListItem>{crop.harvesting.indicators}</ListItem>
              <ListItem>
                Grain moisture content should be around 20-22%
              </ListItem>
              <ListItem>
                Typically ready for harvest 30-35 days after flowering
              </ListItem>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Harvesting Methods
            </h3>
            <ul className="space-y-2 text-green-700">
              <ListItem>{crop.harvesting.method}</ListItem>
              <ListItem>
                Cut the crop at 15-20 cm above ground level
              </ListItem>
              <ListItem>
                Avoid harvesting during rainy days to prevent grain quality
                deterioration
              </ListItem>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Threshing
            </h3>
            <ul className="space-y-2 text-green-700">
              <ListItem>
                Thresh immediately after harvesting or within 2-3 days
              </ListItem>
              <ListItem>
                Use pedal thresher, power thresher, or traditional methods
              </ListItem>
              <ListItem>
                Clean the threshed grain to remove chaff, straw, and other
                impurities
              </ListItem>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Drying
            </h3>
            <ul className="space-y-2 text-green-700">
              <ListItem>
                Dry grains to reduce moisture content to 12-14% for safe
                storage
              </ListItem>
              <ListItem>
                Spread grains in thin layers (3-5 cm) on clean surfaces
              </ListItem>
              <ListItem>
                Turn grains every 1-2 hours for uniform drying
              </ListItem>
              <ListItem>
                Avoid over-drying as it can cause grain breakage
              </ListItem>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Storage
            </h3>
            <ul className="space-y-2 text-green-700">
              <ListItem>
                Store in clean, dry, and well-ventilated containers or bags
              </ListItem>
              <ListItem>
                Keep storage area free from rodents and insects
              </ListItem>
              <ListItem>
                Place bags on wooden pallets to prevent moisture absorption
                from the floor
              </ListItem>
              <ListItem>
                Regularly inspect stored grain for signs of pests or spoilage
              </ListItem>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HarvestingPostHarvest;
