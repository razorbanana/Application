import { useEffect } from "react"
import { useAppDispatch } from "../app/store"
import { fetchCurrentUser } from "../app/slices/authSlice"

export const AuthInitializer = () => {
    const dispatch = useAppDispatch()
    const token = localStorage.getItem('token')

    useEffect(()=>{
        token && dispatch(fetchCurrentUser())
    }, [dispatch, token])

    return null
}