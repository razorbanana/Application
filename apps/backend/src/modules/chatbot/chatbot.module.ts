import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { EventsModule } from '../events/events.module';
import { OptionalAuthGuard } from '../auth/guards/optional.guard';

@Module({
  imports: [
    EventsModule,
    OptionalAuthGuard
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
