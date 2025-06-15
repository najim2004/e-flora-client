import { apiSlice } from "@/redux/apiSlice";
import { CropSuggestionBody } from "@/types/cropSuggestion";
import { setHistory } from "./cropSuggestionSlice";

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
    cropSuggestionHistory: builder.mutation({
      query: (params: { page: number; limit: number }) => ({
        url: `/api/v1/crops/crop-suggestion/histories`,
        method: "POST",
        params,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.success && data?.data) {
            dispatch(setHistory(data.data));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRequestCropSuggestionMutation,
  useCropSuggestionResultQuery,
  useCropSuggestionHistoryMutation,
} = cropSuggestionApiSlice;
