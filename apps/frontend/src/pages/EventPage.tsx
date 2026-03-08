import { useAppSelector } from "../app/store"
import EventPageBody from "../components/eventPageComponents/EventPageBody"


export default function EventPage(){

    const eventId = useAppSelector(state => state.events.chosenEventId)
    const events = useAppSelector(state => state.events.events)
    const event = events.find(event => event.id === eventId)

    if (!event){
        return (
            <p className="text-2xl text-center mt-8">Please choose the event from the Events or My events page</p>
        )
    }

    return(
        <EventPageBody event={event} />
    )
}