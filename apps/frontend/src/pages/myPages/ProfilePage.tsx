import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/store"
import RowInput from "../../components/formComponents/RowInput"
import type { UserType } from "../../types/UserType"
import { updateCurrentUser } from "../../app/slices/authSlice"
import FormButton from "../../components/formComponents/FormButton"

export default function ProfilePage(){
    const {user, status} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const [data, setData] = useState<UserType>(user ? user : {
        username: "",
        fullName: "",
        email: "",
        city: ""
    })

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [field]: e.target.value
        })
    }

    const handleUserUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(updateCurrentUser(data))
    }

    return(
        <div className="xl:w-1/3 md:w-1/2 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                    <form className="p-3">
                        <h2 className="text-2xl font-bold ml-4 mb-2">Profile</h2>
                        <h3 className="text-l text-gray-600 mb-4">Review or change your profile details</h3>
        
                        <RowInput name="username" label={"Your username:"} value={data.username} placeholder="Enter your new username" handleInputChange={handleInputChange("username")} optional={true}/>
                        <RowInput name="fullName" label={"Your full name:"} value={data.fullName} placeholder="Enter your new full name" handleInputChange={handleInputChange("fullName")} optional={true}/>
                        <RowInput name="email" label={"Your email:"} value={data.email} placeholder="Enter your new email" handleInputChange={handleInputChange("email")} optional={true}/>
                        <RowInput name="city" label={"Your city:"} value={data.city} placeholder="Enter your new city" handleInputChange={handleInputChange("city")} optional={true}/>

                        <FormButton disabled={status === 'loading'} onClick={(e) => handleUserUpdate(e)} text={status === 'loading' ? 'Processing...' : 'Change your information'}/>
                    </form>
                </div>
    )
}