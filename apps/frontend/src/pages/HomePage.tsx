import { useAppDispatch, useAppSelector, type RootState } from "../app/store"
import { useEffect, useState } from "react"
import { fetchAllEvents } from "../app/slices/eventsSlice"
import EventGrid from "../components/homePageComponents/EventGrid"
import { Search } from "lucide-react"

export default function HomePage(){

    const [filter, setFilter] = useState("")
    const dispatch = useAppDispatch()
    const {events, status} = useAppSelector((state: RootState) => state.events)

    const filteredEvents = events.filter(e => 
        e.name.toLowerCase().includes(filter.toLowerCase())
    )

    useEffect(() => {
        dispatch(fetchAllEvents())
    }, [dispatch])

    return(
        <div className="p-3">
            <h1 className="text-3xl font-extrabold text-gray-900 m-3">Discover events</h1>
            <h1 className="text-1xl text-gray-600 m-3 mb-10">Find and join exciting events happening around you</h1>
            <div className="flex items-center w-full md:w-1/3 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent m-3" >
                <div className="pl-3 text-gray-400">
                    <Search />
                </div>
                <input 
                type="text"
                placeholder="Search events..."
                className="w-full px-3 py-2 outline-none bg-transparent"
                onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && <EventGrid events={filteredEvents}/>}
        </div>
    )
}