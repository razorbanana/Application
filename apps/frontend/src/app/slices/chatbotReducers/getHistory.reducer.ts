import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { ChatBotState } from "../chatbotSlice"
import { getHistory } from "../../../services/chatbotApi"
import type { ChatbotHistoryDto } from "../../../types/dtos/ChatbotHistory.dto"

export const fetchHistory = createAsyncThunk(
    "getHistory",
    async (): Promise<ChatbotHistoryDto> => {
        try {
            const response = await getHistory()
            return response
        }catch(err: any){
            return err.message
        }
    }
)

export function fetchHistoryBuilderCases (builder: ActionReducerMapBuilder<ChatBotState>) {
    builder
        .addCase(fetchHistory.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchHistory.fulfilled, (state, action) => {
            state.messages = action.payload.map(({role, content}) => ({sender: role, message: content}))
            state.status = "succeeded"
        })
        .addCase(fetchHistory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
        })

    return builder
}