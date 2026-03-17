import api from "./api";
import type { ChatbotHistoryDto } from "../types/dtos/ChatbotHistory.dto";

export async function chat( message: string ){
    const response = await api.post(`/chatbot`, {
        message
    })
    return response.data
}

export async function getHistory(): Promise<ChatbotHistoryDto>{
    const response = await api.get(`/chatbot/history`)
    return response.data
}