import { useAppSelector, useAppDispatch } from "../../app/store"
import { registerUser } from "../../app/slices/authSlice"
import { useState } from "react"
import type { RegisterRequestDto } from "../../types/dtos/requests/RegisterRequestDto"

type LoginFormProps = {
    toggleMode: () => void
}

export default function RegistrationForm({toggleMode}: LoginFormProps){
    const basicButtonStyles = "mx-3 mt-4 text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-lg border border-gray-300"
    const basicInputStyles = "mb-2 text-gray-700 px-3 py-2 rounded-lg border border-gray-300 w-full"
    const basicLabelStyles = "text-sm text-black font-semibold"    
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

    const handleInputChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
    }

    return (
        <form className="p-3">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <label htmlFor="fullName"  className={`${basicLabelStyles}`}>Full name:</label>
            <input 
                className={`${basicInputStyles}`}
                placeholder="Enter your full name"
                id="fullName"
                name="fullName"
                value={data.fullName}
                onChange={handleInputChange("fullName")}
            />
            <label htmlFor="username" className={`${basicLabelStyles}`}>Username:</label>
            <input 
                className={`${basicInputStyles}`}
                placeholder="Enter your username"
                id="username"
                name="username"
                value={data.username}
                onChange={handleInputChange("username")}
            />
            <label htmlFor="email"  className={`${basicLabelStyles}`}>Email:</label>
            <input 
                className={`${basicInputStyles}`}
                placeholder="Enter your email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleInputChange("email")}
            />
            <label htmlFor="password"  className={`${basicLabelStyles}`}>Password:</label>
            <input 
                className={`${basicInputStyles}`}
                placeholder="Enter your password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleInputChange("password")}
            />
            <label htmlFor="city"  className={`${basicLabelStyles}`}>City:</label>
            <input 
                className={`${basicInputStyles}`}
                placeholder="Enter your city"
                id="city"
                name="city"
                value={data.city}
                onChange={handleInputChange("city")}
            />
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