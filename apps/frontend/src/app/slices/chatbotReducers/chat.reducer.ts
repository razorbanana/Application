import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { ChatBotState } from "../chatbotSlice"
import { chat } from "../../../services/chatbotApi"

export const sendMessage = createAsyncThunk(
    "chat",
    async (message: string, {rejectWithValue}) => {
        try {
            const response = await chat(message)
            return response
        }catch(err: any){
            return rejectWithValue(err.response.data)
        }
    }
)

export function chatBuilderCases (builder: ActionReducerMapBuilder<ChatBotState>) {
    builder
        .addCase(sendMessage.pending, (state) => {
            state.status = "loading"
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            state.messages = state.messages.concat([action.payload])
            state.status = "succeeded"
        })
        .addCase(sendMessage.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
        })

    return builder
}