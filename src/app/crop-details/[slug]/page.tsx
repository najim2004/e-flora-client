"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CropOverview from "@/components/crop-details/CropOverview";
import AboutCrop from "@/components/crop-details/AboutCrop";
import CultivationGuidelines from "@/components/crop-details/CultivationGuidelines";
import CropManagement from "@/components/crop-details/CropManagement";
import HarvestingPostHarvest from "@/components/crop-details/HarvestingPostHarvest";
import EconomicsMarketInformation from "@/components/crop-details/EconomicsMarketInformation";
import RelatedResources from "@/components/crop-details/RelatedResources";

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
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <Link
            href="/crop-suggestions"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
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
        <div className="grid md:grid-cols-3 gap-8 mb-8 w-full">
          <div className="md:col-span-1">
            <CropOverview crop={crop} saved={saved} setSaved={setSaved} />
          </div>

          <div className="md:col-span-2 w-ful">
            <AboutCrop crop={crop} />

            <Tabs defaultValue="cultivation" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 w-full rounded-sm h-max p-1.5">
                <TabsTrigger
                  value="cultivation"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-xs py-1.5 text-gray-400"
                >
                  Cultivation
                </TabsTrigger>
                <TabsTrigger
                  value="management"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-xs py-1.5 text-gray-400"
                >
                  Management
                </TabsTrigger>
                <TabsTrigger
                  value="harvesting"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-xs py-1.5 text-gray-400"
                >
                  Harvesting
                </TabsTrigger>
                <TabsTrigger
                  value="economics"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-xs py-1.5 text-gray-400"
                >
                  Economics
                </TabsTrigger>
              </TabsList>

              {/* Cultivation Tab */}
              <TabsContent value="cultivation">
                <CultivationGuidelines crop={crop} />
              </TabsContent>

              {/* Management Tab */}
              <TabsContent value="management">
                <CropManagement crop={crop} />
              </TabsContent>

              {/* Harvesting Tab */}
              <TabsContent value="harvesting">
                <HarvestingPostHarvest crop={crop} />
              </TabsContent>

              {/* Economics Tab */}
              <TabsContent value="economics">
                <EconomicsMarketInformation crop={crop} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Resources */}
        {/* <RelatedResources crop={crop} /> */}
      </main>
    </div>
  );
}
