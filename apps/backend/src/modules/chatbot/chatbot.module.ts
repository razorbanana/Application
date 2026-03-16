import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { EventsModule } from '../events/events.module';
import { OptionalAuthGuard } from '../auth/guards/optional.guard';
import { chatbotProviders } from './chatbot.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule,
    OptionalAuthGuard
  ],
  controllers: [ChatbotController],
  providers: [
    ...chatbotProviders,
    ChatbotService
  ],
})
export class ChatbotModule {}
