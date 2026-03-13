import type { TagType } from "../TagType";

export type EventDto = {
    id: string;
    name: string;
    description: string;
    location: string;
    eventDate: string;
    capacity: number;
    visitorCount: number;
    isPublic: boolean;
    isJoined: boolean;
    isOrganizer: boolean;
    tags?: TagType[]
}