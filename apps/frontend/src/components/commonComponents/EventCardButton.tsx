import type { EventType } from "../../types/EventType"
import type { UserType } from "../../types/UserType"

type EventCardButtonProps = {
    event: EventType,
    handleDelete: () => void,
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    user: UserType | null
}

export default function EventCardButton ({event, handleDelete, handleClick, user}: EventCardButtonProps) {
    return(
        <>
            {event.isOrganizer ? (
                    <button
                        className="mt-2 px-4 py-2 rounded-lg w-full bg-red-600 text-white hover:bg-red-300 cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete Event
                    </button>
                ) : (
                    <button
                        disabled={(event.capacity === event.visitorCount && !event.isJoined) || user === null}
                        className={`mt-2 px-4 py-2 rounded-lg w-full cursor-pointer ${
                            event.isJoined
                                ? "bg-red-600 text-white hover:bg-red-300"
                                : event.capacity === event.visitorCount
                                ? "bg-gray-600 text-white hover:bg-gray-300"
                                : "bg-blue-600 text-white hover:bg-blue-300"
                        }`}
                        onClick={handleClick}
                    >
                        {event.isJoined ? "Leave" : event.capacity === event.visitorCount ? "Full" : "Join"}
                    </button>
                )}
        </>
    )
}