import { cookies } from "next/headers";
import { JSX } from "react";
import type { Garden } from "@/types/Garden";
import MyGardenClient from "./MyGardenClient";

interface GardenApiResponse {
  success: boolean;
  message: string;
  data: Garden;
}

const getGardenData = async (): Promise<GardenApiResponse | null> => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/garden/my-garden`,
      {
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) return null;
    return (await res.json()) as GardenApiResponse;
  } catch {
    return null;
  }
};

export default async function MyGardenPage(): Promise<JSX.Element> {
  const gardenResponse = await getGardenData().catch(() => null);
  return <MyGardenClient garden={gardenResponse?.data || null} />;
}
