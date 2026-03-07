import { format } from "date-fns"

type EventTimeNameCardProps = {
    name: string,
    date: Date
}

export default function EventTimeNameCard ({name, date}: EventTimeNameCardProps) {
    
    return(
        <div className="bg-blue-100 rounded-lg p-2 text-xs text-blue-600">
            <p>{format(date, "HH:mm")}</p>
            <p>{name}</p>
        </div>
    )
}