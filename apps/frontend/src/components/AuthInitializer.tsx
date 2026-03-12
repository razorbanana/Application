import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/store"
import { fetchCurrentUser, logout } from "../app/slices/authSlice"
import { fetchAllEvents } from "../app/slices/eventsSlice"

export const AuthInitializer = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => !!state.auth.access_token)

    useEffect(()=>{
        isLoggedIn && dispatch(fetchCurrentUser())
        if (!isLoggedIn){
            dispatch(logout())
        }
    }, [dispatch, isLoggedIn])

    useEffect(() => {
        dispatch(fetchAllEvents())
    }, [isLoggedIn])

    return null
}