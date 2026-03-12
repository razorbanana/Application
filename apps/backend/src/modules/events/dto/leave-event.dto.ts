import { ApiProperty } from '@nestjs/swagger';

export class LeaveEventDto {
  @ApiProperty({ 
    example: 'e3f4g5h6-i7j8-9012-kl34-mn56op78qr90', 
    description: 'ID of the event to leave'
  })
  eventId: string;
}