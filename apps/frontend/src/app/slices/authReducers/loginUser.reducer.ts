import { createAsyncThunk } from "@reduxjs/toolkit"
import type { LoginRequestDto } from "../../../types/dtos/requests/LoginRequestDto"
import { login } from "../../../services/authApi"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { type AuthState } from "../authSlice"

export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials: LoginRequestDto, {rejectWithValue}) => {
        try {
            const data = await login(credentials)
            return data
        }catch(err: any){
            return rejectWithValue(err.response.data)
        }
    }
)

export function loginUserBuilderCases (builder: ActionReducerMapBuilder<AuthState>) {
    builder
        .addCase(loginUser.pending, (state) => {
            state.status = "loading"
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.access_token = action.payload.access_token
            state.user = action.payload.user
            localStorage.setItem('access_token', action.payload.access_token)
            localStorage.setItem('refresh_token', action.payload.refresh_token)
            state.status = "succeeded"
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
        })

    return builder
}