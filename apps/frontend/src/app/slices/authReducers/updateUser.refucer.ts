import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { type AuthState } from "../authSlice"
import { type UpdateUserDto } from "../../../types/dtos/requests/UpdateUserRequestDto"
import { updateUser } from "../../../services/authApi"
import { authSlice } from "../authSlice"

export const updateCurrentUser = createAsyncThunk(
    "auth/updateUser",
    async (updateUserDto: UpdateUserDto, thunkApi) => {
        await updateUser(updateUserDto)
        thunkApi.dispatch(authSlice.actions.updateUser(updateUserDto))
    }
)

export function updateUserBuilderCases (builder: ActionReducerMapBuilder<AuthState>) {
    builder
        .addCase(updateCurrentUser.pending, (state) => {
            state.status = "loading"
        })
        .addCase(updateCurrentUser.fulfilled, (state) => {
            state.status = "succeeded"
        })
        .addCase(updateCurrentUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
        })

    return builder
}