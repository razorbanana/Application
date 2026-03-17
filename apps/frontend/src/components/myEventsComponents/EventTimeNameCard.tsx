import { format } from "date-fns"
import { useAppDispatch } from "../../app/store"
import { chooseEvent } from "../../app/slices/eventsSlice"
import { useNavigate } from "react-router"
import type { TagName } from "../../types/TagType"
import Tags from "../commonComponents/tags/Tags"

type EventTimeNameCardProps = {
    name: string,
    date: Date,
    eventId: string,
    tags?: TagName[]
}

export default function EventTimeNameCard ({name, date, eventId, tags}: EventTimeNameCardProps) {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(chooseEvent(eventId))
        navigate("/event")
    }

    return(
        <div className="bg-blue-100 rounded-lg p-2 text-xs text-blue-600 relative" onClick={handleClick}>
            <p>
                {format(date, "HH:mm")} 
            </p>
            <Tags tags={tags} mode="calendar"/>
            <p className="mt-1">{name}</p>
        </div>
    )
}