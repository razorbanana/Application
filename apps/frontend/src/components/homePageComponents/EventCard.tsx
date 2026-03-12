import { useAppDispatch, useAppSelector } from "../../app/store";
import { type EventType } from "../../types/EventType";
import { useEventDate } from "../../utils/hooks/useEventDate";
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { chooseEvent, joinEvent, leaveEvent, deleteEvent } from "../../app/slices/eventsSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import EventCardButton from "../commonComponents/EventCardButton";
import ConfirmationModal from "../commonComponents/ConfirmationModal";

export default function EventCard ({event}: {event: EventType}) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {datePart, timePart} = useEventDate(event.eventDate)
    const [isOpen, setIsOpen] = useState(false)
    const user = useAppSelector(state => state.auth.user)

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

    const handleDelete = () => {
        dispatch(deleteEvent(event.id))
    }

    return (
        <div className="group h-full m-3 p-3 border-1 border-gray-300 rounded-lg flex flex-col" >
            <p className="group-hover:text-blue-600 text-gray-900 font-bold text-lg cursor-pointer" onClick={openEvent}>{event.name}</p>
            <p className="text-gray-600 mb-3">{event.description}</p>
            <p className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-2"/> {datePart}</p>
            <p className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-2"/>{timePart}</p>
            <p className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2"/>{event.location}</p>
            <p className="flex items-center text-gray-600"><Users className="w-4 h-4 mr-2"/>{event.visitorCount} / {event.capacity}</p>
            
            <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleDelete}/>

            <div className="mt-auto">
                <hr className="border-gray-200" />

                <EventCardButton handleDelete={() => setIsOpen(true)} event={event} user={user} handleClick={handleClick}/>
            </div>
        </div>
    )

}