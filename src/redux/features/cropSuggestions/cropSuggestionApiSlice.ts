import { apiSlice } from '@/redux/apiSlice';

export const cropSuggestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCropSuggestions: builder.query({
      query: (location) => `/api/crop-suggestions?location=${location}`,
    }),
  }),
});

export const { useGetCropSuggestionsQuery } = cropSuggestionApiSlice;
