import { useEffect } from "react"
import { useAppDispatch } from "../app/store"
import { fetchCurrentUser, logout } from "../app/slices/authSlice"

export const AuthInitializer = () => {
    const dispatch = useAppDispatch()
    const access_token = localStorage.getItem('access_token')

    useEffect(()=>{
        access_token && dispatch(fetchCurrentUser())
        if (access_token == null){
            dispatch(logout())
        }
    }, [dispatch, access_token])

    return null
}