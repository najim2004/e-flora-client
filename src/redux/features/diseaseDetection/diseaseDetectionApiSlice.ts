import { apiSlice } from "@/redux/apiSlice";

export const diseaseDetectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestDiseaseDetection: builder.mutation({
      query: (args: {
        image: File;
        description: string;
        mode: 'MANUAL' | 'GARDEN_CROP';
        cropName?: string;
        gardenCropId?: string;
      }) => {
        const { image, description, mode, cropName, gardenCropId } = args;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("description", description);
        formData.append("mode", mode);

        if (mode === 'MANUAL' && cropName) {
          formData.append("cropName", cropName);
        } else if (mode === 'GARDEN_CROP' && gardenCropId) {
          formData.append("gardenCropId", gardenCropId);
        }

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
