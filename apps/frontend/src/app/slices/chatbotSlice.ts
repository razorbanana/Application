import { createSlice } from "@reduxjs/toolkit";

import { chatBuilderCases } from "./chatbotReducers/chat.reducer";
import { sendMessage } from "./chatbotReducers/chat.reducer";

export type Message = {
    sender: "user" | "chatbot",
    message: string
}

export type ChatBotState = {
  messages: Message[]
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
        addMessage: (state, action) => {
            console.log(action)
            state.messages = state.messages.concat([{sender: "user", message: action.payload}])
        }
    },
    extraReducers: (builder) => {
        chatBuilderCases(builder)
    }
})

export const { addMessage } = chatbotSlice.actions
export { sendMessage }
export default chatbotSlice.reducer;