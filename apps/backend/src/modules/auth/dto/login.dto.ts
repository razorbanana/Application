import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'johndoe123', 
    description: 'Username or email of the user for authentication'
  })
  identifier: string;

  @ApiProperty({ 
    example: 'Str0ngP@ssword!', 
    description: 'Password for account authentication'
  })
  password: string;
}