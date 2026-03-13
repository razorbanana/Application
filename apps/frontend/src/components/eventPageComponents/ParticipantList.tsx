import type { ParticipantType } from "../../types/ParticipantType";

export default function ParticipantList ({participants}:{participants: ParticipantType[]}) {
    return (
        <div className="w-full pb-6 mt-8">
            <p className="text-center text-lg font-bold">List of participants:</p>
            {
                participants.map(par => {
                    return (
                        <div key={par.username} className="text-center pt-1 text-lg">
                            <p>{par.fullName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}