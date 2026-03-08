import type { EventDto } from "../types/dtos/EventDto";
import type { CreateEventRequestDto } from "../types/dtos/requests/CreateEventRequestDto";
import api from "./api";

export async function getAllEvents(): Promise<EventDto[]>{
    const response = await api.get<EventDto[]>(`/events`)
    return response.data
}

export async function joinEventById(eventId: string): Promise<void>{
    await api.post(`/events/join`, {eventId})
}

export async function leaveEventById(eventId: string): Promise<void>{
    await api.post(`/events/leave`, {eventId})
}

export async function createEventRequest(details: CreateEventRequestDto){
    await api.post(`events/`, details)
}

export async function getMyEventsRequest(){
    await api.get(`users/me/events`)
}

export async function getEventParticipants(eventId: string){
    return await api.get(`/events/${eventId}/participants`)
}