import { useAppDispatch } from "../../app/store";
import { type EventType } from "../../types/EventType";
import { useEventDate } from "../../utils/hooks/useEventDate";
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { joinEvent } from "../../app/slices/eventsSlice";

export default function EventCard ({event}: {event: EventType}) {
    const dispatch = useAppDispatch()
    const {datePart, timePart} = useEventDate(event.event_date)
    return (
        <div className="group h-full m-3 p-3 border-1 border-gray-300 rounded-lg flex flex-col">
            <p className="group-hover:text-blue-600 text-gray-900 font-bold text-lg">{event.name}</p>
            <p className="text-gray-600 mb-3">{event.description}</p>
            <p className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-2"/> {datePart}</p>
            <p className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-2"/>{timePart}</p>
            <p className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2"/>{event.location}</p>
            <p className="flex items-center text-gray-600"><Users className="w-4 h-4 mr-2"/>{event.visitorCount} / {event.capacity}</p>
            
            <div className="mt-auto">
                <hr className="border-gray-200" />

                <button
                    disabled={event.isJoined}
                    className={`mt-2 px-4 py-2 rounded-lg w-full ${
                        event.isJoined 
                            ? "bg-gray-600 text-white hover:bg-gray-300"
                            : "bg-blue-600 text-white hover:bg-blue-300"
                    }`}
                    onClick={() => {
                        dispatch(joinEvent(event.id))
                    }}
                >Join</button>
            </div>
        </div>
    )

}