import { Crop } from "@/types/cropDetails";
import AboutCrop from "@/components/crop-details/AboutCrop";
import CropManagement from "@/components/crop-details/CropManagement";
import CropOverview from "@/components/crop-details/CropOverview";
import CultivationGuidelines from "@/components/crop-details/CultivationGuidelines";
import EconomicsMarketInformation from "@/components/crop-details/EconomicsMarketInformation";
import HarvestingPostHarvest from "@/components/crop-details/HarvestingPostHarvest";
import RelatedResources from "@/components/crop-details/RelatedResources";
import { ArrowLeft, Bookmark, Download, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import MatchPercentage from "@/components/crop-details/MatchPercentage";

interface CropDetailsPageProps {
  params: { slug: string };
}

async function getCropDetails(slug: string): Promise<Crop> {
  const res = await fetch(
    `http://localhost:5000/api/v1/crops/crop-details/${slug}`,
    {
      cache: "force-cache",
    }
  ); // Replace with your actual API endpoint
  if (!res.ok) {
    notFound();
  }
  const data = await res.json();
  if (!data.success || !data.data) notFound();
  return data.data;
}

const CropDetailsPage: React.FC<CropDetailsPageProps> = async ({ params }) => {
  const crop = await getCropDetails(params.slug);
  console.log(crop);
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <Link
            href="/crop-suggestions"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Backa
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Save
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
            <CropOverview crop={crop} />
          </div>

          <div className="md:col-span-2">
            <MatchPercentage cropName={crop.name} />
            <AboutCrop crop={crop} />

            <Tabs defaultValue="cultivation" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 h-max p-1.5 rounded-sm w-full">
                <TabsTrigger
                  value="cultivation"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white py-1.5 rounded-sm text-gray-400"
                >
                  Cultivation
                </TabsTrigger>
                <TabsTrigger
                  value="management"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white py-1.5 rounded-sm text-gray-400"
                >
                  Management
                </TabsTrigger>
                <TabsTrigger
                  value="harvesting"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white py-1.5 rounded-sm text-gray-400"
                >
                  Harvesting
                </TabsTrigger>
                <TabsTrigger
                  value="economics"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white py-1.5 rounded-sm text-gray-400"
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
        <RelatedResources crop={crop} />
      </main>
    </div>
  );
};

export default CropDetailsPage;
