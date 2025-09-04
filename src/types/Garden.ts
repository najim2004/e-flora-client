import { LocationWithAddress } from "./cropSuggestion";

// This is the main type for the getMyGarden API response
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
  crops: Crop[]; // Active and pending crops
  activeCrops: number;
  pendingCrops: number;
  removedCrops: number; // Renamed from archivedCrops to match server response
  notes: string;
  gardenType: GardenType;
  purpose: Purpose;
  sunlight: Sunlight;
  soilType: SoilType[];
  waterSource: WaterSource;
  gardenerType: GardenerType;
  archivedCrops: Crop[];
}

// This interface for individual crop items is mostly correct and can be reused.
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
