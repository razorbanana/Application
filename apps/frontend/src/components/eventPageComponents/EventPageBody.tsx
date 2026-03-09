import type { EventType } from "../../types/EventType";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useEventDate } from "../../utils/hooks/useEventDate";
import { leaveEvent, joinEvent, deleteEvent } from "../../app/slices/eventsSlice";
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import ParticipantList from "./ParticipantList";
import { useEffect, useState } from "react";
import { getEventParticipants } from "../../services/eventsApi";
import type { ParticipantType } from "../../types/ParticipantType";
import ConfirmationModal from "../commonComponents/ConfirmationModal";
import EventCardButton from "../commonComponents/EventCardButton";

export default function EventPageBody({event}: {event: EventType}){
    const dispatch = useAppDispatch()
    const {datePart, timePart} = event && useEventDate(event.eventDate)
    const [participants, setParticipants] = useState<ParticipantType[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const user = useAppSelector(state => state.auth.user)

    useEffect(()=>{
        getEventParticipants(event.id).then(response => {
            setParticipants(response.data)
        })
    }, [event.id])

    const handleClick = () => {
        if (event.isJoined){
            setParticipants(par => par.filter(p => p.username !== user?.username))
            dispatch(leaveEvent(event.id))
        }else{
            setParticipants(par =>
                par.concat({
                    username: user!.username,
                    fullName: user!.fullName,
                    userRole: "visitor"
                })
            )
            dispatch(joinEvent(event.id))
        }
    }

    const handleDelete = () => {
        dispatch(deleteEvent(event.id))
    }

    return (
        <div className="w-full">
            <p className="text-gray-900 font-bold text-lg w-fit">{event.name}</p>
            <p className="text-gray-600 mb-3">{event.description}</p>
            <p className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-2"/> {datePart}</p>
            <p className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-2"/>{timePart}</p>
            <p className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2"/>{event.location}</p>
            <p className="flex items-center text-gray-600 mb-8"><Users className="w-4 h-4 mr-2"/>{event.visitorCount} / {event.capacity}</p>
            
            <ParticipantList participants={participants}/>

            <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleDelete}/>
            
            <div className="mt-auto">
                <hr className="border-gray-200" />

                <EventCardButton handleDelete={() => setIsOpen(true)} event={event} user={user} handleClick={handleClick}/>
            </div>
        </div>
    )
}