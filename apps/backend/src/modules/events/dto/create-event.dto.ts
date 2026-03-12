import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ 
    example: 'Spring Music Festival', 
    description: 'Title of the event'
  })
  name: string;

  @ApiProperty({ 
    example: 'An outdoor music festival featuring local bands and food trucks.', 
    description: 'Detailed description of the event'
  })
  description: string;

  @ApiProperty({ 
    example: 'Central Park, New York', 
    description: 'Location where the event will take place'
  })
  location: string;

  @ApiProperty({ 
    example: '2026-05-15T18:00:00.000Z', 
    description: 'Date and time when the event starts'
  })
  eventDate: Date;

  @ApiProperty({ 
    example: 200, 
    description: 'Maximum number of participants (optional)', 
    required: false 
  })
  capacity?: number;

  @ApiProperty({
    example: true,
    description: 'Visibility of the event for unauthenticated users', 
    required: false
  })
  isPublic?: boolean;

  @ApiProperty({
    example: ["f1a2b3c4-d5e6..."],
    description: 'Ids of the tags for the event', 
    required: false
  })
  tagIds?: string[];
}
