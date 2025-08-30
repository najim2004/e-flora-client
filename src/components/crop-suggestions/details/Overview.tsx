import { ICropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface OverviewProps {
  cropDetails: ICropDetails;
}

const Overview: React.FC<OverviewProps> = ({ cropDetails }) => {
  return (
    <Card id="overview" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.bookOpen className="mr-2 h-6 w-6 text-green-600" />
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{cropDetails.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-gray-600">Type</h3>
            <p>{cropDetails.type}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Variety</h3>
            <p>{cropDetails.variety}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Difficulty</h3>
            <p>{cropDetails.difficultyLevel}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Perennial</h3>
            <p>{cropDetails.isPerennial ? "Yes" : "No"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Crop Cycle</h3>
            <p>{cropDetails.cropCycle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Overview;