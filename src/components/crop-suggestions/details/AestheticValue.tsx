import { ICropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface AestheticValueProps {
  cropDetails: ICropDetails;
}

const AestheticValue: React.FC<AestheticValueProps> = ({ cropDetails }) => {
  return (
    <Card id="aesthetic-value" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.flower className="mr-2 h-6 w-6 text-green-600" />
          Aesthetic Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{cropDetails.aestheticValue.description}</p>
        <div>
          <h3 className="font-semibold text-gray-600">Tips</h3>
          <p>{cropDetails.aestheticValue.tips}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AestheticValue;