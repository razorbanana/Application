import type { EventDto } from "../types/dtos/EventDto";
import api from "./api";

export async function getAllEvents(): Promise<EventDto[]>{
    const response = await api.get<EventDto[]>(`/events`)
    return response.data
}

export async function joinEventById(eventId: string): Promise<void>{
    await api.post(`/events/${eventId}/join`)
}