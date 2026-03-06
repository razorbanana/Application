import { useAppSelector, useAppDispatch } from "../../app/store"
import type { LoginRequestDto } from "../../types/dtos/requests/LoginRequestDto"
import { loginUser } from "../../app/slices/authSlice"
import { useState } from "react"

type LoginFormProps = {
    toggleMode: () => void
}

export default function LoginForm({toggleMode}: LoginFormProps){
    const basicButtonStyles = "mx-3 mt-4 text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-lg border border-gray-300"
    const basicInputStyles = "mb-2 text-gray-700 px-3 py-2 rounded-lg border border-gray-300 w-full"
    const basicLabelStyles = "text-sm text-black font-semibold"

    const status= useAppSelector(state => state.auth.status)
    const dispatch = useAppDispatch()
    const [data, setData] = useState<LoginRequestDto>({
        identifier: "",
        password: ""
    })

    const handleLogin = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(loginUser(data))
    }

    const handleInputChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
    }

    return (
        <form className="p-3">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <label htmlFor="identifier"  className={`${basicLabelStyles}`}>Username or Email:</label>
            <input 
                className={`${basicInputStyles}`}
                placeholder="Enter your username or email"
                id="identifier"
                name="identifier"
                value={data.identifier}
                onChange={handleInputChange("identifier")}
            />
            <label htmlFor="password" className={`${basicLabelStyles}`}>Password: </label>
            <input 
                className={`${basicInputStyles}`}
                placeholder="Enter your password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleInputChange("password")}
            />
            <div className="flex justify-evenly">
                    <button 
                        className={`${basicButtonStyles}`}
                        disabled={status === 'loading'}
                        onClick={(e) => handleLogin(e)}
                    >
                        {status === 'loading' ? 'Processing...' : 'Login'}
                    </button>

                    <button 
                        className={`${basicButtonStyles}`}
                        onClick={() => toggleMode()}>
                        Need an account? Register
                    </button>
            </div>
        </form>
    )
}