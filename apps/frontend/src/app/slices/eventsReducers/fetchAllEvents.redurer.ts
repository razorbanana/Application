import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { EventsState } from "../eventsSlice"
import { getAllEvents } from "../../../services/eventsApi"


export const fetchAllEvents = createAsyncThunk(
    "events/fetchAll",
    async (_, {rejectWithValue}) => {
        try{
            const response = await getAllEvents()
            return response
        }catch(err: any){
            return rejectWithValue(err.response?.data?.message || "Failed to load events")
        }
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
        .addCase(fetchAllEvents.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload as string
        })

    return builder
}