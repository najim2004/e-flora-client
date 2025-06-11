import { apiSlice } from "@/redux/apiSlice";

export const diseaseDetectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestDiseaseDetection: builder.mutation({
      query: ({ image, description }: { image: File; description: string }) => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("description", description);

        return {
          url: "/api/v1/crops/disease-detection",
          method: "POST",
          body: formData,
        };
      },
    }),
    diseaseDetectionResults: builder.query({
      query: (id) => `/api/disease-detection/result/${id}`,
    }),
    cropSuggestionHistory: builder.query({
      query: (params: Record<string, unknown>) => ({
        url: `/api/v1/crops/disease-detection/histories`,
        method: "POST",
        params,
      }),
    }),
  }),
});

export const {
  useDiseaseDetectionResultsQuery,
  useCropSuggestionHistoryQuery,
  useRequestDiseaseDetectionMutation,
} = diseaseDetectionApiSlice;
