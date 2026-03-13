import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { EventsState } from "../eventsSlice"
import { deleteEventById } from "../../../services/eventsApi"

export const deleteEvent = createAsyncThunk(
    "events/deleteEvent",
    async (eventId: string) => {
        await deleteEventById(eventId)
        return eventId
    }
)

export function deleteEventBuilderCases (builder: ActionReducerMapBuilder<EventsState>) {
    builder
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload)
            state.status = "succeeded"
        })
        .addCase(deleteEvent.rejected, (state) => {
            state.status = "failed"
        })

    return builder
}