import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { EventType } from "../../types/EventType";
import { getAllEvents } from "../../services/api";

type EventsState = {
    events: EventType[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: EventsState = {
    events: [],
    status: "idle"
}

export const fetchAllEvents = createAsyncThunk(
    "events/fetchAll",
    async () => {
        const response = await getAllEvents()
        return response.data
    }
)

export const eventsSlice = createSlice(
    {
        name: "events",
        initialState,
        reducers: {
            fetchEventById: ()=>{},
            createEvent: ()=>{}
        },
        extraReducers: (builder) => {
            builder.addCase(fetchAllEvents.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.events = action.payload
            })
            .addCase(fetchAllEvents.rejected, (state) => {
                state.status = "failed"
            })
        }
    }
)

export default eventsSlice.reducer

export const { fetchEventById, createEvent } = eventsSlice.actions;