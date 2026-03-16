import { createSlice } from "@reduxjs/toolkit";

import { chatBuilderCases } from "./chatbotReducers/chat.reducer";
import { fetchHistoryBuilderCases } from "./chatbotReducers/getHistory.reducer";

import { fetchHistory } from "./chatbotReducers/getHistory.reducer";
import { sendMessage } from "./chatbotReducers/chat.reducer";

export type Message = {
    sender: "user" | "assistant" | "system",
    message: string
}

export type ChatBotState = {
  messages: Message[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null;
}

const initialState: ChatBotState = {
    messages: [{
        sender: "assistant",
        message: "Hello, feel free to ask me event-related questions."
    }],
    status: 'idle',
    error: null,
}

export const chatbotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages = state.messages.concat([{sender: "user", message: action.payload}])
        }
    },
    extraReducers: (builder) => {
        chatBuilderCases(builder)
        fetchHistoryBuilderCases(builder)
    }
})

export const { addMessage } = chatbotSlice.actions
export { sendMessage, fetchHistory }
export default chatbotSlice.reducer;