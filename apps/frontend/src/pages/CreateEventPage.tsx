import { useAppDispatch, useAppSelector } from "../app/store"
import RowInput from "../components/formComponents/RowInput"
import type { CreateEventRequestDto } from "../types/dtos/requests/CreateEventRequestDto"
import { useState } from "react"
import { chooseEvent, createEvent } from "../app/slices/eventsSlice"
import InputLabel from "../components/formComponents/InputLabel"
import FormButton from "../components/formComponents/FormButton"
import { validateField } from "../utils/validation/validateEvent"
import { useNavigate } from "react-router"


export default function CreateEventPage(){
    const status = useAppSelector(state => state.events.status)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        location: "",
        eventDate: "",
        capacity: "",
    })
    const hasNoErrors = Object.values(errors).every(err => err === "")
    const [data, setData] = useState<CreateEventRequestDto>({
        name: "",
        description: "",
        location: "",
        eventDate: new Date(),
        capacity: 100,
        isPublic: true,
    })

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const handleInputChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
        validateField(data, setErrors, fieldName, e.target.value)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTime(e.target.value)
        const newDate = new Date(`${date}T${e.target.value}:00Z`)
        setData(prev => ({
            ...prev,
            eventDate: newDate
        }))
        validateField(data, setErrors, "eventDate", newDate)
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDate(e.target.value)
        const newDate = new Date(`${e.target.value}T${time}:00Z`)
        setData(prev => ({
            ...prev,
            eventDate: newDate
        }))
        validateField(data, setErrors, "eventDate", newDate)
    }

    const handleCreateEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(chooseEvent(null))
        dispatch(createEvent(data))
        navigate("/event")
    }

    const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, visibility: boolean) => {
        e.preventDefault()
        setData({
            ...data,
            isPublic: visibility
        })
    }

    return(
        <div className="xl:w-1/3 md:w-1/2 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form className="p-3">
                <h2 className="text-2xl font-bold ml-4 mb-2">Create New Event</h2>
                <h3 className="text-l text-gray-600 mb-4">Fill out the details to create an event</h3>

                <RowInput 
                    name="name" 
                    label="Name of event:" 
                    value={data.name} 
                    handleInputChange={handleInputChange("name")} 
                    placeholder="Name your event"
                    error={errors.name}
                />
                <RowInput 
                    name="description" 
                    label="Description of event:" 
                    value={data.description} 
                    handleInputChange={handleInputChange("description")} 
                    placeholder="Describe your event" 
                    type="textarea"
                    error={errors.description}
                />

                <div className="flex justify-between w-full">
                    <RowInput 
                        name="date" 
                        label="Date of event:" 
                        value={date} 
                        handleInputChange={(e) => handleDateChange(e)} 
                        type="date"
                    />
                    <RowInput 
                        name="time" 
                        label="Time of event:" 
                        value={time} 
                        handleInputChange={(e) => handleTimeChange(e)} 
                        type="time"
                    />
                </div>
                {errors.eventDate && <p className="text-red-500 text-sm mb-2 ">{errors.eventDate}</p>}
                <RowInput 
                    name="location" 
                    label="Location of event:" 
                    value={data.location} 
                    handleInputChange={handleInputChange("location")} 
                    placeholder="Where is the event located" 
                    type="text"
                    error={errors.location}
                />
                <RowInput 
                    name="capacity" 
                    label="Capacity of event:" 
                    value={data.capacity} 
                    handleInputChange={handleInputChange("capacity")} 
                    placeholder="What is your event's capacity" 
                    type="number" 
                    optional={true}
                />
            
                <div className="gap-4 mt-2">
                    <InputLabel name="visibility" label="Visibility:" optional={true} />
                    <label className="flex items-center gap-2">
                        <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={data.isPublic == true}
                        onChange={(e) => handlePublicChange(e, true)}
                        />
                        Public - Anyone can see and join this event
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={data.isPublic == false}
                        onChange={(e) => handlePublicChange(e, false)}
                        />
                        Private - Only authorized users can see and join this event
                    </label>
                </div>

                <FormButton disabled={status === 'loading' || !hasNoErrors} onClick={(e) => handleCreateEvent(e)} text={status === 'loading' ? 'Processing...' : 'Create Event'}/>
            </form>
        </div>
    )
}