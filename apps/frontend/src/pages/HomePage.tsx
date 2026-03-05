import { useAppDispatch, useAppSelector, type RootState } from "../app/store"
import { useEffect } from "react"
import { fetchAllEvents } from "../app/slices/eventsSlice"

export default function HomePage(){

    const dispatch = useAppDispatch()
    const {events, status} = useAppSelector((state: RootState) => state.events)

    useEffect(() => {
        dispatch(fetchAllEvents())
    }, [dispatch])

    return(
        <>
            <h1>HomePage</h1>
            {status === 'loading' && <p>Loading...</p>}
            {events.map(event => <h1 key={event.id}>{event.name}</h1>)}
        </>
    )
}