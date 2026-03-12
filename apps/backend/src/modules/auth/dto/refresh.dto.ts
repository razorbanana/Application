import { ApiProperty } from "@nestjs/swagger"

export default class RefreshDto {
    @ApiProperty({ 
            description: 'Refresh JWT token'
    })
    refresh_token: string
}