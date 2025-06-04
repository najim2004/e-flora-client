export interface Location {
  latitude: number;
  longitude: number;
}

export interface CropSuggestionBody {
  soilType: "chalky" | "peaty" | "silty" | "loamy" | "sandy" | "clay";
  farmSize: number;
  irrigationAvailability: "rainfed" | "partial" | "full";
  location: Location;
}
