import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';
import { TagsModule } from './modules/tags/tags.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';

@Module({
  imports: [AuthModule, UsersModule, EventsModule, TagsModule, ChatbotModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
  }
}
