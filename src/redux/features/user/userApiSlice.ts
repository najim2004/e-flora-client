import { apiSlice } from "@/redux/apiSlice";
import { clearUser, setUser } from "./userSlice";
import { SuccessResponse } from "@/types";
import { User } from "@/types/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => `/api/v1/users/${userId}`,
    }),
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.data && data?.success) {
            dispatch(setUser(data.data));
          } else {
            throw new Error("Failed to get user data");
          }
        } catch (error) {
          dispatch(clearUser());
          await dispatch(userApiSlice.endpoints.logout.initiate(undefined));
          console.log("Failed to fetch user:", error);
        }
      },
    }),
    signup: builder.mutation({
      query: (credentials: {
        name: string;
        email: string;
        password: string;
      }) => ({
        url: "/api/v1/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
          console.log("User logged out successfully");
        } catch (error) {
          dispatch(clearUser());
          console.log("Failed to logout:", error);
        }
      },
    }),
    me: builder.query<SuccessResponse<User>, void>({
      query: () => ({
        url: "/api/v1/auth/me",
        method: "GET",
      }),
      // providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.data && data?.success) {
            dispatch(setUser(data.data));
          } else {
            throw new Error("Failed to get user data");
          }
        } catch (error) {
          dispatch(clearUser());
          await dispatch(userApiSlice.endpoints.logout.initiate(undefined));
          console.log("Failed to fetch user:", error);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/profile",
        method: "PATCH",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/api/v1/users/change-password",
        method: "POST",
        body: passwords,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApiSlice;
