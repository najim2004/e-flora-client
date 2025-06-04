'use client'

import FarmDetailsForm from "@/components/crop-suggestions/FarmDetailsForm";
import WeatherConditions from "@/components/crop-suggestions/WeatherConditions";
import CropRecommendations from "@/components/crop-suggestions/CropRecommendations";
import CultivationTips from "@/components/crop-suggestions/CultivationTips";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CropSuggestionsPage() {
  const handleSubmit = () => {
    alert("Get Recommendations button clicked");
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-green-100 shadow-sm md:col-span-1">
            <CardHeader>
              <CardTitle className="text-green-800">
                Enter Your Details
              </CardTitle>
              <CardDescription className="text-green-700">
                Provide information about your farm location and soil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FarmDetailsForm
                location=""
                soilType=""
                farmSize=""
                irrigation=""
                onLocationChange={() => {}}
                onSoilTypeChange={() => {}}
                onFarmSizeChange={() => {}}
                onIrrigationChange={() => {}}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-green-800">
                Crop Recommendations
              </CardTitle>
              <CardDescription className="text-green-700">
                Based on your location and soil conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherConditions />
              <CropRecommendations />
              <CultivationTips />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
