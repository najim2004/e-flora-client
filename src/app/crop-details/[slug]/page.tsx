"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Droplets,
  Thermometer,
  Leaf,
  Sun,
  CloudRain,
  Shovel,
  Scissors,
  AlertTriangle,
  TrendingUp,
  Share2,
  Bookmark,
  Download,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function CropDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [saved, setSaved] = useState(false);

  // In a real app, you would fetch crop data based on the cropId parameter
  // For this example, we'll use hardcoded data for Rice (Boro)
  const crop = {
    id: "rice-boro",
    name: "Rice (Boro)",
    scientificName: "Oryza sativa",
    description:
      "Boro rice is a high-yielding variety grown during the dry season in Bangladesh and parts of India. It requires irrigation and is known for its good grain quality and high productivity.",
    matchPercentage: 95,
    image: "/placeholder.svg?height=300&width=300",
    season: {
      planting: "December-January",
      harvesting: "April-May",
      duration: "120-140 days",
    },
    climate: {
      temperature: "20-35°C",
      rainfall: "150-200mm during growing season",
      humidity: "60-80%",
    },
    soil: {
      types: ["Clay", "Clay Loam", "Silt Loam"],
      ph: "5.5-7.0",
      drainage: "Good water retention capacity",
    },
    water: {
      requirements: "High",
      irrigationSchedule:
        "Keep 2-3cm standing water until 2 weeks before harvest",
      criticalStages: ["Tillering", "Panicle initiation", "Flowering"],
    },
    fertilizer: {
      nitrogen: "80-100 kg/acre",
      phosphorus: "40-50 kg/acre",
      potassium: "40-50 kg/acre",
      application: [
        "Basal: 1/3 N, all P and K at transplanting",
        "Top dressing: 1/3 N at active tillering",
        "Top dressing: 1/3 N at panicle initiation",
      ],
    },
    pests: [
      {
        name: "Stem Borer",
        symptoms:
          "Dead hearts in vegetative stage, white heads in reproductive stage",
        management:
          "Use resistant varieties, balanced fertilizer, proper timing of insecticide application",
      },
      {
        name: "Brown Plant Hopper",
        symptoms:
          "Plants turn yellow and dry rapidly, honeydew excretion with sooty mold",
        management:
          "Use resistant varieties, avoid excessive nitrogen, maintain field hygiene",
      },
    ],
    diseases: [
      {
        name: "Rice Blast",
        symptoms:
          "Diamond-shaped lesions on leaves, infected panicles break at the base",
        management:
          "Use resistant varieties, balanced fertilizer, fungicide application at early stages",
      },
      {
        name: "Bacterial Leaf Blight",
        symptoms:
          "Water-soaked lesions on leaf margins, yellowing and drying of leaves",
        management:
          "Use resistant varieties, balanced fertilizer, avoid excessive nitrogen",
      },
    ],
    harvesting: {
      indicators: "When 80-85% of the grains turn golden yellow",
      method: "Manual harvesting or using combine harvester",
      postHarvest:
        "Threshing, cleaning, drying to 12-14% moisture content, proper storage",
    },
    yield: {
      average: "4-6 tons/hectare",
      potential: "Up to 8 tons/hectare with optimal management",
    },
    market: {
      price: "18-22 Taka/kg (varies seasonally)",
      demand: "High throughout the year",
      storageLife: "6-12 months with proper storage",
    },
    alternatives: ["Wheat", "Maize", "Potato"],
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/crop-suggestions"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Crop Suggestions
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={() => setSaved(!saved)}
            >
              {saved ? (
                <Bookmark className="h-4 w-4 mr-2 fill-green-600" />
              ) : (
                <Bookmark className="h-4 w-4 mr-2" />
              )}
              {saved ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Crop Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <Card className="border-green-100 shadow-sm overflow-hidden">
              <div className="bg-green-100 p-6 flex items-center justify-center">
                <img
                  src={crop.image || "/placeholder.svg"}
                  alt={crop.name}
                  className="h-48 w-48 object-contain"
                />
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-green-800 mb-1">
                  {crop.name}
                </h1>
                <p className="text-sm italic text-green-600 mb-4">
                  {crop.scientificName}
                </p>

                <div className="flex items-center mb-4">
                  <div className="mr-2 text-sm font-medium text-green-700">
                    Match for your farm:
                  </div>
                  <div className="flex-1 flex items-center">
                    <Progress
                      value={crop.matchPercentage}
                      className="h-2 bg-green-100"
                    />
                    <span className="ml-2 text-sm font-medium text-green-700">
                      {crop.matchPercentage}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-green-600">Growing Season</p>
                      <p className="font-medium text-green-800">
                        {crop.season.planting} to {crop.season.harvesting}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-green-600">Duration</p>
                      <p className="font-medium text-green-800">
                        {crop.season.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-green-600">
                        Temperature Range
                      </p>
                      <p className="font-medium text-green-800">
                        {crop.climate.temperature}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-green-600">
                        Water Requirement
                      </p>
                      <p className="font-medium text-green-800">
                        {crop.water.requirements}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-green-800 mb-2">
                    Suitable Soil Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {crop.soil.types.map((soilType, index) => (
                      <Badge
                        key={index}
                        className="bg-green-100 text-green-700 hover:bg-green-200"
                      >
                        {soilType}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-green-800 mb-2">
                    Alternative Crops
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {crop.alternatives.map((alt, index) => (
                      <Link
                        href={`/crop-details/${alt.toLowerCase()}`}
                        key={index}
                      >
                        <Badge className="bg-white border-green-200 text-green-700 hover:bg-green-50 cursor-pointer">
                          {alt}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border-green-100 shadow-sm mb-6">
              <CardHeader>
                <CardTitle className="text-green-800">
                  About {crop.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">{crop.description}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-green-800 mb-3">
                      Climate Requirements
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Thermometer className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600">Temperature</p>
                          <p className="font-medium text-green-800">
                            {crop.climate.temperature}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <CloudRain className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600">Rainfall</p>
                          <p className="font-medium text-green-800">
                            {crop.climate.rainfall}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Sun className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600">Humidity</p>
                          <p className="font-medium text-green-800">
                            {crop.climate.humidity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-green-800 mb-3">
                      Soil Requirements
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Shovel className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600">Soil Types</p>
                          <p className="font-medium text-green-800">
                            {crop.soil.types.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Leaf className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600">Soil pH</p>
                          <p className="font-medium text-green-800">
                            {crop.soil.ph}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Droplets className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600">Drainage</p>
                          <p className="font-medium text-green-800">
                            {crop.soil.drainage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="cultivation" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger
                  value="cultivation"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Cultivation
                </TabsTrigger>
                <TabsTrigger
                  value="management"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Management
                </TabsTrigger>
                <TabsTrigger
                  value="harvesting"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Harvesting
                </TabsTrigger>
                <TabsTrigger
                  value="economics"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Economics
                </TabsTrigger>
              </TabsList>

              {/* Cultivation Tab */}
              <TabsContent value="cultivation">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">
                      Cultivation Guidelines
                    </CardTitle>
                    <CardDescription className="text-green-700">
                      Step-by-step guide for cultivating {crop.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Land Preparation
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Plow the field to a depth of 15-20 cm</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Puddle and level the field to retain water
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Incorporate organic matter 2-3 weeks before
                              transplanting
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Create proper drainage channels around the field
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Seed Selection and Treatment
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Select certified seeds of recommended varieties
                              (BRRI Dhan 28, 29, 58, 67, 89)
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Treat seeds with fungicide to prevent seed-borne
                              diseases
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Soak seeds in water for 24 hours, then incubate
                              for 48 hours for germination
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Nursery Management
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Prepare raised seedbed (10 cm high) with good
                              drainage
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Apply 10 kg N, 20 kg P, and 10 kg K per hectare of
                              seedbed
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Sow pre-germinated seeds at 100 g/m²</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Maintain 2-3 cm water level in the seedbed
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Seedlings will be ready for transplanting in 25-30
                              days
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Transplanting
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Transplant 25-30 days old seedlings</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Plant 2-3 seedlings per hill</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Maintain spacing of 20 cm × 15 cm</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Transplant in lines to facilitate weeding and
                              other operations
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Water Management
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Maintain 2-3 cm standing water from transplanting
                              until 2 weeks before harvest
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Critical stages for irrigation: tillering, panicle
                              initiation, and flowering
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Drain field 10-15 days before harvesting
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Management Tab */}
              <TabsContent value="management">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">
                      Crop Management
                    </CardTitle>
                    <CardDescription className="text-green-700">
                      Fertilizer application, weed control, and pest management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Fertilizer Application
                        </h3>
                        <div className="mb-4">
                          <p className="text-green-700 mb-2">
                            Recommended fertilizer rates per acre:
                          </p>
                          <ul className="space-y-2 text-green-700">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>
                                Nitrogen (N): {crop.fertilizer.nitrogen}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>
                                Phosphorus (P): {crop.fertilizer.phosphorus}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>
                                Potassium (K): {crop.fertilizer.potassium}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-green-700 mb-2">
                            Application schedule:
                          </p>
                          <ul className="space-y-2 text-green-700">
                            {crop.fertilizer.application.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Weed Management
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Manual weeding at 20 and 40 days after
                              transplanting
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Pre-emergence herbicides: Apply Pretilachlor or
                              Butachlor within 3 days of transplanting
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Post-emergence herbicides: Apply Bispyribac-sodium
                              at 15-20 days after transplanting
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Maintain proper water level to suppress weed
                              growth
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Pest Management
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {crop.pests.map((pest, index) => (
                            <AccordionItem key={index} value={`pest-${index}`}>
                              <AccordionTrigger className="text-green-800 hover:text-green-600">
                                {pest.name}
                              </AccordionTrigger>
                              <AccordionContent className="text-green-700">
                                <div className="space-y-2">
                                  <div>
                                    <p className="font-medium text-green-700">
                                      Symptoms:
                                    </p>
                                    <p>{pest.symptoms}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-green-700">
                                      Management:
                                    </p>
                                    <p>{pest.management}</p>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Disease Management
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {crop.diseases.map((disease, index) => (
                            <AccordionItem
                              key={index}
                              value={`disease-${index}`}
                            >
                              <AccordionTrigger className="text-green-800 hover:text-green-600">
                                {disease.name}
                              </AccordionTrigger>
                              <AccordionContent className="text-green-700">
                                <div className="space-y-2">
                                  <div>
                                    <p className="font-medium text-green-700">
                                      Symptoms:
                                    </p>
                                    <p>{disease.symptoms}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-green-700">
                                      Management:
                                    </p>
                                    <p>{disease.management}</p>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Harvesting Tab */}
              <TabsContent value="harvesting">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">
                      Harvesting & Post-Harvest
                    </CardTitle>
                    <CardDescription className="text-green-700">
                      When and how to harvest, plus post-harvest handling
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Harvesting Indicators
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>{crop.harvesting.indicators}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Grain moisture content should be around 20-22%
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Typically ready for harvest 30-35 days after
                              flowering
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Harvesting Methods
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>{crop.harvesting.method}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Cut the crop at 15-20 cm above ground level
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Avoid harvesting during rainy days to prevent
                              grain quality deterioration
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Threshing
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Thresh immediately after harvesting or within 2-3
                              days
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Use pedal thresher, power thresher, or traditional
                              methods
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Clean the threshed grain to remove chaff, straw,
                              and other impurities
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Drying
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Dry grains to reduce moisture content to 12-14%
                              for safe storage
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Spread grains in thin layers (3-5 cm) on clean
                              surfaces
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Turn grains every 1-2 hours for uniform drying
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Avoid over-drying as it can cause grain breakage
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Storage
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Store in clean, dry, and well-ventilated
                              containers or bags
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Keep storage area free from rodents and insects
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Place bags on wooden pallets to prevent moisture
                              absorption from the floor
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Regularly inspect stored grain for signs of pests
                              or spoilage
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Economics Tab */}
              <TabsContent value="economics">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">
                      Economics & Market Information
                    </CardTitle>
                    <CardDescription className="text-green-700">
                      Yield potential, production costs, and market insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Expected Yield
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Average yield: {crop.yield.average}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Potential yield: {crop.yield.potential}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Factors affecting yield: soil fertility, water
                              management, pest control, variety
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Production Costs
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-green-100">
                                <th className="border border-green-200 px-4 py-2 text-left text-green-800">
                                  Item
                                </th>
                                <th className="border border-green-200 px-4 py-2 text-right text-green-800">
                                  Cost (Taka/Acre)
                                </th>
                                <th className="border border-green-200 px-4 py-2 text-right text-green-800">
                                  Percentage
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Land preparation
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  5,000
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  10%
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Seeds
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  3,000
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  6%
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Fertilizers
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  8,000
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  16%
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Irrigation
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  10,000
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  20%
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Plant protection (pesticides)
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  4,000
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  8%
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Labor
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  15,000
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  30%
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Harvesting and post-harvest
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  5,000
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  10%
                                </td>
                              </tr>
                              <tr className="bg-green-50 font-medium">
                                <td className="border border-green-200 px-4 py-2 text-green-800">
                                  Total
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-800">
                                  50,000
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-800">
                                  100%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-sm text-green-600 mt-2">
                          Note: Costs are approximate and may vary based on
                          location, input prices, and farming practices.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Market Information
                        </h3>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Current market price: {crop.market.price}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Market demand: {crop.market.demand}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Storage life: {crop.market.storageLife}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Price fluctuation: Prices typically peak during
                              July-September and are lowest during April-May
                              (harvest season)
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-green-800 mb-3">
                          Profitability Analysis
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-green-100">
                                <th className="border border-green-200 px-4 py-2 text-left text-green-800">
                                  Item
                                </th>
                                <th className="border border-green-200 px-4 py-2 text-right text-green-800">
                                  Amount (Taka/Acre)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Average yield (kg/acre)
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  3,000
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Average price (Taka/kg)
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  20
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Gross revenue (Taka/acre)
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  60,000
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Total cost (Taka/acre)
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  50,000
                                </td>
                              </tr>
                              <tr className="bg-green-50 font-medium">
                                <td className="border border-green-200 px-4 py-2 text-green-800">
                                  Net profit (Taka/acre)
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-800">
                                  10,000
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-green-200 px-4 py-2 text-green-700">
                                  Benefit-Cost Ratio (BCR)
                                </td>
                                <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                                  1.2
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-sm text-green-600 mt-2">
                          Note: Profitability may vary based on yield, market
                          prices, and production costs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Resources */}
        <Card className="border-green-100 shadow-sm mt-8">
          <CardHeader>
            <CardTitle className="text-green-800">Related Resources</CardTitle>
            <CardDescription className="text-green-700">
              Additional information and resources for {crop.name} cultivation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <h3 className="font-medium text-green-800">
                      Common Problems
                    </h3>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Learn about common problems faced during {crop.name}{" "}
                    cultivation and how to address them.
                  </p>
                  <Button variant="link" className="text-green-600 p-0">
                    View Problems & Solutions
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-medium text-green-800">
                      Success Stories
                    </h3>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Read success stories from farmers who have achieved high
                    yields with {crop.name}.
                  </p>
                  <Button variant="link" className="text-green-600 p-0">
                    Read Success Stories
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <Scissors className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-medium text-green-800">
                      Variety Selection
                    </h3>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Compare different varieties of {crop.name} and choose the
                    best one for your conditions.
                  </p>
                  <Button variant="link" className="text-green-600 p-0">
                    Compare Varieties
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
