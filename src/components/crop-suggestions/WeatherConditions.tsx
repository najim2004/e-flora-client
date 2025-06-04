import {
  Cloud,
  Droplets,
  MapPin,
  Thermometer,
} from "lucide-react";

export default function WeatherConditions() {
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
            <p className="font-medium text-green-800">28°C</p>
          </div>
        </div>
        <div className="flex items-center">
          <Droplets className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-700">Humidity</p>
            <p className="font-medium text-green-800">65%</p>
          </div>
        </div>
        <div className="flex items-center">
          <Cloud className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-700">Rainfall</p>
            <p className="font-medium text-green-800">120mm/month</p>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-700">Location</p>
            <p className="font-medium text-green-800">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
