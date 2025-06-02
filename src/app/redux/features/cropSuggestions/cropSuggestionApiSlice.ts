import { apiSlice } from '@/app/redux/apiSlice';

export const cropSuggestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCropSuggestions: builder.query({
      query: (location) => `/api/crop-suggestions?location=${location}`,
    }),
  }),
});

export const { useGetCropSuggestionsQuery } = cropSuggestionApiSlice;
