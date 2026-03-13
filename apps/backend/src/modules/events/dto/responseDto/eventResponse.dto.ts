import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/database/entities/tag.entity';

export class EventResponseDto {

  @ApiProperty({ 
    example: '38ecfb51-2e49-4a51-98c5-96761dde5e31', 
    description: 'UUID of the event'
  })
  id: string;

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
  capacity: number;

  @ApiProperty({
    example: true,
    description: 'Visibility of the event for unauthenticated users', 
    required: false
  })
  isPublic: boolean;

  @ApiProperty({
    example: [
      "music", "games"
    ],
    description: 'Tags of the event', 
  })
  tags: string[]
}
