import { apiSlice } from "@/redux/apiSlice";

export const cropSuggestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  useCropSuggestionResultQuery,
  useCropSuggestionHistoryMutation,
} = cropSuggestionApiSlice;
