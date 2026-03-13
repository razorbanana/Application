import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { EventType } from "../../types/EventType";
import { getAllEvents, joinEventById, createEventRequest, leaveEventById, deleteEventById, updateEventRequest } from "../../services/eventsApi";
import type { CreateEventRequestDto } from "../../types/dtos/requests/CreateEventRequestDto";

type EventsState = {
    events: EventType[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    chosenEventId: string | null
}

const initialState: EventsState = {
    events: [],
    status: "idle",
    chosenEventId: null
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

export const leaveEvent = createAsyncThunk(
    "events/leaveEvent",
    async (eventId: string) => {
        await leaveEventById(eventId)
        return eventId
    }
)

export const createEvent = createAsyncThunk(
    "events/createEvent",
    async (data: CreateEventRequestDto) => {
        const response = await createEventRequest(data)
        return response
    }
)

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

export const deleteEvent = createAsyncThunk(
    "events/deleteEvent",
    async (eventId: string) => {
        await deleteEventById(eventId)
        return eventId
    }
)

export const eventsSlice = createSlice(
    {
        name: "events",
        initialState,
        reducers: {
            chooseEvent: (state, action)=>{
                state.chosenEventId = action.payload
            },
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
            .addCase(leaveEvent.rejected, (state) => {
                state.status = "failed"
            })
            .addCase(createEvent.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.chosenEventId = action.payload.id
                state.events = state.events.concat(action.payload)
                state.status = "succeeded"
            })
            .addCase(createEvent.rejected, (state) => {
                state.status = "failed"
            })
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
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(event => event.id !== action.payload)
                state.status = "succeeded"
            })
            .addCase(deleteEvent.rejected, (state) => {
                state.status = "failed"
            })
        }
    }
)

export default eventsSlice.reducer

export const { chooseEvent } = eventsSlice.actions;