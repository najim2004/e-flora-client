"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";

import FarmDetailsForm from "@/components/crop-suggestions/FarmDetailsForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { errorToast } from "@/components/customToast";

export const DEFAULT_WEATHER_DATA = {
  avgMaxTemp: 0,
  avgMinTemp: 0,
  avgHumidity: 0,
  avgRainfall: 0,
  avgWindSpeed: 0,
  dominantWindDirection: "",
};

export const EmptySuggestion = () => (
  <div className="text-center py-8 space-y-2">
    <CardTitle className="text-primary">Fill out the form!</CardTitle>
    <CardDescription className="text-primary/80">
      Get personalized recommendations by submitting farm details.
    </CardDescription>
  </div>
);

export default function CropSuggestionsPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!isAuthenticated) return;

    try {
    } catch {
      errorToast("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* <div className="grid md:grid-cols-3 gap-8 md:relative"> */}
        <Card className="shadow-sm md:col-span-1 h-min md:sticky md:top-24.5 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-primary">Enter Your Details</CardTitle>
            <CardDescription className="text-primary/80">
              Provide your garden&#39;s info
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FarmDetailsForm
              onSubmit={(data) => console.log(data)}
              // isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
