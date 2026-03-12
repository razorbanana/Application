import { useAppSelector } from "../app/store"
import { Navigate } from "react-router-dom"

type ProtectedRouteProps = {
    Component: React.ComponentType
}

export default function ProtectedRoute ({Component }: ProtectedRouteProps) {
    const isLoggedIn = useAppSelector(state => !!state.auth.access_token)

    if (!isLoggedIn){
        return <Navigate to="/login" replace />
    }

    return <Component />
}