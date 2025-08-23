import { notFound } from "next/navigation";
import CropGrid from "@/components/crop-suggestions/CropGrid";
import { CropSuggestionResult } from "@/types/cropSuggestion";
import { JSX } from "react";
import GardenDetails from "@/components/crop-suggestions/GardenDetails";
import { cookies } from "next/headers";

interface ResultResponse {
  success: boolean;
  message: string;
  data: CropSuggestionResult;
}
const getResultData = async (id: string): Promise<ResultResponse> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/crops/crop-suggestion/result/${id}`,
    {
      credentials: "include",
      headers: {
        Cookie: cookieHeader,
      },
      next: { revalidate: 60 },
    }
  );

  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch crop suggestion result");
  }
  return res.json();
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecommendationsPage({
  params,
}: Props): Promise<JSX.Element> {
  const id = (await params).id;
  const resultData = await getResultData(id).catch(() => notFound());
  console.log(resultData);
  const cropData = resultData.data.crops;

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Recommended Crops for Your Garden
          </h2>
        </div>
        <GardenDetails data={resultData.data.input} />
        <CropGrid crops={cropData} />
        {cropData.length === 0 && (
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
