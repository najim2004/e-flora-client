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
      <h3 className="font-medium text-primary mb-3">
        Pest Management
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {crop.management.pestsManagement.map((pest: PestManagementType, index: number) => (
          <AccordionItem key={index} value={`pest-${index}`}>
            <AccordionTrigger className="text-primary hover:text-primary">
              {pest.name}
            </AccordionTrigger>
            <AccordionContent className="text-primary/80">
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-primary/80">
                    Symptoms:
                  </p>
                  <p>{pest.symptoms}</p>
                </div>
                <div>
                  <p className="font-medium text-primary/80">
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
