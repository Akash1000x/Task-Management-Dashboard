import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  name: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string }>) => {
      state.isAuthenticated = true;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.name = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
