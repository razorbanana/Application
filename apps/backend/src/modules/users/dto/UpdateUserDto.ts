import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ 
    example: 'benlee', 
    description: 'Username'
  })
  username?: string;

  @ApiProperty({ 
    example: 'Secure123!', 
    description: 'Password'
  })
  password?: string;

  @ApiProperty({ 
    example: 'Ben lee', 
    description: 'Full name'
  })
  fullName?: string;

    @ApiProperty({ 
    example: 'New City', 
    description: 'City'
  })
  city?: string;

}
