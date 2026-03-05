import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { EventType } from "../../types/EventType";
import { getAllEvents, joinEventById } from "../../services/api";

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
        return response
    }
)

export const joinEvent = createAsyncThunk(
    "events/joinEvent",
    async (eventId: string) => {
        await joinEventById(eventId)
        return eventId
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
        }
    }
)

export default eventsSlice.reducer

export const { fetchEventById, createEvent } = eventsSlice.actions;