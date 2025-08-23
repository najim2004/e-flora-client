import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
// import { userApiSlice } from "./features/user/userApiSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  credentials: "include",
});

const baseQueryWithError: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 403) {
    // Dispatch logout mutation from userApiSlice
    // await api.dispatch(userApiSlice.endpoints.logout.initiate(undefined));
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithError,
  endpoints: () => ({}),
  tagTypes: [],
});

export const {} = apiSlice;
