import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import type { ChatDto } from './dto/chat.dto';
import { YupValidationPipe } from 'src/utils/pipes/yup.pipe';
import { chatSchema } from './schemas/chat.schema';
import { OptionalAuthGuard } from '../auth/guards/optional.guard';
import { GetUser } from 'src/utils/decorators/getUser.decorator';
import { type JwtPayload } from 'src/utils/decorators/getUser.decorator';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @UseGuards(OptionalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    examples: 
      {
        nextEventVisitors: {
          value: {
            message: "Please tell me what you know about visitors of the next event"
          }
        }
      }
  })
  @ApiOkResponse({
    description: 'The response from chatbot',
  })
  @Post()
  async chat(@GetUser() user: JwtPayload | null, @Body(new YupValidationPipe(chatSchema)) chatDto: ChatDto) {
    return this.chatbotService.getChatResponse(user, chatDto);
  }

  @UseGuards(AuthGuard)
  @Get("history")
  async getHistory(@GetUser() user: JwtPayload){
    return this.chatbotService.getChatHistory(user)
  }

}
