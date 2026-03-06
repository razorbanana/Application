import { useAppSelector, useAppDispatch } from "../../app/store"
import { registerUser } from "../../app/slices/authSlice"
import { useState } from "react"
import type { RegisterRequestDto } from "../../types/dtos/requests/RegisterRequestDto"

type LoginFormProps = {
    toggleMode: () => void
}

export default function RegistrationForm({toggleMode}: LoginFormProps){
    const basicButtonStyles = "mx-3 text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2  rounded-lg border border-gray-300"
    const status = useAppSelector(state => state.auth.status)
    const dispatch = useAppDispatch()
    const [data, setData] = useState<RegisterRequestDto>({
        fullName: "",
        username: "",
        email: "",
        password: "",
        city: ""
    })

    const handleRegistration = () => {
        dispatch(registerUser(data))
    }

    return (
        <form>
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
        
            <div className="flex justify-evenly">
                <button 
                    className={`${basicButtonStyles}`}
                    disabled={status === 'loading'}
                    onClick={() => handleRegistration()}
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