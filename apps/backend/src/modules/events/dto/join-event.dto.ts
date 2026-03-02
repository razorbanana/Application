import { UserRole } from "src/database/entities/participant.entity"

export class JoinEventDto{
    userId: string
    eventId: string
    userRole: UserRole
}