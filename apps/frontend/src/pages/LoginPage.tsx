import { useEffect, useState } from "react"
import { useAppSelector } from "../app/store"
import { useNavigate } from "react-router"
import LoginForm from "../components/loginPageComponents/LoginForm"
import RegistrationForm from "../components/loginPageComponents/RegistrationForm"

export default function LoginPage(){
    const [mode, setMode] = useState<"login" | "register">("login")
    const {user, error} = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(()=>{
        if (user !== null){
            navigate("/")
        }
    },[user])

    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {mode === "login" ? <LoginForm toggleMode={() => setMode("register")}/> : <RegistrationForm toggleMode={() => setMode("login")}/>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}