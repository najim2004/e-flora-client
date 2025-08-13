import { apiSlice } from "@/redux/apiSlice";
import { CropSuggestionPayload } from "@/types/cropSuggestion";

export const cropSuggestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestCropSuggestion: builder.mutation({
      query: (body: CropSuggestionPayload) => ({
        url: "/api/v1/crops/crop-suggestion",
        method: "POST",
        body,
      }),
    }),
    cropSuggestionResult: builder.query({
      query: (cropId: string) =>
        `/api/v1/crops/crop-suggestion/result/${cropId}`,
    }),
    cropSuggestionHistory: builder.mutation({
      query: (params: { page: number; limit: number }) => ({
        url: `/api/v1/crops/crop-suggestion/histories`,
        method: "POST",
        params,
      }),
    }),
  }),
});

export const {
  useRequestCropSuggestionMutation,
  useCropSuggestionResultQuery,
  useCropSuggestionHistoryMutation,
} = cropSuggestionApiSlice;
