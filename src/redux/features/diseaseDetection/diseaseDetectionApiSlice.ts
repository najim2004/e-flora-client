import { apiSlice } from '@/redux/apiSlice';

export const diseaseDetectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiseaseDetectionResults: builder.query({
      query: (image) => `/api/disease-detection?image=${image}`,
    }),
  }),
});

export const { useGetDiseaseDetectionResultsQuery } = diseaseDetectionApiSlice;
