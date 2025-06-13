import React from "react";
import { Crop } from "@/types/cropDetails";

interface FertilizerApplicationProps {
  crop: Crop;
}

const FertilizerApplication: React.FC<FertilizerApplicationProps> = ({ crop }) => {
  return (
    <div>
      <h3 className="font-medium text-primary mb-3">
        Fertilizer Application
      </h3>
      <div className="mb-4">
        <p className="text-primary/80 mb-2">
          Recommended fertilizer rates per acre:
        </p>
        <ul className="space-y-2 text-primary/80">
          <li className="flex items-start">
            <span className="text-primary/80 mr-2">•</span>
            <span>
              Nitrogen (N): {crop.management.fertilizer.nitrogen}
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary/80 mr-2">•</span>
            <span>
              Phosphorus (P): {crop.management.fertilizer.phosphorus}
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary/80 mr-2">•</span>
            <span>
              Potassium (K): {crop.management.fertilizer.potassium}
            </span>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-primary/80 mb-2">
          Application schedule:
        </p>
        <ul className="space-y-2 text-primary/80">
          {crop.management.fertilizer.Application.map((item: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-primary/80 mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FertilizerApplication;
