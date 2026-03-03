import { UserRole } from "src/database/entities/participant.entity"

export class JoinEventDto{
    eventId: string
    userRole: UserRole
}