import { CropDetails } from "@/types/cropSuggestion";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface PestAndDiseaseManagementProps {
  cropDetails: CropDetails;
}

const PestAndDiseaseManagement: React.FC<PestAndDiseaseManagementProps> = ({
  cropDetails,
}) => {
  return (
    <Card id="pest-and-disease-management" className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icons.shield className="mr-2 h-6 w-6 text-green-600" />
          Pest and Disease Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Common Diseases</h3>
            {cropDetails?.pestAndDiseaseManagement?.commonDiseases?.map(
              (disease, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">{disease?.name}</h4>
                  <p>
                    <strong>Symptoms:</strong> {disease?.symptoms}
                  </p>
                  <p>
                    <strong>Treatment:</strong> {disease?.treatment}
                  </p>
                </div>
              )
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Common Pests</h3>
            {cropDetails?.pestAndDiseaseManagement?.commonPests?.map(
              (pest, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">{pest?.name}</h4>
                  <p>
                    <strong>Symptoms:</strong> {pest?.symptoms}
                  </p>
                  <p>
                    <strong>Treatment:</strong> {pest?.treatment}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PestAndDiseaseManagement;
