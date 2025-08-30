import { ICropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface CareRequirementsProps {
  cropDetails: ICropDetails;
}

const CareRequirements: React.FC<CareRequirementsProps> = ({ cropDetails }) => {
  return (
    <Card id="care-requirements" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.heart className="mr-2 h-6 w-6 text-green-600" />
          Care Requirements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-600 flex items-center">
              <Icons.droplets className="mr-2 h-5 w-5" /> Water Requirement
            </h3>
            <p>{cropDetails.careRequirements.water.requirement}</p>
            <h4 className="font-semibold mt-2">Frequency</h4>
            <p>{cropDetails.careRequirements.water.frequency}</p>
            <h4 className="font-semibold mt-2">Conservation Tips</h4>
            <ul className="list-disc list-inside">
              {cropDetails.careRequirements.water.waterConservationTips.map(
                (tip, index) => (
                  <li key={index}>{tip}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600 flex items-center">
              <Icons.flaskConical className="mr-2 h-5 w-5" /> Fertilizer
            </h3>
            <p>Type: {cropDetails.careRequirements.fertilizer.type}</p>
            <p>Schedule: {cropDetails.careRequirements.fertilizer.schedule}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600 flex items-center">
              <Icons.scissors className="mr-2 h-5 w-5" /> Pruning
            </h3>
            <p>{cropDetails.careRequirements.pruning}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Support</h3>
            <p>{cropDetails.careRequirements.support}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Space Optimization Tips</h3>
            <ul className="list-disc list-inside">
              {cropDetails.careRequirements.spaceOptimizationTips.map(
                (tip, index) => (
                  <li key={index}>{tip}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Tools Required</h3>
            <p>{cropDetails.careRequirements.toolsRequired.join(", ")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareRequirements;