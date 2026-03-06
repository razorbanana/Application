import { ApiProperty } from "@nestjs/swagger";

export class UserWithoutIdPassword {
    @ApiProperty({ 
        example: 'benlee', 
        description: 'The account username'
    })
    username: string;

    @ApiProperty({ 
        example: 'ben.lee@example.com', 
        description: 'The email associated with the account'
    })
    email: string

    @ApiProperty({ 
        example: 'Benjamin Lee', 
        description: 'The full name indicated in the account'
    })
    fullName: string

    @ApiProperty({ 
        example: 'The city indicated in the account', 
        description: 'New York'
    })
    city?: string
}

export default class LoginResponseDto{
    user: UserWithoutIdPassword

    @ApiProperty({ 
        description: 'JWT token'
    })
    access_token: string
}