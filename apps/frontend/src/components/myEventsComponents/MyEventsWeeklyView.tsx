import { isSameDay, parseISO } from "date-fns"
import type { EventType } from "../../types/EventType"
import WeeklyViewDayCard from "./WeeklyViewDayCard"

type MyEventsWeeklyViewProps = {
    events: EventType[],
    days: Date[]
}

export default function MyEventsWeeklyView ({events, days}:MyEventsWeeklyViewProps){
    return (
        <div className="grid grid-cols-7 gap-2 justify-evenly mt-8 h-full">
            {days.map(day => {
                const dayEvents = events.filter(event => isSameDay(parseISO(event.event_date), day))

                return (
                    <WeeklyViewDayCard key={day.toString()} events={dayEvents} day={day}/>
                )
            })}
        </div>
    )
}