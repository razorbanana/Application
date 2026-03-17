import { createSlice } from "@reduxjs/toolkit"
import type { UserType } from "../../types/UserType";

import { loginUserBuilderCases } from "./authReducers/loginUser.reducer";
import { registerUserBuilderCases } from "./authReducers/registerUser.reducer";
import { fetchUserBuilderCases } from "./authReducers/fetchUser.reducer";
import { updateUserBuilderCases } from "./authReducers/updateUser.refucer";

import { loginUser } from "./authReducers/loginUser.reducer";
import { registerUser } from "./authReducers/registerUser.reducer";
import { fetchCurrentUser } from "./authReducers/fetchUser.reducer";
import { updateCurrentUser } from "./authReducers/updateUser.refucer";
import { useChatbotStore } from "../chatbotStore";

export interface AuthState {
  user: UserType | null;
  access_token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  initialized: boolean
}

const accessTokenFromStorage = localStorage.getItem("access_token");

const initialState: AuthState = {
    user: null,
    access_token: accessTokenFromStorage,
    status: 'idle',
    error: null,
    initialized: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.access_token = null
            state.user = null
            localStorage.removeItem('access_token')
            useChatbotStore.getState().reset()
        },
        pullTokenFromStorage: (state) => {
            const token = localStorage.getItem("access_token")
            state.access_token = token ? token : null
        },
        updateUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            }
        },
        refreshToken: () => {}
    },
    extraReducers: (builder) => {
        loginUserBuilderCases(builder)
        registerUserBuilderCases(builder)
        fetchUserBuilderCases(builder)
        updateUserBuilderCases(builder)
    }
})

export const { logout, refreshToken, pullTokenFromStorage } = authSlice.actions;
export { loginUser, registerUser, fetchCurrentUser, updateCurrentUser }
export default authSlice.reducer;