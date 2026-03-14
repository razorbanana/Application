import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import type { ChatDto } from './dto/chat.dto';
import { YupValidationPipe } from 'src/utils/pipes/yup.pipe';
import { chatSchema } from './schemas/chat.schema';
import { OptionalAuthGuard } from '../auth/guards/optional.guard';
import { GetUser } from 'src/utils/decorators/getUser.decorator';
import { type JwtPayload } from 'src/utils/decorators/getUser.decorator';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @UseGuards(OptionalAuthGuard)
  @Post()
  async chat(@GetUser() user: JwtPayload | null, @Body(new YupValidationPipe(chatSchema)) chatDto: ChatDto) {
    return this.chatbotService.getChatResponse(user, chatDto);
  }

}
