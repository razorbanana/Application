export class CreateEventDto {
    name: string
    description: string
    location: string
    eventDate: Date
    capacity?: number
}
