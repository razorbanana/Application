import axios from "axios";
import type { EventDto } from "../types/dtos/EventDto";

const apiUrl = import.meta.env.VITE_API_URL

export async function getAllEvents(): Promise<EventDto[]>{
    const response = await axios.get<EventDto[]>(`${apiUrl}/events`)
    return response.data
}

export async function joinEventById(eventId: string): Promise<void>{
    await axios.post(`${apiUrl}/events/${eventId}/join`)
}