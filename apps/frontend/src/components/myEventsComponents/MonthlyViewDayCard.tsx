import type { EventType } from "../../types/EventType"
import { format } from "date-fns"
import EventTimeNameCard from "./EventTimeNameCard"

type MonthlyViewDayCardProps = {
    events?: EventType[],
    day?: Date,
    blank?: boolean
}

export default function MonthlyViewDayCard({events, day, blank=false}: MonthlyViewDayCardProps){

        if (blank || day == undefined){
            return (
                <div className="border-gray-300 border px-2 py-3 cursor-pointer min-h-20 bg-gray-100">
                </div>
            )
        }

        return (
            <div className="group border-gray-300 border px-2 py-3 text-sm hover:border-blue-300 cursor-pointer min-h-20">
                <p className="text-gray-600 group-hover:text-blue-600 mb-2">{format(day, "dd")}</p>
                {events && events?.length !== 0 ? events?.map(event => <EventTimeNameCard key={event.name} date={new Date(event.event_date)} name={event.name}/>): ""}
            </div>
        )
}