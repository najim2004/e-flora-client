"use client";
import { useEffect } from "react";
import SummaryBar from "@/components/garden/SummaryBar";
import PromoCard from "@/components/garden/PromoCard";
import CropList from "@/components/garden/CropList";
import ArchivedCropsSection from "@/components/garden/ArchivedCropsSection";
import TodaysTasks from "@/components/garden/TodaysTasks";
import MiniCalendar from "@/components/garden/MiniCalendar";
import GardenDetails from "@/components/garden/GardenDetails";
import WeatherSection from "@/components/garden/WeatherSection";
import type { Garden } from "@/types/Garden";
import { useFetch } from "@/hooks/useFetch";

const todaysTasks = [
  { crop: "Cherry Tomatoes", task: "Water", time: "8:00 AM" },
  { crop: "Basil", task: "Check pests", time: "6:00 PM" },
  { crop: "Spinach", task: "Harvest", time: "7:00 AM" },
];

interface MyGardenClientProps {
  garden: Garden | null;
}

export default function MyGardenClient({ garden }: MyGardenClientProps) {
  const {
    data: clientData,
    loading,
    error,
    fetchData,
  } = useFetch<{ success: boolean; message: string; data: Garden }>();

  useEffect(() => {
    if (!garden) {
      fetchData(`/api/v1/garden/my-garden`);
    }
  }, [garden, fetchData]);

  const activeGarden = garden ?? clientData?.data ?? null;

  if (!activeGarden && loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }
  if (!activeGarden && error) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load garden data.
      </div>
    );
  }
  if (!activeGarden) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <SummaryBar
          active={activeGarden.activeCrops}
          pending={activeGarden.pendingCrops}
          removed={activeGarden.removedCrops}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <GardenDetails garden={activeGarden} />
            <PromoCard />
            <CropList crops={activeGarden.crops} />
            <ArchivedCropsSection crops={activeGarden.archivedCrops ?? []} />
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            <WeatherSection weather={activeGarden.weather} />
            <TodaysTasks tasks={todaysTasks} />
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
