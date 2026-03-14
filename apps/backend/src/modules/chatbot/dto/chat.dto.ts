import { ApiProperty } from "@nestjs/swagger"

export class ChatDto {
    @ApiProperty({ 
        example: "Please tell me what you know about visitors of the next event", 
        description: 'The message to chatbot', 
        required: true 
    })
    message: string
}
