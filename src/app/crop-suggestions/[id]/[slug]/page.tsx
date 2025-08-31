import ClientCropDetailsPage from "@/components/crop-suggestions/details/ClientCropDetailsPage";
import { CropDetails } from "@/types/cropSuggestion";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { JSX } from "react";

export interface ResultResponse {
  success: boolean;
  message: string;
  data: CropDetails;
  newAccessToken?: string;
}

const geCropDetailsData = async (slug: string): Promise<ResultResponse> => {
  const cookieStore = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/crops/crop-details/${slug}`,
    {
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { revalidate: 3000 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch crop details");
  }
  return await res.json();
};

// ----------------- ✅ Dynamic Metadata -----------------
type MetaProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const cropDetailsData = await geCropDetailsData(slug);

    if (!cropDetailsData?.data) {
      return {
        title: "Crop not found",
        description: "No crop details available.",
      };
    }

    const crop = cropDetailsData.data;

    return {
      title: `${crop.name} - Crop Details`,
      description: crop.description || `Learn more about ${crop.name}`,
      openGraph: {
        title: crop.name,
        description: crop.description || "",
        images: crop.image ? [crop.image] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: crop.name,
        description: crop.description || "",
        images: crop.image ? [crop.image] : [],
      },
    };
  } catch {
    return {
      title: "Error fetching crop details",
      description: "Something went wrong while loading crop data.",
    };
  }
}

// ----------------- ✅ Page Component -----------------
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServerCropDetailsPage({
  params,
}: Props): Promise<JSX.Element> {
  const slug = (await params).slug;
  const cropDetailsData = await geCropDetailsData(slug).catch((e) => {
    console.log(e);
    return null;
  });

  return (
    <ClientCropDetailsPage
      cropDetails={cropDetailsData?.data || null}
      params={{ slug: slug ?? "" }}
    />
  );
}
