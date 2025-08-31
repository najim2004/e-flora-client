import { CropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface NutritionalAndCulinaryProps {
  cropDetails: CropDetails;
}

const NutritionalAndCulinary: React.FC<NutritionalAndCulinaryProps> = ({
  cropDetails,
}) => {
  return (
    <Card id="nutritional-and-culinary" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.leaf className="mr-2 h-6 w-6 text-green-600" />
          Nutritional and Culinary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-600">Nutritional Value</h3>
            <p>{cropDetails?.nutritionalAndCulinary?.nutritionalValue}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Health Benefits</h3>
            <p>{cropDetails?.nutritionalAndCulinary?.healthBenefits}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Culinary Uses</h3>
            <p>{cropDetails?.nutritionalAndCulinary?.culinaryUses}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Storage Tips</h3>
            <p>{cropDetails?.nutritionalAndCulinary?.storageTips}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionalAndCulinary;
