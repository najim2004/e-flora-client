import { ThermometerSun, ThermometerSnowflake, Droplets, CloudRain, Wind, LocateFixed, Info } from "lucide-react";
import { IWeather } from "@/types/weather";
import React, { JSX } from "react";

interface WeatherSectionProps {
  weather?: IWeather['data'] | null;
  location?: { city: string; country: string } | null;
}

const statBlock =
  "flex flex-col items-center justify-center p-2 gap-0.5 border-b sm:border-b-0 sm:border-r last:border-b-0 sm:last:border-r-0 border-green-100";
const statLabel =
  "text-xs text-green-800 font-medium text-center";
const statValue =
  "text-base sm:text-lg font-bold text-green-900 text-center";

function getSafeNumber(n: unknown, fallback = 0): number {
  return typeof n === "number" && !isNaN(n) ? n : fallback;
}

function getSafeString(s: unknown, fallback = "N/A"): string {
  return typeof s === "string" && s.trim().length > 0 ? s : fallback;
}

export default function WeatherSection({ weather, location }: WeatherSectionProps): JSX.Element {
  const city = getSafeString(location?.city, "Unknown");
  const country = getSafeString(location?.country, "Unknown");
  const maxTemp = getSafeNumber(weather?.maxTemp);
  const minTemp = getSafeNumber(weather?.minTemp);
  const humidity = getSafeNumber(weather?.humidity);
  const rainfall = getSafeNumber(weather?.rainfall);
  const windSpeed = getSafeNumber(weather?.windSpeed);
  const windDir = getSafeString(weather?.dominantWindDirection);

  return (
    <section className="w-full bg-white rounded-xl shadow-sm border border-green-100 p-0 overflow-hidden mb-4">
      {/* Header */}
      <div className="px-6 pt-3 pb-1 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-0.5">
          <LocateFixed className="text-green-600" size={18} />
          <span className="text-base font-semibold text-green-800">Weather</span>
        </div>
        <div className="text-xs text-gray-500 font-medium">{city}, {country}</div>
      </div>
      {/* Stats grid with clean white bg and subtle borders */}
      <div className="grid grid-cols-2 sm:grid-cols-3">
        <div className={statBlock}>
          <ThermometerSun className="text-orange-500" size={18} />
          <div className={statValue}>{maxTemp}&deg;C</div>
          <div className={statLabel}>Max Temp</div>
        </div>
        <div className={statBlock}>
          <ThermometerSnowflake className="text-blue-500" size={18} />
          <div className={statValue}>{minTemp}&deg;C</div>
          <div className={statLabel}>Min Temp</div>
        </div>
        <div className={statBlock}>
          <Droplets className="text-cyan-500" size={18} />
          <div className={statValue}>{humidity}%</div>
          <div className={statLabel}>Humidity</div>
        </div>
        <div className={statBlock}>
          <CloudRain className="text-blue-400" size={18} />
          <div className={statValue}>{rainfall}mm</div>
          <div className={statLabel}>Rainfall</div>
        </div>
        <div className={statBlock}>
          <Wind className="text-green-700" size={18} />
          <div className={statValue}>{windSpeed} km/h</div>
          <div className={statLabel}>Wind</div>
        </div>
        <div className={statBlock}>
          {/* Rotating icon by windDir, typesafe */}
          <Wind className="text-gray-400" style={{ transform: `rotate(${windDir === 'N/A' ? 0 : getWindDirAngle(windDir)}deg)` }} size={16} />
          <div className={statValue}>{windDir}</div>
          <div className={statLabel}>Direction</div>
        </div>
      </div>
      {/* Note */}
      <div className="px-3 pb-1 flex items-center gap-2 text-xs text-gray-500 mt-1">
        <Info className="text-yellow-600" size={13} />
        Weather is updated daily at 6am.
      </div>
    </section>
  );
}

function getWindDirAngle(dir: string): number {
  const map: Record<string, number> = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
  return map[dir] ?? 0;
}
