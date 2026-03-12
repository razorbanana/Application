import { ApiProperty } from "@nestjs/swagger";
import { EventResponseDto } from "./eventResponse.dto";

export class EventWithVisitorCount extends EventResponseDto {
  @ApiProperty({
    example: '50', 
  })
  visitorCount: number;
  @ApiProperty({
    example: 'true', 
  })
  isJoined: boolean;
  @ApiProperty({
    example: 'true', 
  })
  isOrganizer: boolean;
}