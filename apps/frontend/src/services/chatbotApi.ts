import api from "./api";

export async function chat( message: string ){
    const response = await api.post(`/chatbot`, {
        message
    })
    return response.data.content
}