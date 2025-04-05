// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  otpSent: false,
  otpVerified: false,
  registrationStep: 1,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    },
    setOTPSent: (state, action) => {
      state.otpSent = action.payload;
    },
    setOTPVerified: (state, action) => {
      state.otpVerified = action.payload;
    },
    setRegistrationStep: (state, action) => {
      state.registrationStep = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  setUser,
  setOTPSent,
  setOTPVerified,
  setRegistrationStep,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
