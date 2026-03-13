import type { EventType } from "../../types/EventType"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { useState } from "react"
import type { CreateEventRequestDto } from "../../types/dtos/requests/CreateEventRequestDto"
import { validateField } from "../../utils/validation/validateEvent"
import RowInput from "../formComponents/RowInput"
import FormButton from "../formComponents/FormButton"
import InputLabel from "../formComponents/InputLabel"
import { updateEvent } from "../../app/slices/eventsSlice"
import { type TagName } from "../../types/TagType"
import TagSelector from "../commonComponents/TagSelector"

type EditEventBodyProps = {
    event: EventType
}

export default function EditEventBody ({event}: EditEventBodyProps) {
    const status = useAppSelector(state => state.events.status)
    const dispatch = useAppDispatch()
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        location: "",
        eventDate: "",
        capacity: "",
        tags: ""
    })
    const hasNoErrors = Object.values(errors).every(err => err === "")
    const {id, ...eventBody} = event
    const [data, setData] = useState<CreateEventRequestDto>({
        ...eventBody,
        eventDate: new Date(eventBody.eventDate),
        tags: event.tags ? event.tags : []
    })

    const [date, setDate] = useState(data.eventDate.toISOString().slice(0, 10)) 
    const [time, setTime] = useState(data.eventDate.toTimeString().slice(0, 5))

    const handleInputChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
        validateField(data, setErrors, fieldName, e.target.value)
    }

    const setChosenTags = (value: TagName[]) => {
        setData(prev => ({
            ...prev,
            tags: value
        }))
        validateField(data, setErrors, "tags", value)
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

    const handleUpdateEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(updateEvent({id, data}))
    }

    const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, visibility: boolean) => {
        e.preventDefault()
        setData({
            ...data,
            isPublic: visibility
        })
    }

    return(
        <div className="w-full">
            <form className="p-3">
                <h2 className="text-2xl font-bold ml-4 mb-2">Update your event</h2>
                <h3 className="text-l text-gray-600 mb-4">Fill out the details to update an event</h3>

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

                <InputLabel label="Choose up to 5 tags for your event:" name="tags" optional={true}/>
                <TagSelector selectedTags={data.tags} setSelectedTags={setChosenTags} error={errors.tags}/>

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

                <FormButton disabled={status === 'loading' || !hasNoErrors} onClick={(e) => handleUpdateEvent(e)} text={status === 'loading' ? 'Processing...' : 'Update Event'}/>
            </form>
        </div>
    )
}