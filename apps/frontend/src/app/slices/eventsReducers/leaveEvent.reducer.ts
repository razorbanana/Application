import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { EventsState } from "../eventsSlice"
import { leaveEventById } from "../../../services/eventsApi"

export const leaveEvent = createAsyncThunk(
    "events/leaveEvent",
    async (eventId: string, {rejectWithValue}) => {
        try{
            await leaveEventById(eventId)
            return eventId
        }catch(err: any){
            return rejectWithValue(err.response?.data?.message || "Failed to leave event")
        }
    }
)

export function leaveEventBuilderCases (builder: ActionReducerMapBuilder<EventsState>) {
    builder
        .addCase(leaveEvent.pending, (state) => {
            state.status = "loading"
        })
        .addCase(leaveEvent.fulfilled, (state, action) => {
            state.status = "succeeded"
            const eventId = action.payload
            state.events = state.events.map(event => event.id === eventId ? {
                ...event,
                isJoined: !event.isJoined,
                visitorCount: event.visitorCount - 1
            } : event)
        })
        .addCase(leaveEvent.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload as string
        })

    return builder
}