import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { type AuthState } from "../authSlice"
import { fetchUser } from "../../../services/authApi"

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async () => {
        try{
            const data = await fetchUser()
            return data
        }catch(err:any){
            console.error(err)
        }
    }
)

export function fetchUserBuilderCases (builder: ActionReducerMapBuilder<AuthState>) {
    builder
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = "succeeded"
            state.initialized = true
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
            state.initialized = true
        })

    return builder
}