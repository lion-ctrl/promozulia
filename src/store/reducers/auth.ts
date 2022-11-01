import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
}

export interface AuthTypes {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: UserType | null;
}

export const initialState: AuthTypes = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

const getState = (): AuthTypes => {
  return {
    ...initialState,
    accessToken:
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null,
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getState(),
  reducers: {
    login: (state, action: PayloadAction<{ user: UserType; jwt: string }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.jwt;
      localStorage.setItem("accessToken", action.payload.jwt);
    },
    refreshUser: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = initialState.isAuthenticated;
      state.accessToken = initialState.accessToken;
      localStorage.removeItem("accessToken");
    },
  },
});

export default authSlice.reducer;
