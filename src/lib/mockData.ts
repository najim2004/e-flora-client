import { ICropDetails } from "@/types/cropSuggestion";

export const mockCropDetails: ICropDetails = {
  _id: "1",
  cropId: "tomato-123",
  name: "Tomato",
  scientificName: "Solanum lycopersicum",
  type: "Fruit",
  variety: "Cherry",
  description: "A small, juicy, and sweet variety of tomato, excellent for salads and snacking.",
  slug: "tomato-cherry",
  tags: ["tomato", "cherry", "salad"],
  difficultyLevel: "Easy",
  isPerennial: false,
  cropCycle: "Annual",
  gardenTypeSuitability: {
    rooftop: { suitable: true },
    balcony: { suitable: true, notes: "Requires a large pot." },
    land: { suitable: true },
  },
  growthConditions: {
    plantingSeason: "Spring",
    plantingTime: "After the last frost",
    climate: "Warm",
    temperatureRange: { min: "18°C", max: "28°C" },
    humidityRequirement: "Medium",
    sunlight: "Full sun (6-8 hours)",
    soil: {
      type: "Loamy",
      pH: "6.0-6.8",
      drainage: "Good",
    },
    spacingRequirements: "45-60 cm apart",
    containerGardening: {
      canGrowInPots: true,
      potSize: "5 gallons",
      potDepth: "30 cm",
      drainage: "Essential",
    },
  },
  careRequirements: {
    water: {
      requirement: "Consistent moisture",
      frequency: "2-3 times a week",
      waterConservationTips: ["Use mulch to retain moisture.", "Water at the base of the plant."],
    },
    fertilizer: {
      type: "Balanced (10-10-10)",
      schedule: "Every 2-3 weeks",
    },
    pruning: "Remove lower leaves and suckers.",
    support: "Staking or caging is recommended.",
    spaceOptimizationTips: ["Grow vertically on a trellis.", "Use square foot gardening method."],
    toolsRequired: ["Trowel", "Pruning shears", "Watering can"],
  },
  growthAndHarvest: {
    propagationMethods: ["Seeds"],
    germinationTime: "7-14 days",
    maturityTime: "60-80 days",
    harvestTime: "When fruits are firm and fully colored.",
    yieldPerPlant: "2-5 kg",
    harvestingTips: ["Harvest regularly to encourage more fruit production.", "Gently twist the fruit to remove it."],
    pollinationType: "Self-pollinating",
    seasonalAdjustments: {
      rooftop: "Provide shade during peak summer.",
      balcony: "Ensure good air circulation.",
    },
  },
  pestAndDiseaseManagement: {
    commonDiseases: [
      { name: "Blight", symptoms: "Yellowing leaves, dark spots.", treatment: "Fungicide spray." },
      { name: "Blossom-end rot", symptoms: "Dark, sunken spots on the bottom of the fruit.", treatment: "Ensure consistent watering and calcium levels in the soil." },
    ],
    commonPests: [
      { name: "Aphids", symptoms: "Small insects on leaves, sticky residue.", treatment: "Insecticidal soap or neem oil." },
      { name: "Hornworms", symptoms: "Large green caterpillars, eaten leaves.", treatment: "Handpick or use Bacillus thuringiensis (BT)." },
    ],
  },
  companionPlanting: {
    companionPlants: [
      { name: "Basil", benefit: "Improves flavor and repels pests." },
      { name: "Carrots", benefit: "Loosen the soil." },
    ],
    avoidNear: ["Cabbage", "Fennel"],
  },
  nutritionalAndCulinary: {
    nutritionalValue: "Rich in vitamins A and C, and antioxidants like lycopene.",
    healthBenefits: "May reduce the risk of heart disease and cancer.",
    culinaryUses: "Salads, sauces, sandwiches, and eaten raw.",
    storageTips: "Store at room temperature, not in the refrigerator.",
  },
  economicAspects: {
    marketDemand: "High",
    seedSourcing: [{ source: "Local nurseries or online seed stores.", details: "Choose a reputable supplier." }],
    costBreakdown: [
      { item: "Seeds", cost: 50, unit: "packet" },
      { item: "Soil and compost", cost: 200, unit: "bag" },
      { item: "Fertilizer", cost: 100, unit: "bottle" },
    ],
  },
  sustainabilityTips: ["Use organic fertilizers.", "Practice crop rotation.", "Save seeds from heirloom varieties."],
  aestheticValue: {
    description: "Adds a vibrant red color to the garden.",
    tips: "Plant in a sunny spot for the best visual appeal.",
  },
  regionalSuitability: {
    suitableRegions: ["Most temperate and warm regions."],
    urbanGardeningNotes: "Well-suited for container gardening on balconies and rooftops.",
  },
  funFacts: ["Tomatoes are technically a fruit, but legally a vegetable.", "There are over 10,000 varieties of tomatoes."],
  createdAt: new Date(),
  updatedAt: new Date(),
};
