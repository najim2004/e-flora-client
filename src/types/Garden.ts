import { LocationWithAddress } from "./cropSuggestion";

export interface Garden {
  _id: string;
  userId: string;
  name: string;
  image: {
    url: string;
    imageId: string;
  };
  description: string;
  location: LocationWithAddress;
  size: number;
  weather: Weather;
  crops: Crop[];
  activeCrops: number;
  pendingCrops: number;
  removedCrops: number;
  notes: string;
  gardenType: GardenType;
  purpose: Purpose;
  sunlight: Sunlight;
  soilType: SoilType[];
  waterSource: WaterSource;
  gardenerType: GardenType;
  archivedCrops: Crop[];
}

export interface Crop {
  _id: string;
  cropName: string;
  scientificName: string;
  status: string;
  currentStage: string;
  healthScore: number;
  image: {
    _id: string;
    url: string;
    index: string;
  };
  nextTask: string;
  createdAt: string;
  updatedAt: string;
}
export interface Weather {
  location: {
    city: string;
    country: string;
  };
  data: {
    maxTemp: number;
    minTemp: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    dominantWindDirection: string;
    date: Date;
  };
}
export type SoilType =
  | "loamy"
  | "sandy"
  | "clayey"
  | "silty"
  | "peaty"
  | "chalky"
  | "unknown";
export type Sunlight = "full" | "partial" | "shade";
export type WaterSource =
  | "tube-well"
  | "tap"
  | "rainwater"
  | "storage"
  | "manual"
  | "uncertain"
  | "unknown";
export type Purpose = "eat" | "sell" | "decor" | "educational" | "mixed";
export type GardenType =
  | "rooftop"
  | "balcony"
  | "backyard"
  | "indoor"
  | "terrace"
  | "field";
export type GardenerType = "beginner" | "intermediate" | "expert";
