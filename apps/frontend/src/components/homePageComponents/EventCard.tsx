import { useAppDispatch } from "../../app/store";
import { type EventType } from "../../types/EventType";
import { useEventDate } from "../../utils/hooks/useEventDate";
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { chooseEvent, joinEvent, leaveEvent } from "../../app/slices/eventsSlice";
import { useNavigate } from "react-router";

export default function EventCard ({event}: {event: EventType}) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {datePart, timePart} = useEventDate(event.eventDate)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (event.isJoined){
            dispatch(leaveEvent(event.id))
        }else{
            dispatch(joinEvent(event.id))
        }
    }

    const openEvent = () => {
        dispatch(chooseEvent(event.id))
        navigate("/event")
    }

    return (
        <div className="group h-full m-3 p-3 border-1 border-gray-300 rounded-lg flex flex-col" >
            <p className="group-hover:text-blue-600 text-gray-900 font-bold text-lg cursor-pointer" onClick={openEvent}>{event.name}</p>
            <p className="text-gray-600 mb-3">{event.description}</p>
            <p className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-2"/> {datePart}</p>
            <p className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-2"/>{timePart}</p>
            <p className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2"/>{event.location}</p>
            <p className="flex items-center text-gray-600"><Users className="w-4 h-4 mr-2"/>{event.visitorCount} / {event.capacity}</p>
            
            <div className="mt-auto">
                <hr className="border-gray-200" />

                <button
                    disabled={event.capacity === event.visitorCount && !event.isJoined}
                    className={`mt-2 px-4 py-2 rounded-lg w-full cursor-pointer ${
                        event.isJoined   
                        ? "bg-red-600 text-white hover:bg-red-300" 
                        : ( event.capacity === event.visitorCount
                            ? "bg-gray-600 text-white hover:bg-gray-300"
                            : "bg-blue-600 text-white hover:bg-blue-300")
                    }`}
                    onClick={(e) => handleClick(e)}
                >{event.isJoined ? "Leave" : ( event.capacity === event.visitorCount ? "Full" : "Join")}</button>
            </div>
        </div>
    )

}