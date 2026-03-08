import type { EventType } from "../../types/EventType";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useEventDate } from "../../utils/hooks/useEventDate";
import { leaveEvent, joinEvent } from "../../app/slices/eventsSlice";
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import ParticipantList from "./ParticipantList";
import { useEffect, useState } from "react";
import { getEventParticipants } from "../../services/eventsApi";
import type { ParticipantType } from "../../types/ParticipantType";

export default function EventPageBody({event}: {event: EventType}){
    const dispatch = useAppDispatch()
    const {datePart, timePart} = event && useEventDate(event.event_date)
    const [participants, setParticipants] = useState<ParticipantType[]>([])
    const user = useAppSelector(state => state.auth.user)

    useEffect(()=>{
        getEventParticipants(event.id).then(response => setParticipants(response.data))
    }, [])

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

    return (
        <div className="xl:w-1/3 md:w-1/2 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-900 font-bold text-lg">{event.name}</p>
            <p className="text-gray-600 mb-3">{event.description}</p>
            <p className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-2"/> {datePart}</p>
            <p className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-2"/>{timePart}</p>
            <p className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2"/>{event.location}</p>
            <p className="flex items-center text-gray-600 mb-8"><Users className="w-4 h-4 mr-2"/>{event.visitorCount} / {event.capacity}</p>
            
            <ParticipantList participants={participants}/>

            <div className="mt-auto">
                <hr className="border-gray-200" />

                <button
                    disabled={(event.capacity === event.visitorCount && !event.isJoined) || user === null}
                    className={`mt-2 px-4 py-2 rounded-lg w-full cursor-pointer ${
                        event.isJoined   
                        ? "bg-red-600 text-white hover:bg-red-300" 
                        : ( event.capacity === event.visitorCount
                            ? "bg-gray-600 text-white hover:bg-gray-300"
                            : "bg-blue-600 text-white hover:bg-blue-300")
                    }`}
                    onClick={handleClick}
                >{event.isJoined ? "Leave" : ( event.capacity === event.visitorCount ? "Full" : "Join")}</button>
            </div>
        </div>
    )
}