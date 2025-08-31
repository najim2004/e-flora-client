import { CropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface FunFactsProps {
  cropDetails: CropDetails;
}

const FunFacts: React.FC<FunFactsProps> = ({ cropDetails }) => {
  return (
    <Card id="fun-facts" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.smile className="mr-2 h-6 w-6 text-green-600" />
          Fun Facts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          {cropDetails?.funFacts?.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunFacts;
