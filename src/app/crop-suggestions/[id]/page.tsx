"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Sun,
  Droplets,
  Clock,
  Plus,
  MapPin,
  Target,
  Layers,
  Square,
  Home,
  Trees,
} from "lucide-react";

import Image from "next/image";

const cropData = [
  {
    id: 1,
    name: "Tomato",
    banglaName: "টমেটো",
    description: "A versatile vegetable perfect for curries and salads",
    image: "/placeholder.svg?height=200&width=200",
    sunlight: "Full Sun",
    water: "Moderate",
    harvestTime: "60-80 days",
    difficulty: "Easy",
    type: "Vegetables",
    benefits: ["Rich in Vitamin C", "Easy to grow", "High yield"],
  },
  {
    id: 2,
    name: "Dhonia Pata",
    banglaName: "ধনিয়া পাতা",
    description: "Essential herb for Bengali cooking",
    image: "/placeholder.svg?height=200&width=200",
    sunlight: "Partial Sun",
    water: "Low",
    harvestTime: "30-45 days",
    difficulty: "Easy",
    type: "Herbs",
    benefits: ["Fast growing", "Continuous harvest", "Aromatic"],
  },
  {
    id: 3,
    name: "Green Chilli",
    banglaName: "কাঁচা মরিচ",
    description: "Spicy peppers essential for Bengali cuisine",
    image: "/placeholder.svg?height=200&width=200",
    sunlight: "Full Sun",
    water: "Moderate",
    harvestTime: "70-90 days",
    difficulty: "Moderate",
    type: "Vegetables",
    benefits: ["Long harvest period", "High vitamin content", "Pest resistant"],
  },
  {
    id: 4,
    name: "Mint",
    banglaName: "পুদিনা পাতা",
    description: "Refreshing herb for drinks and cooking",
    image: "/placeholder.svg?height=200&width=200",
    sunlight: "Partial Sun",
    water: "High",
    harvestTime: "40-60 days",
    difficulty: "Easy",
    type: "Herbs",
    benefits: ["Spreads easily", "Medicinal properties", "Aromatic"],
  },
  {
    id: 5,
    name: "Spinach",
    banglaName: "পালং শাক",
    description: "Nutritious leafy green vegetable",
    image: "/placeholder.svg?height=200&width=200",
    sunlight: "Partial Sun",
    water: "Moderate",
    harvestTime: "40-50 days",
    difficulty: "Easy",
    type: "Vegetables",
    benefits: ["Iron rich", "Cool season crop", "Multiple harvests"],
  },
  {
    id: 6,
    name: "Lemon",
    banglaName: "লেবু",
    description: "Citrus fruit perfect for rooftop containers",
    image: "/placeholder.svg?height=200&width=200",
    sunlight: "Full Sun",
    water: "Moderate",
    harvestTime: "180-365 days",
    difficulty: "Hard",
    type: "Fruits",
    benefits: ["Long-term investment", "Vitamin C rich", "Fragrant flowers"],
  },
  {
    id: 7,
    name: "Bottle Gourd",
    banglaName: "লাউ",
    description: "Climbing vegetable ideal for vertical growing",
    image: "/placeholder.svg?height=200&width=200",
    sunlight: "Full Sun",
    water: "High",
    harvestTime: "90-120 days",
    difficulty: "Moderate",
    type: "Vegetables",
    benefits: ["Space efficient", "High yield", "Nutritious"],
  },
  {
    id: 8,
    name: "Basil",
    banglaName: "তুলসী",
    description: "Sacred herb with medicinal properties",
    image: "/placeholder.svg?height=200&width=200",
    sunlight: "Full Sun",
    water: "Moderate",
    harvestTime: "60-90 days",
    difficulty: "Easy",
    type: "Herbs",
    benefits: ["Medicinal uses", "Pest repellent", "Aromatic"],
  },
];

// Placeholder data for garden details
const gardenDetails = {
  location: {
    country: "Bangladesh",
    state: "Dhaka",
    city: "Dhaka",
    zipCode: "1200",
    latitude: 23.7104,
    longitude: 90.4074,
  },
  purpose: "eat",
  sunlight: "full",
  soilType: "loamy",
  area: 100,
  waterSource: "tap",
  plantType: "vegetable",
  gardenType: "rooftop",
};

const getSunlightColor = (sunlight: string) => {
  switch (sunlight) {
    case "Full Sun":
      return "text-yellow-600 bg-yellow-100";
    case "Partial Sun":
      return "text-orange-600 bg-orange-100";
    default:
      return "text-blue-600 bg-blue-100";
  }
};

const getWaterColor = (water: string) => {
  switch (water) {
    case "High":
      return "text-blue-600 bg-blue-100";
    case "Moderate":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600 bg-green-100";
    case "Moderate":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-red-600 bg-red-100";
  }
};

export default function RecommendationsPage() {
  const filteredCrops = cropData;

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Recommended Crops for Your Garden
          </h2>
        </div>

        {/* Garden Details */}
        <Card className="mb-8 border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Leaf className="h-5 w-5 mr-2" />
              Garden Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 *:flex *:items-center *:justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <MapPin className="h-4 w-4 mr-1 text-primary" />
                  Location
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {gardenDetails.location.city}, {gardenDetails.location.state},{" "}
                  {gardenDetails.location.country} (
                  {gardenDetails.location.zipCode})
                </CardDescription>
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <Target className="h-4 w-4 mr-1 text-primary" />
                  Purpose
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {gardenDetails.purpose}
                </CardDescription>
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <Sun className="h-4 w-4 mr-1 text-primary" />
                  Sunlight
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {gardenDetails.sunlight}
                </CardDescription>
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <Layers className="h-4 w-4 mr-1 text-primary" />
                  Soil Type
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {gardenDetails.soilType}
                </CardDescription>
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <Square className="h-4 w-4 mr-1 text-primary" />
                  Area
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {gardenDetails.area} SQF
                </CardDescription>
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <Droplets className="h-4 w-4 mr-1 text-primary" />
                  Water Source
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {gardenDetails.waterSource}
                </CardDescription>
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <Trees className="h-4 w-4 mr-1 text-primary" />
                  Plant Type
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {gardenDetails.plantType}
                </CardDescription>
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <Home className="h-4 w-4 mr-1 text-primary" />
                  Garden Type
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {gardenDetails.gardenType}
                </CardDescription>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Card
              key={crop.id}
              className="hover:shadow-lg transition-shadow border-green-100"
            >
              <CardHeader className="pb-4">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-green-50">
                  <Image
                    src={crop.image || "/placeholder.svg"}
                    alt={crop.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800">
                      {crop.name}
                    </CardTitle>
                    <Badge className={getDifficultyColor(crop.difficulty)}>
                      {crop.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {crop.banglaName}
                  </p>
                  <CardDescription>{crop.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Info Icons */}
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <Badge
                      variant="secondary"
                      className={getSunlightColor(crop.sunlight)}
                    >
                      {crop.sunlight}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <Badge
                      variant="secondary"
                      className={getWaterColor(crop.water)}
                    >
                      {crop.water}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {crop.harvestTime}
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-800">
                    Benefits:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {crop.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Learn More
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary/80 hover:bg-primary"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Garden
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No crops match your current filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
