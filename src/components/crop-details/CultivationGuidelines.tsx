import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crop } from "@/types/cropDetails";

interface CultivationGuidelinesProps {
  crop: Crop;
}

const CultivationGuidelines: React.FC<CultivationGuidelinesProps> = ({ crop }) => {
  return (
    <Card className="border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-green-800">
          Cultivation Guidelines
        </CardTitle>
        <CardDescription className="text-green-700">
          Step-by-step guide for cultivating {crop.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Land Preparation
            </h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Plow the field to a depth of 15-20 cm</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Puddle and level the field to retain water
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Incorporate organic matter 2-3 weeks before
                  transplanting
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Create proper drainage channels around the field
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Seed Selection and Treatment
            </h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Select certified seeds of recommended varieties
                  (BRRI Dhan 28, 29, 58, 67, 89)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Treat seeds with fungicide to prevent seed-borne
                  diseases
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Soak seeds in water for 24 hours, then incubate
                  for 48 hours for germination
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Nursery Management
            </h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Prepare raised seedbed (10 cm high) with good
                  drainage
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Apply 10 kg N, 20 kg P, and 10 kg K per hectare of
                  seedbed
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Sow pre-germinated seeds at 100 g/m²</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Maintain 2-3 cm water level in the seedbed
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Seedlings will be ready for transplanting in 25-30
                  days
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Transplanting
            </h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Transplant 25-30 days old seedlings</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Plant 2-3 seedlings per hill</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Maintain spacing of 20 cm × 15 cm</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Transplant in lines to facilitate weeding and
                  other operations
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Water Management
            </h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Maintain 2-3 cm standing water from transplanting
                  until 2 weeks before harvest
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Critical stages for irrigation: tillering, panicle
                  initiation, and flowering
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Drain field 10-15 days before harvesting
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CultivationGuidelines;
