import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi.jsx";
import authReducer from "../features/auth/authSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
