import type { TagName } from "./TagType";

export type EventType = {
    id: string;
    name: string;
    description: string
    location: string
    eventDate: string
    capacity: number
    visitorCount: number
    isPublic: boolean
    isJoined: boolean
    isOrganizer: boolean
    tags?: TagName[]
}