import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { type AuthState } from "../authSlice"
import type { RegisterRequestDto } from "../../../types/dtos/requests/RegisterRequestDto"
import { register } from "../../../services/authApi"

export const registerUser = createAsyncThunk(
    "user/register",
    async (details: RegisterRequestDto, {rejectWithValue}) => {
        try{
            const data = await register(details)
            return data
        }catch(err:any){
            return rejectWithValue(err.response.data)
        }
    }
)

export function registerUserBuilderCases (builder: ActionReducerMapBuilder<AuthState>) {
    builder
        .addCase(registerUser.fulfilled, (state, action) => {
            state.access_token = action.payload.access_token
            state.user = action.payload.user
            localStorage.setItem('access_token', action.payload.access_token)
            localStorage.setItem('refresh_token', action.payload.refresh_token)
            state.status = "succeeded"
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
        })

    return builder
}