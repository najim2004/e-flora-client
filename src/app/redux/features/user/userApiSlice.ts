import { apiSlice } from "@/app/redux/apiSlice";
import { clearUser, setUser } from "./userSlice";
import { SuccessResponse } from "@/types";
import { User } from "@/types/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
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
          console.error("Failed to fetch user:", error);
        }
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
          console.log("User logged out successfully");
        } catch (error) {
          dispatch(clearUser());
          console.error("Failed to logout:", error);
        }
      },
    }),
    me: builder.query<SuccessResponse<User>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
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
          console.error("Failed to fetch user:", error);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/users/profile",
        method: "PATCH",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/api/users/change-password",
        method: "POST",
        body: passwords,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/auth/reset-password",
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
