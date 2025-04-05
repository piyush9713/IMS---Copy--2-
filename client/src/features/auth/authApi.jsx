// src/store/authApi.js
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOTP: builder.mutation({
      query: (email) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOTP: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    getUser: builder.query({
      query: () => "/auth/get-user",
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSendOTPMutation,
  useVerifyOTPMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useLogoutUserMutation,
} = authApi;
