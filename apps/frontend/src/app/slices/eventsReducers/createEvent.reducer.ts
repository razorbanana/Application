import { createAsyncThunk } from "@reduxjs/toolkit"
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { EventsState } from "../eventsSlice"
import { createEventRequest } from "../../../services/eventsApi"
import { type CreateEventRequestDto } from "../../../types/dtos/requests/CreateEventRequestDto"

export const createEvent = createAsyncThunk(
    "events/createEvent",
    async (data: CreateEventRequestDto, {rejectWithValue}) => {
        try{
            const response = await createEventRequest(data)
            return response
        }catch(err: any){
            return rejectWithValue(err.response?.data?.message || "Failed to create an event")
        }
    }
)

export function createEventBuilderCases (builder: ActionReducerMapBuilder<EventsState>) {
    builder
        .addCase(createEvent.pending, (state) => {
            state.status = "loading"
        })
        .addCase(createEvent.fulfilled, (state, action) => {
            state.chosenEventId = action.payload.id
            state.events = state.events.concat(action.payload)
            state.status = "succeeded"
        })
        .addCase(createEvent.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload as string
        })

    return builder
}