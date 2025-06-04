import { apiSlice } from "@/redux/apiSlice";
import { CropSuggestionBody } from "@/types/cropSuggestion";

export const cropSuggestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestCropSuggestion: builder.mutation({
      query: (body: CropSuggestionBody) => ({
        url: `/api/v1/crops/crop-suggestion`,
        method: "POST",
        body,
      }),
    }),
    cropSuggestionResult: builder.query({
      query: (cropId: string) =>
        `/api/v1/crops/crop-suggestion/result/${cropId}`,
    }),
    cropSuggestionHistory: builder.query({
      query: (params: Record<string, unknown>) => ({
        url: `/api/v1/crops/crop-suggestion/histories`,
        method: "POST",
        params,
      }),
    }),
  }),
});

export const { useRequestCropSuggestionMutation } = cropSuggestionApiSlice;
