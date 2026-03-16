import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { EventsState } from "../eventsSlice"
import { joinEventById } from "../../../services/eventsApi"

export const joinEvent = createAsyncThunk(
    "events/joinEvent",
    async (eventId: string, {rejectWithValue}) => {
        try{
            await joinEventById(eventId)
            return eventId
        }catch(err: any){
            return rejectWithValue(err.response?.data?.message || "Failed to join event")
        }
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
        .addCase(joinEvent.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload as string
        })

    return builder
}