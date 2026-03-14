import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import eventsReducer from "./slices/eventsSlice"
import chatbotReducer from "./slices/chatbotSlice"
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        chatbot: chatbotReducer,
    }
})

export type AppStore = typeof store
export type RootState =  ReturnType<AppStore["getState"]>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()