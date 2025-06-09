import React from "react";
import { Crop } from "@/types/cropDetails";

interface FertilizerApplicationProps {
  crop: Crop;
}

const FertilizerApplication: React.FC<FertilizerApplicationProps> = ({ crop }) => {
  return (
    <div>
      <h3 className="font-medium text-green-800 mb-3">
        Fertilizer Application
      </h3>
      <div className="mb-4">
        <p className="text-green-700 mb-2">
          Recommended fertilizer rates per acre:
        </p>
        <ul className="space-y-2 text-green-700">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>
              Nitrogen (N): {crop.fertilizer.nitrogen}
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>
              Phosphorus (P): {crop.fertilizer.phosphorus}
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>
              Potassium (K): {crop.fertilizer.potassium}
            </span>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-green-700 mb-2">
          Application schedule:
        </p>
        <ul className="space-y-2 text-green-700">
          {crop.fertilizer.application.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FertilizerApplication;
