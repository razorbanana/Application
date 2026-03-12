import { ApiProperty } from "@nestjs/swagger";

export class ParticipantDto {
  @ApiProperty({
    example: 'benlee', 
  })
  username: string;

  @ApiProperty({
    example: 'Ben Lee', 
  })
  fullName: string

  @ApiProperty({
    example: 'organizer or visitor', 
  })
  userRole: string
}