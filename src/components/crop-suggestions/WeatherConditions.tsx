import {
  Cloud,
  Droplets,
  Thermometer,
} from "lucide-react";
import { GiWindsock } from "react-icons/gi";


interface WeatherConditionsProps {
  weatherData: {
    avgMaxTemp: number;
    avgMinTemp: number;
    avgHumidity: number;
    avgRainfall: number;
    dominantWindDirection: string;
  };
}

export default function WeatherConditions({ weatherData }: WeatherConditionsProps) {
  return (
    <div className="mb-8 p-4 bg-green-100 rounded-lg">
      <h3 className="font-medium text-green-800 mb-2">
        Current Weather Conditions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center">
          <Thermometer className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-700">Temperature</p>
            <p className="font-medium text-green-800">
              {weatherData?.avgMaxTemp}°C
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Droplets className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-700">Humidity</p>
            <p className="font-medium text-green-800">
              {weatherData?.avgHumidity}%
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Cloud className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-700">Rainfall</p>
            <p className="font-medium text-green-800">
              {weatherData?.avgRainfall}mm/month
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <GiWindsock className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-700">Wind Direction</p>
            <p className="font-medium text-green-800">
              {weatherData?.dominantWindDirection}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
