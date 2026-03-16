import { createSlice } from "@reduxjs/toolkit";
import type { EventType } from "../../types/EventType";

import { fetchAllEvents } from "./eventsReducers/fetchAllEvents.redurer";
import { joinEvent } from "./eventsReducers/joinEvent.reducer";
import { leaveEvent } from "./eventsReducers/leaveEvent.reducer";
import { createEvent } from "./eventsReducers/createEvent.reducer";
import { updateEvent } from "./eventsReducers/updateEvent.reducer";
import { deleteEvent } from "./eventsReducers/deleteEvent.reducer";

import { fetchAllEventsBuilderCases } from "./eventsReducers/fetchAllEvents.redurer";
import { joinEventBuilderCases } from "./eventsReducers/joinEvent.reducer";
import { leaveEventBuilderCases } from "./eventsReducers/leaveEvent.reducer";
import { createEventBuilderCases } from "./eventsReducers/createEvent.reducer";
import { updateEventBuilderCases } from "./eventsReducers/updateEvent.reducer";
import { deleteEventBuilderCases } from "./eventsReducers/deleteEvent.reducer";

export type EventsState = {
    events: EventType[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    chosenEventId: string | null,
    error: string | null
}

const initialState: EventsState = {
    events: [],
    status: "idle",
    chosenEventId: null,
    error: null
}

export const eventsSlice = createSlice(
    {
        name: "events",
        initialState,
        reducers: {
            chooseEvent: (state, action)=>{
                state.chosenEventId = action.payload
            },
            eraseError: (state) => {
                state.error = null
            }
        },
        extraReducers: (builder) => {
            fetchAllEventsBuilderCases(builder)
            joinEventBuilderCases(builder)
            leaveEventBuilderCases(builder)
            createEventBuilderCases(builder)
            updateEventBuilderCases(builder)
            deleteEventBuilderCases(builder)
        }
    }
)

export default eventsSlice.reducer
export { fetchAllEvents, joinEvent, leaveEvent, createEvent, updateEvent, deleteEvent }
export const { chooseEvent, eraseError } = eventsSlice.actions;