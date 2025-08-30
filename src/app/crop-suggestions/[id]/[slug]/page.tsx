"use client";

import { useState, useEffect } from "react";
import { ICropDetails } from "@/types/cropSuggestion";
import AestheticValue from "@/components/crop-suggestions/details/AestheticValue";
import CareRequirements from "@/components/crop-suggestions/details/CareRequirements";
import CompanionPlanting from "@/components/crop-suggestions/details/CompanionPlanting";
import EconomicAspects from "@/components/crop-suggestions/details/EconomicAspects";
import FunFacts from "@/components/crop-suggestions/details/FunFacts";
import GrowthAndHarvest from "@/components/crop-suggestions/details/GrowthAndHarvest";
import NutritionalAndCulinary from "@/components/crop-suggestions/details/NutritionalAndCulinary";
import Overview from "@/components/crop-suggestions/details/Overview";
import PestAndDiseaseManagement from "@/components/crop-suggestions/details/PestAndDiseaseManagement";
import RegionalSuitability from "@/components/crop-suggestions/details/RegionalSuitability";
import SideNav from "@/components/crop-suggestions/details/SideNav";
import SustainabilityTips from "@/components/crop-suggestions/details/SustainabilityTips";
import { mockCropDetails } from "@/lib/mockData";

const CropDetailsPage = ({ params }: { params: { slug: string } }) => {
  const [cropDetails, setCropDetails] = useState<ICropDetails | null>(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    setCropDetails(mockCropDetails);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("div[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [cropDetails]);

  if (!cropDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: "url(/hero.jpg)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-2">{cropDetails.name}</h1>
            <p className="text-xl italic">{cropDetails.scientificName}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <SideNav
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
          <div className="md:col-span-3">
            <Overview cropDetails={cropDetails} />
            <GrowthAndHarvest cropDetails={cropDetails} />
            <CareRequirements cropDetails={cropDetails} />
            <PestAndDiseaseManagement cropDetails={cropDetails} />
            <CompanionPlanting cropDetails={cropDetails} />
            <NutritionalAndCulinary cropDetails={cropDetails} />
            <EconomicAspects cropDetails={cropDetails} />
            <SustainabilityTips cropDetails={cropDetails} />
            <AestheticValue cropDetails={cropDetails} />
            <RegionalSuitability cropDetails={cropDetails} />
            <FunFacts cropDetails={cropDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsPage;
