import { ICropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface RegionalSuitabilityProps {
  cropDetails: ICropDetails;
}

const RegionalSuitability: React.FC<RegionalSuitabilityProps> = ({
  cropDetails,
}) => {
  return (
    <Card id="regional-suitability" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.mapPin className="mr-2 h-6 w-6 text-green-600" />
          Regional Suitability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-600">Suitable Regions</h3>
            <p>{cropDetails.regionalSuitability.suitableRegions.join(", ")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Urban Gardening Notes</h3>
            <p>{cropDetails.regionalSuitability.urbanGardeningNotes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalSuitability;