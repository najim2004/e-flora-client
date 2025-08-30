import { ICropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface SustainabilityTipsProps {
  cropDetails: ICropDetails;
}

const SustainabilityTips: React.FC<SustainabilityTipsProps> = ({
  cropDetails,
}) => {
  return (
    <Card id="sustainability-tips" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.lightbulb className="mr-2 h-6 w-6 text-green-600" />
          Sustainability Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          {cropDetails.sustainabilityTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SustainabilityTips;