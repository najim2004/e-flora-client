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
  purpose: string[];
  area: number;
  waterSource: string;
  soilType: string;
  gardenType: string;
  gardenerType: string;
  location: LocationWithAddress;
}

export type CropSuggestionPayload = CropSuggestionAuto | CropSuggestionManual;

export interface Crop {
  cropDetails: {
    status: "success" | "failed" | "pending";
    id?: string;
    slug?: string;
  };
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

// export interface CropUpdateDetails {
//   status: "success" | "failed";
//   slug?: string;
//   scientificName: string;
//   timestamp: Date;
// }

export interface Input {
  location: LocationWithAddress;
  purpose: string[];
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
  _id: string;
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
    _id: string;
    status: "pending" | "success" | "failed";
    detailsId?: string;
    slug?: string;
  };
}

export interface CommonProperties {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GardenTypeSuitability {
  rooftop?: {
    suitable: boolean;
    notes?: string;
  };
  balcony?: {
    suitable: boolean;
    notes?: string;
  };
  land?: {
    suitable: boolean;
    notes?: string;
  };
}

export interface TemperatureRange {
  min: string;
  max: string;
}

export interface SoilTypeDetails {
  type: string;
  pH: string;
  drainage: string;
}

export interface ContainerGardening {
  canGrowInPots: boolean;
  potSize: string;
  potDepth: string;
  drainage: string;
}

export interface GrowthConditions {
  plantingSeason: string;
  plantingTime: string;
  climate: string;
  temperatureRange: TemperatureRange;
  humidityRequirement: string;
  sunlight: string;
  soil: SoilTypeDetails;
  spacingRequirements: string;
  containerGardening: ContainerGardening;
}

export interface Water {
  requirement: string;
  frequency: string;
  waterConservationTips: string[];
}

export interface Fertilizer {
  type: string;
  schedule: string;
}

export interface CareRequirements {
  water: Water;
  fertilizer: Fertilizer;
  pruning: string;
  support: string;
  spaceOptimizationTips: string[];
  toolsRequired: string[];
}

export interface CommonDisease {
  name: string;
  symptoms: string;
  treatment: string;
}

export interface CommonPest {
  name: string;
  symptoms: string;
  treatment: string;
}

export interface PestAndDiseaseManagement {
  commonDiseases: CommonDisease[];
  commonPests: CommonPest[];
}

export interface CompanionPlant {
  name: string;
  benefit: string;
}

export interface CompanionPlanting {
  companionPlants: CompanionPlant[];
  avoidNear: string[];
  notes?: string;
}

export interface NutritionalAndCulinary {
  nutritionalValue: string;
  healthBenefits: string;
  culinaryUses: string;
  storageTips: string;
}

export interface SeedSourcing {
  source: string;
  details: string;
}

export interface CostBreakdown {
  item: string;
  cost: number;
  unit: string;
  note?: string;
}

export interface EconomicAspects {
  marketDemand: string;
  seedSourcing: SeedSourcing[];
  costBreakdown: CostBreakdown[];
}

export interface AestheticValue {
  description: string;
  tips: string;
}

export interface RegionalSuitability {
  suitableRegions: string[];
  urbanGardeningNotes: string;
}

export interface GrowthAndHarvest {
  propagationMethods: string[];
  germinationTime: string;
  maturityTime: string;
  harvestTime: string;
  yieldPerPlant: string;
  harvestingTips: string[];
  pollinationType: string;
  seasonalAdjustments: {
    rooftop?: string;
    balcony?: string;
    land?: string;
  };
}

export interface CropDetails extends CommonProperties {
  image: {
    url: string;
    index: string;
  };
  cropId: string;
  name: string;
  scientificName: string;
  type: string;
  variety: string;
  description: string;
  slug: string;
  tags: string[];
  difficultyLevel: string;
  isPerennial: boolean;
  cropCycle: string;
  gardenTypeSuitability: GardenTypeSuitability;
  growthConditions: GrowthConditions;
  careRequirements: CareRequirements;
  growthAndHarvest: GrowthAndHarvest;
  pestAndDiseaseManagement: PestAndDiseaseManagement;
  companionPlanting: CompanionPlanting;
  nutritionalAndCulinary: NutritionalAndCulinary;
  economicAspects: EconomicAspects;
  sustainabilityTips: string[];
  aestheticValue: AestheticValue;
  regionalSuitability: RegionalSuitability;
  funFacts: string[];
}
