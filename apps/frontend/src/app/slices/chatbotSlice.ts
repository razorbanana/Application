import { createSlice } from "@reduxjs/toolkit";

import { chatBuilderCases } from "./chatbotReducers/chat.reducer";
import { sendMessage } from "./chatbotReducers/chat.reducer";

export type ChatBotState = {
  messages: string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null;
}

const initialState: ChatBotState = {
    messages: [],
    status: 'idle',
    error: null,
}

export const chatbotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        chatBuilderCases(builder)
    }
})

export { sendMessage }
export default chatbotSlice.reducer;