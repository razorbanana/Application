import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector, type RootState } from "../../app/store"
import { fetchAllEvents } from "../../app/slices/eventsSlice"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MyEventsWeeklyView from "../../components/myEventsComponents/MyEventsWeeklyView"
import { startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, addMonths} from "date-fns"
import MyEventsMonthlyView from "../../components/myEventsComponents/MyEventsMonthlyView"

export default function MyEventsPage(){
    
    const basicChevronsStyles = `mx-3 text-gray-700 cursor-pointer px-3 py-2 rounded-lg border border-gray-300`
    const chosenModeStyles = `bg-blue-600 text-white rounded-lg`

    const dispatch = useAppDispatch()
    const {events, status} = useAppSelector((state: RootState) => state.events)
    const [mode, setMode] = useState<"month" | "week">("week")
    const [currentDate, setCurrentDate] = useState(new Date());

    const formattedMonth = currentDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    })
    const filteredEvents = events.filter(e => e.isJoined)

    useEffect(() => {
        if (events.length === 0) dispatch(fetchAllEvents())
    }, [dispatch])

    const handlePrev = () => {
        if (mode === "week"){
            setCurrentDate(d => addDays(d, -7))
        }else{
            setCurrentDate(d => addMonths(d, -1))
        }
    }

    const handleNext = () => {
        if (mode === "week"){
            setCurrentDate(d => addDays(d, 7))
        }else{
            setCurrentDate(d => addMonths(d, 1))
        }
    }

    return(
        <div className="p-3">
            <h1 className="text-3xl font-extrabold text-gray-900 m-3">My events</h1>
            <h1 className="text-1xl text-gray-600 m-3 mb-10">View and manage your event calendar</h1>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <button className={`${basicChevronsStyles}`} onClick={handlePrev}><ChevronLeft /></button>

                    <p className="text-lg font-bold w-50 text-center">{formattedMonth}</p>

                    <button className={`${basicChevronsStyles}`} onClick={handleNext}><ChevronRight /></button>
                </div>
                <div>
                    <button className={`${basicChevronsStyles} ${mode === "month" && chosenModeStyles}`} onClick={()=>setMode("month")}>Month</button>
                    <button className={`${basicChevronsStyles} ${mode === "week" && chosenModeStyles}`} onClick={()=>setMode("week")}>Week</button>
                </div>
            </div>

            {mode === 'week' ? <MyEventsWeeklyView events={filteredEvents} currentDate={currentDate}/> : <MyEventsMonthlyView events={filteredEvents} currentDate={currentDate}/>}
        </div>
    )
}