import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: () => {},
        logout: () => {},
        register: () => {},
        refreshToken: () => {}
    }
})

export const { login, logout, register, refreshToken } = authSlice.actions;

export default authSlice.reducer;