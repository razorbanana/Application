export type CreateEventRequestDto = {
  name: string;
  description: string;
  location: string;
  eventDate: Date;
  capacity: number;
  isPublic: boolean
}
