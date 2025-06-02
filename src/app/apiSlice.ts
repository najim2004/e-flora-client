import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getExampleData: builder.query({
      query: () => '/api/example',
    }),
  }),
});

export const { useGetExampleDataQuery } = apiSlice;
