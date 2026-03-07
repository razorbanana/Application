import { ApiProperty } from '@nestjs/swagger';
import type { UserRole } from "src/database/entities/participant.entity"

export class JoinEventDto {
  @ApiProperty({ 
    example: 'f1a2b3c4-d5e6-7890-ab12-cd34ef56gh78', 
    description: 'ID of the user joining the event (optional if authenticated)', 
    required: false 
  })
  userId?: string;

  @ApiProperty({ 
    example: 'e3f4g5h6-i7j8-9012-kl34-mn56op78qr90', 
    description: 'ID of the event to join'
  })
  eventId: string;

  @ApiProperty({ 
    example: "organizer", 
    description: 'Role of the user in the event (Organizer or Visitor)' 
  })
  userRole?: UserRole;
}