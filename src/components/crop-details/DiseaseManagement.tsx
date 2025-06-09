import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Crop, DiseaseManagement as DiseaseManagementType } from "@/types/cropDetails";

interface DiseaseManagementProps {
  crop: Crop;
}

const DiseaseManagement: React.FC<DiseaseManagementProps> = ({ crop }) => {
  return (
    <div>
      <h3 className="font-medium text-green-800 mb-3">
        Disease Management
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {crop.management.diseaseManagement.map((disease: DiseaseManagementType, index: number) => (
          <AccordionItem key={index} value={`disease-${index}`}>
            <AccordionTrigger className="text-green-800 hover:text-green-600">
              {disease.name}
            </AccordionTrigger>
            <AccordionContent className="text-green-700">
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-green-700">
                    Symptoms:
                  </p>
                  <p>{disease.symptoms}</p>
                </div>
                <div>
                  <p className="font-medium text-green-700">
                    Management:
                  </p>
                  <p>{disease.managements}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DiseaseManagement;
