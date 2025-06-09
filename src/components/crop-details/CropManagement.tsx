import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crop } from "@/types/cropDetails";
import FertilizerApplication from "./FertilizerApplication";
import WeedManagement from "./WeedManagement";
import PestManagement from "./PestManagement";
import DiseaseManagement from "./DiseaseManagement";

interface CropManagementProps {
  crop: Crop;
}

const CropManagement: React.FC<CropManagementProps> = ({ crop }) => {
  return (
    <Card className="border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-green-800">
          Crop Management
        </CardTitle>
        <CardDescription className="text-green-700">
          Fertilizer application, weed control, and pest management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FertilizerApplication crop={crop} />
          <WeedManagement />
          <PestManagement crop={crop} />
          <DiseaseManagement crop={crop} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CropManagement;
