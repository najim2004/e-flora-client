"use client";
import { ResultResponse } from "@/app/crop-suggestions/[id]/page";
import React, { useEffect, useState } from "react";
import GardenDetails from "./GardenDetails";
import CropGrid from "./CropGrid";
import { CropSuggestionResult } from "@/types/cropSuggestion";
import { notFound } from "next/navigation";

const Result = ({
  resultData,
  resultId,
}: {
  resultData: ResultResponse | null;
  resultId: string;
}) => {
  const [cropData, setCropData] = useState<CropSuggestionResult | null>(
    resultData?.data || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!resultData) {
      const fetchDta = async () => {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/crops/crop-suggestion/result/${resultId}`,
          {
            credentials: "include",
          }
        );
        console.log(res);
        if (!res.ok) {
          throw new Error("Failed to fetch crop suggestion result");
        }

        return res.json();
      };

      fetchDta()
        .then((data) => setCropData(data.data))
        .catch(() => {
          setCropData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [resultData, resultId]);
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  } else if (!cropData) return notFound();

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Recommended Crops for Your Garden
          </h2>
        </div>
        <GardenDetails data={cropData?.input} />
        <CropGrid crops={cropData.crops} />
        {cropData.crops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No crops match your current filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
