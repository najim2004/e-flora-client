import { CropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface EconomicAspectsProps {
  cropDetails: CropDetails;
}

const EconomicAspects: React.FC<EconomicAspectsProps> = ({ cropDetails }) => {
  return (
    <Card id="economic-aspects" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.dollarSign className="mr-2 h-6 w-6 text-green-600" />
          Economic Aspects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-600">Market Demand</h3>
            <p>{cropDetails?.economicAspects?.marketDemand}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Seed Sourcing</h3>
            {cropDetails?.economicAspects?.seedSourcing?.map(
              (source, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-semibold">{source.source}</h4>
                  <p>{source.details}</p>
                </div>
              )
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Cost Breakdown</h3>
            <ul className="list-disc list-inside">
              {cropDetails?.economicAspects?.costBreakdown?.map(
                (item, index) => (
                  <li key={index}>
                    {item.item}: {item.cost} {item.unit}
                    {item.note && ` (${item.note})`}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicAspects;
