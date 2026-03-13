import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { EventsState } from "../eventsSlice"
import { joinEventById } from "../../../services/eventsApi"

export const joinEvent = createAsyncThunk(
    "events/joinEvent",
    async (eventId: string) => {
        await joinEventById(eventId)
        return eventId
    }
)

export function joinEventBuilderCases (builder: ActionReducerMapBuilder<EventsState>) {
    builder
        .addCase(joinEvent.pending, (state) => {
            state.status = "loading"
        })
        .addCase(joinEvent.fulfilled, (state, action) => {
            state.status = "succeeded"
            const eventId = action.payload
            state.events = state.events.map(event => event.id === eventId ? {
                ...event,
                isJoined: !event.isJoined,
                visitorCount: event.visitorCount + 1
            } : event)
        })
        .addCase(joinEvent.rejected, (state) => {
            state.status = "failed"
        })

    return builder
}