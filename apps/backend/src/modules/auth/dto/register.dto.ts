import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ 
    example: 'John Doe', 
    description: 'Full name of the user'
  })
  fullName: string;

  @ApiProperty({ 
    example: 'johndoe123', 
    description: 'Unique username for login and identification'
  })
  username: string;

  @ApiProperty({ 
    example: 'johndoe@gmail.com', 
    description: 'Email address of the user'
  })
  email: string;

  @ApiProperty({ 
    example: 'Str0ngP@ssword!', 
    description: 'Password for account authentication'
  })
  password: string;

  @ApiProperty({ 
    example: 'Kyiv', 
    description: 'City of residence (optional)', 
    required: false 
  })
  city?: string;
}
