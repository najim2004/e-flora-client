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
    <div className="mb-8 p-4 bg-secondary/60 rounded-lg">
      <h3 className="font-medium text-primary mb-2">
        Current Weather Conditions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center">
          <Thermometer className="h-5 w-5 text-primary/80 mr-2" />
          <div>
            <p className="text-sm text-primary/80">Temperature</p>
            <p className="font-medium text-primary">
              {weatherData?.avgMaxTemp}°C
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Droplets className="h-5 w-5 text-primary/80 mr-2" />
          <div>
            <p className="text-sm text-primary/80">Humidity</p>
            <p className="font-medium text-primary">
              {weatherData?.avgHumidity}%
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Cloud className="h-5 w-5 text-primary/80 mr-2" />
          <div>
            <p className="text-sm text-primary/80">Rainfall</p>
            <p className="font-medium text-primary">
              {weatherData?.avgRainfall}mm/month
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <GiWindsock className="h-5 w-5 text-primary/80 mr-2" />
          <div>
            <p className="text-sm text-primary/80">Wind Direction</p>
            <p className="font-medium text-primary">
              {weatherData?.dominantWindDirection}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
