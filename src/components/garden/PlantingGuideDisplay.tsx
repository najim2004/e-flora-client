import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface PlantingStep {
  _id?: string;
  id: number;
  title: string;
  description: string;
  instructions: string[];
  tips?: string;
  completed: boolean;
}

interface PlantingGuideDisplayProps {
  plantingSteps: PlantingStep[];
  onCompleteStep: (stepId: string) => void;
}

const PlantingGuideDisplay: React.FC<PlantingGuideDisplayProps> = ({
  plantingSteps,
  onCompleteStep,
}) => {
  const completedStepsCount = plantingSteps.filter((s) => s.completed).length;
  const totalSteps = plantingSteps.length;
  const progressPercentage = (completedStepsCount / totalSteps) * 100;

  const currentStep = plantingSteps.find((s) => !s.completed);

  return (
    <div className="space-y-6">
      <Card className="bg-white border-green-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Planting Guide
          </CardTitle>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Complete these steps in order to ensure successful growth
            </p>
            <div className="flex items-center gap-2">
              <Progress
                value={progressPercentage}
                className="flex-1 h-2 bg-green-100"
              />
              <span className="text-sm font-medium text-green-600">
                {completedStepsCount} of {totalSteps} steps completed
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {plantingSteps.map((step) => (
            <div
              key={step._id}
              className={`rounded-lg border ${
                step.completed
                  ? "bg-green-50 border-green-200"
                  : currentStep?._id === step._id
                  ? "bg-white border-green-500 shadow-lg"
                  : "bg-gray-50 border-gray-200"
              } transition-all duration-300`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.completed ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          step.completed
                            ? "text-green-800"
                            : "text-gray-800"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {currentStep?._id === step._id && (
                    <Button
                      onClick={() => onCompleteStep(step._id as string)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Complete Step
                    </Button>
                  )}
                </div>
                {currentStep?._id === step._id && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">
                        Step Details:
                      </h4>
                      <ul className="space-y-2">
                        {step.instructions?.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span className="text-gray-700">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                      {step.tips && (
                        <div className="mt-4 flex items-start gap-2 bg-yellow-50 p-3 rounded-lg">
                          <svg
                            className="w-5 h-5 text-yellow-600 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-sm text-yellow-800">
                            {step.tips}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantingGuideDisplay;
