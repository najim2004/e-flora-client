export interface Climate {
  temperature: string;
  humidity: string;
  rainfall: string;
}

export interface Soil {
  types: string;
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
  irrigationSchedule: string;
  criticalStage: string[];
}

export interface CultivationGuide {
  title: string;
  guides: string[];
}

export interface PestManagement {
  name: string;
  symptoms: string;
  managements: string;
}

export interface DiseaseManagement {
  name: string;
  symptoms: string;
  managements: string;
}

export interface ProductionCosts {
  landPreparation: {
    cost: number;
    percentage: number;
  };
  seeds: {
    cost: number;
    percentage: number;
  };
  fertilizers: {
    cost: number;
    percentage: number;
  };
  irrigation: {
    cost: number;
    percentage: number;
  };
  plantProtection: {
    cost: number;
    percentage: number;
  };
  labor: {
    cost: number;
    percentage: number;
  };
  harvestingPostHarvest: {
    cost: number;
    percentage: number;
  };
  total: number;
}

export interface Yield {
  average: string;
  potential: string;
  factorsAffectingYield: string;
}

export interface Market {
  price: string;
  demand: string;
  storageLife: string;
  priceFluctuation: string;
}

export interface ProfitabilityAnalysis {
  averageYield: number;
  averagePrice: number;
  grossRevenue: number;
  totalCost: number;
  netProfit: number;
  benefitCostRatio: number;
}

export interface Management {
  fertilizer: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    Application: string[];
  };
  weedManagement: string[];
  pestsManagement: PestManagement[];
  diseaseManagement: DiseaseManagement[];
}

export interface Economics {
  yield: Yield;
  productionCosts: ProductionCosts;
  market: Market;
  profitabilityAnalysis: ProfitabilityAnalysis;
}

export interface Crop {
  _id: string;
  name: string;
  scientificName: string;
  description: string;
  img: string;
  alternatives: string[];
  season: Season;
  soil: Soil;
  climate: Climate;
  water: Water;
  cultivationGuides: CultivationGuide[];
  management: Management;
  harvesting: CultivationGuide[];
  economics: Economics;
  slug: string;
}
