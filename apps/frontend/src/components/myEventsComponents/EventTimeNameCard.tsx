import { format } from "date-fns"
import { useAppDispatch } from "../../app/store"
import { chooseEvent } from "../../app/slices/eventsSlice"
import { useNavigate } from "react-router"

type EventTimeNameCardProps = {
    name: string,
    date: Date,
    eventId: string
}

export default function EventTimeNameCard ({name, date, eventId}: EventTimeNameCardProps) {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(chooseEvent(eventId))
        navigate("/event")
    }

    return(
        <div className="bg-blue-100 rounded-lg p-2 text-xs text-blue-600" onClick={handleClick}>
            <p>{format(date, "HH:mm")}</p>
            <p>{name}</p>
        </div>
    )
}