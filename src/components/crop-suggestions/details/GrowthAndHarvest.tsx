import { ICropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface GrowthAndHarvestProps {
  cropDetails: ICropDetails;
}

const GrowthAndHarvest: React.FC<GrowthAndHarvestProps> = ({ cropDetails }) => {
  return (
    <Card id="growth-and-harvest" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.sprout className="mr-2 h-6 w-6 text-green-600" />
          Growth and Harvest
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-600">Propagation Methods</h3>
            <p>{cropDetails.growthAndHarvest.propagationMethods.join(", ")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Germination Time</h3>
            <p>{cropDetails.growthAndHarvest.germinationTime}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Maturity Time</h3>
            <p>{cropDetails.growthAndHarvest.maturityTime}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Harvest Time</h3>
            <p>{cropDetails.growthAndHarvest.harvestTime}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Yield Per Plant</h3>
            <p>{cropDetails.growthAndHarvest.yieldPerPlant}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Harvesting Tips</h3>
            <ul className="list-disc list-inside">
              {cropDetails.growthAndHarvest.harvestingTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Pollination Type</h3>
            <p>{cropDetails.growthAndHarvest.pollinationType}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthAndHarvest;