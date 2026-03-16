import {create} from "zustand"
import { chat, getHistory } from "../services/chatbotApi"

export type Message = {
    sender: "user" | "assistant" | "system"
    message: string
}

export type ChatBotState = {
    messages: Message[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null 
    addMessage: (msg: string) => void
    sendMessage: (msg: string) => Promise<void>
    fetchHistory: () => Promise<void>
    reset: () => void
}

export const useChatbotStore = create<ChatBotState>((set, _) => ({
    messages: [
        {
            sender: "assistant",
            message: "Hello, feel free to ask me event-related questions."
        }
    ],
    status: "idle",
    error: null,

    addMessage: (msg) => {
        set((state) => ({
            messages: [...state.messages, {sender: "user", message: msg}]
        }))
    },

    sendMessage: async (msg) => {
        set({status: "loading", error: null})
        try {
            const response = await chat(msg)
            set((state) => ({
                messages: [...state.messages, { sender: "assistant", message: response }],
                status: "succeeded"
            }))
        } catch (err: any) {
            set({ status: "failed", error: err.response?.data || err.message })
        }
    },

    fetchHistory: async () => {
        set({ status: "loading", error: null })
        try {
            const history = await getHistory()
            set({
                messages: history.map(({ role, content }: any) => ({
                sender: role,
                message: content
                })),
                status: "succeeded"
            })
        } catch (err: any) {
            set({ status: "failed", error: err.message })
        }
    },

    reset: () => {
        set({
            messages: [],
            status: "idle",
            error: null
        })
    }
}))