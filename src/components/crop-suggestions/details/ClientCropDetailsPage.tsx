"use client";

import { useState, useEffect } from "react";
import { CropDetails } from "@/types/cropSuggestion";
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
import { notFound } from "next/navigation";
import Cookies from "js-cookie";
interface ClientCropDetailsPageProps {
  params: { slug: string };
  cropDetails: CropDetails | null;
}

const ClientCropDetailsPage = ({
  params,
  cropDetails,
}: ClientCropDetailsPageProps) => {
  const [clientCropDetails, setClientCropDetails] =
    useState<CropDetails | null>(cropDetails || null);
  const [activeSection, setActiveSection] = useState("overview");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!cropDetails) {
      const fetchDta = async () => {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/crops/crop-details/${params.slug}`,
          {
            credentials: "include",
          }
        );
        console.log(res);
        if (!res.ok) {
          throw new Error("Failed to fetch crop suggestion result");
        }
        const token = res?.headers?.get("x-access-token") || null;
        if (token) {
          Cookies.set("accessToken", token, {
            expires: 7,
            path: "/",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV === "production",
          });
        }
        const data = await res.json();
        if (!data?.success)
          throw new Error("Failed to fetch crop suggestion result");
        return data;
      };

      fetchDta()
        .then((data) => setClientCropDetails(data.data))
        .catch(() => {
          setClientCropDetails(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [cropDetails, params]);

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  } else if (!clientCropDetails) return notFound();

  return (
    <div className="bg-gray-50">
      <div className="relative bg-gray-100">
        <div
          className="h-64 bg-cover bg-center max-w-7xl mx-auto"
          style={{ backgroundImage: `url(${cropDetails?.image?.url})` }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xs bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-2">
                {clientCropDetails.name}
              </h1>
              <p className="text-xl italic">
                {clientCropDetails.scientificName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          <div className="md:col-span-2">
            <SideNav
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
          <div className="md:col-span-5">
            <Overview cropDetails={clientCropDetails} />
            <GrowthAndHarvest cropDetails={clientCropDetails} />
            <CareRequirements cropDetails={clientCropDetails} />
            <PestAndDiseaseManagement cropDetails={clientCropDetails} />
            <CompanionPlanting cropDetails={clientCropDetails} />
            <NutritionalAndCulinary cropDetails={clientCropDetails} />
            <EconomicAspects cropDetails={clientCropDetails} />
            <SustainabilityTips cropDetails={clientCropDetails} />
            <AestheticValue cropDetails={clientCropDetails} />
            <RegionalSuitability cropDetails={clientCropDetails} />
            <FunFacts cropDetails={clientCropDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCropDetailsPage;
