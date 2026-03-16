import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/store"
import { fetchCurrentUser, logout } from "../app/slices/authSlice"
import { fetchAllEvents } from "../app/slices/eventsSlice"
import { fetchHistory } from "../app/slices/chatbotSlice"

export const AuthInitializer = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => !!state.auth.access_token)
    const initialized = useAppSelector(state => state.auth.initialized)

    useEffect(()=>{
        isLoggedIn && dispatch(fetchCurrentUser())
        isLoggedIn && dispatch(fetchHistory())
        if (!isLoggedIn){
            dispatch(logout())
        }
    }, [dispatch, isLoggedIn])

    useEffect(() => {
        dispatch(fetchAllEvents())
    }, [isLoggedIn, initialized])

    return null
}