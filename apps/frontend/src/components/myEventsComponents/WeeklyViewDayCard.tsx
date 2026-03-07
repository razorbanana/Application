import type { EventType } from "../../types/EventType"
import { format } from "date-fns"
import EventTimeNameCard from "./EventTimeNameCard"

type WeeklyViewDayCardProps = {
    events?: EventType[],
    day: Date
}

export default function WeeklyViewDayCard({events, day}: WeeklyViewDayCardProps){

        return (
            <div className="group rounded-lg border-gray-300 border px-2 py-3 text-sm hover:border-blue-300 cursor-pointer">
                <p className="font-bold">{format(day, "EEE")}</p>
                <p className="text-gray-600 group-hover:text-blue-600 mb-2">{format(day, "dd")}</p>
                {events && events?.length !== 0 ? events?.map(event => <EventTimeNameCard key={event.name} date={new Date(event.event_date)} name={event.name}/>): "No events"}
            </div>
        )
}