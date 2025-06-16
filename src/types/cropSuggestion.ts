export interface Location {
  latitude: number;
  longitude: number;
}

export interface CropSuggestionBody {
  soilType: string;
  farmSize: number;
  irrigationAvailability: string;
  location: Location;
}

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
