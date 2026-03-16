import { eraseError } from "../app/slices/eventsSlice"
import { useAppDispatch, useAppSelector } from "../app/store"
import { useEffect } from "react"
import { X } from "lucide-react"

type EventErrorHandlerProps = {
}

export default function EventErrorHandler ({}:EventErrorHandlerProps) {

    const error = useAppSelector(state => state.events.error)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if (!error) return

        const timer = setTimeout(()=>{dispatch(eraseError())}, 5000)

        return () => clearTimeout(timer)
    }, [error])

    if (!error) return null

    return (
       <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
            <div className="flex items-center gap-3 rounded-lg bg-red-500 px-4 py-3 text-white shadow-lg">
                <span className="text-sm font-medium">
                    {error}
                </span>

                <button
                    onClick={() => dispatch(eraseError())}
                    className="rounded p-1 hover:bg-red-600"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    )
}