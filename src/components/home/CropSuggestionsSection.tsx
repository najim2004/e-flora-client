import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faLocationDot,
  faTemperatureHigh,
  faDroplet,
  faCloudRain,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeatherData, CropSuggestion, SoilType } from "@/types";

const getWeatherIcon = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    sun: faTemperatureHigh,
    cloud: faCloudRain,
    rain: faDroplet,
  };
  return iconMap[iconName] || faTemperatureHigh;
};

interface Props {
  location: string;
  soilType: string;
  isGpsLoading: boolean;
  weatherData: WeatherData;
  cropSuggestions: CropSuggestion[];
  soilTypes: SoilType[];
  onLocationChange: (value: string) => void;
  onSoilTypeChange: (value: string) => void;
  onGetLocation: () => void;
}

export const CropSuggestionsSection = ({
  location,
  soilType,
  isGpsLoading,
  weatherData,
  cropSuggestions,
  soilTypes,
  onLocationChange,
  onSoilTypeChange,
  onGetLocation,
}: Props) => {
  return (
    <section className="py-12 bg-[#F5F7FA]">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]/90 cursor-pointer whitespace-nowrap">
            Smart Farming
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Get Personalized Crop Suggestions
          </h2>
          <p className="text-lg text-gray-600">
            Enter your location and soil details to receive AI-powered crop
            recommendations
          </p>
        </div>

        {/* Input Section */}
        <div className="grid gap-8 mb-12 md:grid-cols-2">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl text-[#2E7D32]">
                Location Details
              </CardTitle>
              <CardDescription>Enter your location or use GPS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={onGetLocation}
                  disabled={isGpsLoading}
                  className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap"
                >
                  {isGpsLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    <FontAwesomeIcon icon={faLocationDot} />
                  )}
                </Button>
              </div>
              <div>
                <select
                  value={soilType}
                  onChange={(e) => onSoilTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                >
                  <option value="">Select Soil Type</option>
                  {soilTypes.map((soil) => (
                    <option key={soil.value} value={soil.value}>
                      {soil.label}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Weather Forecast */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl text-[#2E7D32]">
                Weather Forecast
              </CardTitle>
              <CardDescription>
                5-day weather prediction for your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm font-medium text-gray-600">
                      {day.day}
                    </p>
                    <FontAwesomeIcon
                      icon={getWeatherIcon(day.icon)}
                      className="text-2xl text-[#2E7D32] my-2"
                    />
                    <p className="text-sm font-bold">{day.temp}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faTemperatureHigh}
                    className="mb-2 text-2xl text-[#2E7D32]"
                  />
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="font-bold">{weatherData.temperature}</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faDroplet}
                    className="mb-2 text-2xl text-[#2E7D32]"
                  />
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="font-bold">{weatherData.humidity}</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faCloudRain}
                    className="mb-2 text-2xl text-[#2E7D32]"
                  />
                  <p className="text-sm text-gray-600">Rainfall</p>
                  <p className="font-bold">{weatherData.rainfall}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crop Recommendations */}
        <div className="mb-12">
          <h3 className="mb-6 text-2xl font-bold text-center text-gray-900">
            Recommended Crops
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {cropSuggestions.map((crop, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <Image
                    src={crop.image}
                    alt={crop.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-[#2E7D32]">
                      {crop.name}
                    </CardTitle>
                    <Badge className="bg-[#E8F5E9] text-[#2E7D32]">
                      {crop.confidence}% Match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="mb-2 font-semibold text-gray-900">
                      Cultivation Tips:
                    </h4>
                    <ul className="pl-5 space-y-1 text-sm text-gray-600 list-disc">
                      {crop.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">
                      Best Suited For:
                    </h4>
                    <ul className="pl-5 space-y-1 text-sm text-gray-600 list-disc">
                      {crop.suitability.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer !rounded-button whitespace-nowrap">
                    View Detailed Guide
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default CropSuggestionsSection;
