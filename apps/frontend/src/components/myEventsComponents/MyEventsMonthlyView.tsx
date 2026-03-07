import type { EventType } from "../../types/EventType"
import MonthlyViewDayCard from "./MonthlyViewDayCard"
import { isSameDay, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isBefore, isAfter } from "date-fns"

type MyEventsMonthlyViewProps = {
    events: EventType[],
    currentDate: Date
}

export default function MyEventsMonthlyView ({events, currentDate}: MyEventsMonthlyViewProps){

    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart, {weekStartsOn: 1})
    const endDate = endOfWeek(monthEnd, {weekStartsOn: 1})
    const days: Date[] = []
    let day = startDate
    while (day <= endDate){
        days.push(day)
        day = addDays(day,1)
    }

    const headersStyles = `border-gray-300 bg-gray-100 border font-bold px-2 py-3 text-sm cursor-pointer min-h-10`
    return (
        <div className="grid grid-cols-7 justify-evenly mt-8 h-full">
            <div className={`${headersStyles}`}>Monday</div>
            <div className={`${headersStyles}`}>Tursday</div>
            <div className={`${headersStyles}`}>Wednesday</div>
            <div className={`${headersStyles}`}>Thursday</div>
            <div className={`${headersStyles}`}>Friday</div>
            <div className={`${headersStyles}`}>Saturday</div>
            <div className={`${headersStyles}`}>Sunday</div>
            {days.map(day => {

                if (isBefore(day, monthStart) || isAfter(day, monthEnd)){
                    return (
                        <MonthlyViewDayCard key={day.toString()} events={[]} blank={true} />
                    )
                }

                const dayEvents = events.filter(event => isSameDay(parseISO(event.event_date), day))
                return (
                    <MonthlyViewDayCard key={day.toString()} events={dayEvents} day={day}/>
                )
            })}
        </div>
    )
}