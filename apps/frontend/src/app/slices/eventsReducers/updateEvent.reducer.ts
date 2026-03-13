import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { EventsState } from "../eventsSlice"
import { updateEventRequest } from "../../../services/eventsApi"
import { type CreateEventRequestDto } from "../../../types/dtos/requests/CreateEventRequestDto"

export const updateEvent = createAsyncThunk(
    "events/updateEvent",
    async (event: {id: string, data: CreateEventRequestDto}) => {
        await updateEventRequest(event.id, event.data)
        return {
            id: event.id,
            data: {
                ...event.data,
                eventDate: event.data.eventDate.toISOString()
            }
        }
    }
)

export function updateEventBuilderCases (builder: ActionReducerMapBuilder<EventsState>) {
    builder
        .addCase(updateEvent.pending, (state) => {
            state.status = "loading"
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
            state.chosenEventId = action.payload.id
            state.events = state.events.map(event => 
                event.id === action.payload.id 
                ? {
                    ...event,
                    ...action.payload.data,
                }
                : event)
            state.status = "succeeded"
        })
        .addCase(updateEvent.rejected, (state) => {
            state.status = "failed"
        })

    return builder
}