import { useAppSelector, useAppDispatch } from "../../app/store"
import type { LoginRequestDto } from "../../types/dtos/requests/LoginRequestDto"
import { loginUser } from "../../app/slices/authSlice"
import { useState } from "react"
import RowInput from "../formComponents/RowInput"
import FormButton from "../formComponents/FormButton"
import { fetchAllEvents } from "../../app/slices/eventsSlice"

type LoginFormProps = {
    toggleMode: () => void
}

export default function LoginForm({toggleMode}: LoginFormProps){

    const status= useAppSelector(state => state.auth.status)
    const dispatch = useAppDispatch()
    const [data, setData] = useState<LoginRequestDto>({
        identifier: "",
        password: ""
    })

    const handleLogin = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(loginUser(data))
        dispatch(fetchAllEvents())
    }

    const handleInputChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
    }

    return (
        <form className="p-3">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <RowInput name="identifier" label="Username or Email:" value={data.identifier} handleInputChange={handleInputChange("identifier")} placeholder="Enter your username or email:"/>
            <RowInput name="password" label="Password:" value={data.password} handleInputChange={handleInputChange("password")}  placeholder="Enter your password:" type="password"/>
            
            <div className="flex justify-evenly">
                <FormButton onClick={(e) => handleLogin(e)} text={status === 'loading' ? 'Processing...' : 'Login'} disabled={status === 'loading'}/>
                <FormButton onClick={() => toggleMode()} text="Need an account? Register"/>
            </div>
        </form>
    )
}