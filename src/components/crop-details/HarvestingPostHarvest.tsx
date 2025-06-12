import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crop, CultivationGuide } from "@/types/cropDetails";
import ListItem from "./ListItem";

interface HarvestingPostHarvestProps {
  crop: Crop;
}

const HarvestingPostHarvest: React.FC<HarvestingPostHarvestProps> = ({ crop }) => {
  return (
    <Card className="border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-primary">
          Harvesting & Post-Harvest
        </CardTitle>
        <CardDescription className="text-primary/80">
          When and how to harvest, plus post-harvest handling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {crop.harvesting && crop.harvesting.map((harvest: CultivationGuide, index: number) => (
            <div key={index}>
              <h3 className="font-medium text-primary mb-3">
                {harvest.title}
              </h3>
              <ul className="space-y-2 text-primary/80">
                {harvest.guides && harvest.guides.map((guide: string, guideIndex: number) => (
                  <ListItem key={guideIndex}>{guide}</ListItem>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HarvestingPostHarvest;
