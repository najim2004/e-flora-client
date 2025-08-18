export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationWithAddress extends Location {
  country: string;
  state: string;
  city: string;
  zipCode?: string;
}
export interface CropSuggestionAuto {
  mode: "auto";
  plantType: string[];
  avoidCurrentCrops: boolean;
}

export interface CropSuggestionManual {
  mode: "manual";
  plantType: string[];
  currentCrops: string[];
  sunlight: string;
  purpose: string;
  area: number;
  waterSource: string;
  soilType: string;
  gardenType: string;
  gardenerType: string;
  location: LocationWithAddress;
}

export type CropSuggestionPayload = CropSuggestionAuto | CropSuggestionManual;

export interface CropDetails {
  status: "success" | "failed" | "pending";
  id?: string;
  slug?: string;
}

export interface Crop {
  cropDetails: CropDetails;
  icon: string;
  name: string;
  scientificName: string;
  description: string;
  match: number;
}

export interface CultivationTip {
  title: string;
  tips: string[];
}

export interface Weather {
  avgMaxTemp: number;
  avgMinTemp: number;
  avgHumidity: number;
  avgRainfall: number;
  avgWindSpeed: number;
  dominantWindDirection: string;
}

export interface Recommendations {
  _id: string;
  crops: Crop[];
  cultivationTips: CultivationTip[];
  weathers: Weather[];
}

export interface CropSuggestionResponse {
  _id: string;
  soilType: string;
  location: Location;
  farmSize: number;
  irrigationAvailability: string;
  recommendations: Recommendations;
  createdAt: Date;
}
export type CropSuggestionStatus =
  | "pending"
  | "initiated"
  | "analyzing"
  | "generatingData"
  | "savingToDB"
  | "completed"
  | "failed";

export interface CropSuggestionProgress {
  status: CropSuggestionStatus;
  progress: number;
  message?: string;
  timestamp: Date;
}

export interface CropUpdateDetails {
  status: "success" | "failed";
  slug?: string;
  scientificName: string;
  timestamp: Date;
}

export interface Input {
  location: LocationWithAddress;
  purpose: string;
  sunlight: string;
  soilType: string;
  area: number;
  waterSource: string;
  plantType: string[];
  gardenType: string;
}

export interface CropSuggestionResult {
  _id: string;
  userId: string;
  input: Input;
  crops: CropCardType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CropCardType {
  name: string; // e.g. "Tomato"
  scientificName: string;
  image: {
    _id: string;
    url: string;
    index: string;
  };
  difficulty: "very easy" | "easy" | "medium" | "hard";
  features?: string[]; // Max 3 short bullet features
  description?: string; // Short one-liner
  maturityTime?: string; // e.g. '90 days', '3 years'
  plantingSeason?: string; // e.g. 'Winter'
  sunlight?: string; // e.g. 'Full sun'
  waterNeed?: string; // e.g. 'Moderate'
  soilType: "loamy" | "sandy" | "clayey" | "silty" | "peaty" | "chalky";
  details: {
    status: "pending" | "success" | "failed";
    detailsId?: string;
    slug?: string;
  };
}
