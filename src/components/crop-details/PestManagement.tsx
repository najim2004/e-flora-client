import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Crop, PestManagement as PestManagementType } from "@/types/cropDetails";

interface PestManagementProps {
  crop: Crop;
}

const PestManagement: React.FC<PestManagementProps> = ({ crop }) => {
  return (
    <div>
      <h3 className="font-medium text-green-800 mb-3">
        Pest Management
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {crop.management.pestsManagement.map((pest: PestManagementType, index: number) => (
          <AccordionItem key={index} value={`pest-${index}`}>
            <AccordionTrigger className="text-green-800 hover:text-green-600">
              {pest.name}
            </AccordionTrigger>
            <AccordionContent className="text-green-700">
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-green-700">
                    Symptoms:
                  </p>
                  <p>{pest.symptoms}</p>
                </div>
                <div>
                  <p className="font-medium text-green-700">
                    Management:
                  </p>
                  <p>{pest.managements}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PestManagement;
