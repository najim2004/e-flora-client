import { apiSlice } from '@/app/redux/apiSlice';

export const diseaseDetectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiseaseDetectionResults: builder.query({
      query: (image) => `/api/disease-detection?image=${image}`,
    }),
  }),
});

export const { useGetDiseaseDetectionResultsQuery } = diseaseDetectionApiSlice;
