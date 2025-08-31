import { CropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface CompanionPlantingProps {
  cropDetails: CropDetails;
}

const CompanionPlanting: React.FC<CompanionPlantingProps> = ({
  cropDetails,
}) => {
  return (
    <Card id="companion-planting" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.users className="mr-2 h-6 w-6 text-green-600" />
          Companion Planting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Companion Plants</h3>
            {cropDetails?.companionPlanting?.companionPlants?.map(
              (plant, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-semibold">{plant?.name}</h4>
                  <p>{plant?.benefit}</p>
                </div>
              )
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Avoid Near</h3>
            <p>{cropDetails?.companionPlanting?.avoidNear?.join(", ")}</p>
          </div>
          {cropDetails?.companionPlanting?.notes && (
            <div>
              <h3 className="font-semibold text-gray-600">Notes</h3>
              <p>{cropDetails?.companionPlanting?.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanionPlanting;
