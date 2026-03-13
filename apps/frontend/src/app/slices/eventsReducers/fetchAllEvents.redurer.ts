import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { EventsState } from "../eventsSlice"
import { getAllEvents } from "../../../services/eventsApi"


export const fetchAllEvents = createAsyncThunk(
    "events/fetchAll",
    async () => {
        const response = await getAllEvents()
        return response
    }
)

export function fetchAllEventsBuilderCases (builder: ActionReducerMapBuilder<EventsState>) {
    builder
        .addCase(fetchAllEvents.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchAllEvents.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.events = action.payload
        })
        .addCase(fetchAllEvents.rejected, (state) => {
            state.status = "failed"
        })

    return builder
}