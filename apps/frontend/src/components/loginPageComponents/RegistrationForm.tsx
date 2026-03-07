import { useAppSelector, useAppDispatch } from "../../app/store"
import { registerUser } from "../../app/slices/authSlice"
import { useState } from "react"
import type { RegisterRequestDto } from "../../types/dtos/requests/RegisterRequestDto"
import RowInput from "../formComponents/RowInput"

type LoginFormProps = {
    toggleMode: () => void
}

export default function RegistrationForm({toggleMode}: LoginFormProps){
    const basicButtonStyles = "mx-3 mt-4 text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-lg border border-gray-300"
    const status = useAppSelector(state => state.auth.status)
    const dispatch = useAppDispatch()
    const [data, setData] = useState<RegisterRequestDto>({
        fullName: "",
        username: "",
        email: "",
        password: "",
        city: ""
    })

    const handleRegistration = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(registerUser(data))
    }

    const handleInputChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
    }

    return (
        <form className="p-3">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <RowInput name="fullName" label="Full name:" value={data.fullName} handleInputChange={handleInputChange("fullName")} placeholder="Enter your full name:"/>
            <RowInput name="username" label="Username:" value={data.username} handleInputChange={handleInputChange("username")} placeholder="Enter your username:"/>
            <RowInput name="email" label="Email:" value={data.email} handleInputChange={handleInputChange("email")} placeholder="Enter your email:"/>
            <RowInput name="password" label="Password:" value={data.password} handleInputChange={handleInputChange("password")} placeholder="Enter your password:" type="password"/>
            <RowInput name="city" label="City:" value={data.city} handleInputChange={handleInputChange("city")} placeholder="Enter your city:"/>
            
            <div className="flex justify-evenly">
                <button 
                    className={`${basicButtonStyles}`}
                    disabled={status === 'loading'}
                    onClick={(e) => handleRegistration(e)}
                >
                    {status === 'loading' ? 'Processing...' : 'Register'}
                </button>

                <button 
                    className={`${basicButtonStyles}`}
                    onClick={() => toggleMode()}>
                    Have an account? Login
                </button>
            </div>
        </form>
    )
}