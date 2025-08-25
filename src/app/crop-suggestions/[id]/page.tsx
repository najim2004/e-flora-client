import Result from "@/components/crop-suggestions/Result";
import { CropSuggestionResult } from "@/types/cropSuggestion";
import { cookies } from "next/headers";
import { JSX } from "react";

export interface ResultResponse {
  success: boolean;
  message: string;
  data: CropSuggestionResult;
}
const getResultData = async (id: string): Promise<ResultResponse> => {
  const cookieStore = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/crops/crop-suggestion/result/${id}`,
    {
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { revalidate: 0 },
    }
  );

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
  const resultData = await getResultData(id).catch(() => null);
  return (
    <>
      <Result resultData={resultData} resultId={id} />
    </>
  );
}
