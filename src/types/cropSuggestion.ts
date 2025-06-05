export interface Location {
  latitude: number;
  longitude: number;
}

export interface CropSuggestionBody {
  soilType:string;
  farmSize: number;
  irrigationAvailability:string;
  location: Location;
}