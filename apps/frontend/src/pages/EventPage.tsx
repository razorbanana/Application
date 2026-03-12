import { useAppSelector } from "../app/store"
import EventPageBody from "../components/eventPageComponents/EventPageBody"
import { useState } from "react"
import { Pencil, PencilOff } from "lucide-react"
import EditEventBody from "../components/eventPageComponents/EditEventBody"

export default function EventPage(){

    const basicPencilClasses = `absolute top-5 right-5 cursor-pointer select-none`
    const eventId = useAppSelector(state => state.events.chosenEventId)
    const events = useAppSelector(state => state.events.events)
    const event = events.find(event => event.id === eventId)
    const [mode, setMode] = useState<"view" | "edit">("view")

    const changeMode = (newMode: "view" | "edit") => () => {
        setMode(newMode)
    }

    if (!event){
        return (
            <p className="text-2xl text-center mt-8">Please choose the event from the Events or My events page</p>
        )
    }

    return(
        <div className="xl:w-1/3 md:w-1/2 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
            {mode==="view" 
            ? event.isOrganizer && <Pencil className={`${basicPencilClasses}`} onClick={changeMode("edit")}/> 
            : event.isOrganizer && <PencilOff className={`${basicPencilClasses}`} onClick={changeMode("view")}/> }
            {mode==="view" 
            ? <EventPageBody event={event} /> 
            : <EditEventBody event={event} /> }
            
        </div>
    )
}