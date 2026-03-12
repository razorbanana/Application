import type { EventType } from "../../types/EventType";
import EventCard from "./EventCard";

export default function EventGrid({events}: {events: EventType[]}){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
            {events.map(event => <EventCard key={event.id} event={event}/>)}
        </div>
    )
}