import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import eventsReducer from "./slices/eventsSlice"
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer
    }
})

export type AppStore = typeof store
export type RootState =  ReturnType<AppStore["getState"]>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()