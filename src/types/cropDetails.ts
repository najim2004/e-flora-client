export interface Climate {
  temperature: string;
  rainfall: string;
  humidity: string;
}

export interface Soil {
  types: string[];
  ph: string;
  drainage: string;
}

export interface Season {
  planting: string;
  harvesting: string;
  duration: string;
}

export interface Water {
  requirements: string;
}

export interface Fertilizer {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  application: string[];
}

export interface Pest {
  name: string;
  symptoms: string;
  management: string;
}

export interface Disease {
  name: string;
  symptoms: string;
  management: string;
}

export interface Harvesting {
  indicators: string;
  method: string;
  postHarvest: string;
}

export interface Yield {
  average: string;
  potential: string;
}

export interface Market {
  price: string;
  demand: string;
  storageLife: string;
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  matchPercentage: number;
  image: string;
  season: Season;
  climate: Climate;
  soil: Soil;
  water: Water;
  fertilizer: Fertilizer;
  pests: Pest[];
  diseases: Disease[];
  harvesting: Harvesting;
  yield: Yield;
  market: Market;
  alternatives: string[];
}
