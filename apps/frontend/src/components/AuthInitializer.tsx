import { useEffect } from "react"
import { useAppDispatch } from "../app/store"
import { fetchCurrentUser } from "../app/slices/authSlice"

export const AuthInitializer = () => {
    const dispatch = useAppDispatch()
    const access_token = localStorage.getItem('access_token')

    useEffect(()=>{
        access_token && dispatch(fetchCurrentUser())
    }, [dispatch, access_token])

    return null
}